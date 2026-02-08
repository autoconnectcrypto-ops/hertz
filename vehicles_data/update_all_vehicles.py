#!/usr/bin/env python3
"""
Script pour extraire les données de tous les PDFs et mettre à jour les véhicules via l'API
"""
import json
import re
import requests
import subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import time

API_URL = "https://used-hertz-cars.preview.emergentagent.com/api"
BASE_DIR = Path("/app/vehicles_data/extracted/NOUVEAU DOSSIER AUTO")

# Mapping entre les dossiers et les véhicules
FOLDER_TO_VEHICLE = {}

def get_vehicles():
    """Récupérer tous les véhicules de l'API"""
    response = requests.get(f"{API_URL}/vehicles")
    return response.json()

def match_folder_to_vehicle(folder_path, vehicles):
    """Associer un dossier à un véhicule"""
    folder_name = folder_path.name.lower()
    
    for v in vehicles:
        marque = v['marque'].lower()
        modele = v['modele'].lower()
        
        # Vérifier si le dossier correspond à ce véhicule
        if marque in folder_name and modele in folder_name:
            return v['id']
    
    return None

def extract_pdf_text(pdf_path):
    """Extraire le texte d'un PDF"""
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', str(pdf_path), '-'],
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout
    except Exception as e:
        return ""

def parse_pdf_data(text, pdf_name, folder_name):
    """Parser les données du PDF"""
    data = {
        "annee": None,
        "km": None,
        "prix": None,
        "prix_original": None,
        "couleur": "Blanc",
        "specs": {},
        "options": [],
        "historique": []
    }
    
    # Extraire l'année du nom du PDF
    year_match = re.search(r'(\d{4})', pdf_name)
    if year_match:
        data["annee"] = int(year_match.group(1))
    
    # Extraire le kilométrage (format: XX XXX km ou XXXXX km)
    km_patterns = [
        r'(\d{1,3})\s*(\d{3})\s*km',
        r'(\d{4,6})\s*km'
    ]
    for pattern in km_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            if len(match.groups()) == 2:
                data["km"] = int(match.group(1) + match.group(2))
            else:
                data["km"] = int(match.group(1))
            break
    
    # Extraire le prix (format: XX XXX € ou XXXXX €)
    prix_patterns = [
        r'(\d{1,2})\s*(\d{3})\s*€',
        r'(\d{4,6})\s*€'
    ]
    for pattern in prix_patterns:
        match = re.search(pattern, text)
        if match:
            if len(match.groups()) == 2:
                data["prix"] = int(match.group(1) + match.group(2))
            else:
                data["prix"] = int(match.group(1))
            data["prix_original"] = int(data["prix"] * 1.25)  # +25%
            break
    
    # Extraire la couleur
    couleurs = {
        'blanc': 'Blanc', 'noir': 'Noir', 'gris': 'Gris', 'bleu': 'Bleu',
        'rouge': 'Rouge', 'vert': 'Vert', 'argent': 'Argent', 'beige': 'Beige'
    }
    text_lower = text.lower()
    for key, value in couleurs.items():
        if key in text_lower:
            data["couleur"] = value
            break
    
    # Extraire le carburant
    if any(x in text_lower for x in ['diesel', 'tdi', 'hdi', 'bluehdi', 'dci']):
        data["specs"]["carburant"] = "Diesel"
    elif any(x in text_lower for x in ['hybride', 'e-tech', 'phev', 'mhev']):
        data["specs"]["carburant"] = "Hybride"
    elif any(x in text_lower for x in ['électrique', 'electric', 'ev', ' se ']):
        data["specs"]["carburant"] = "Électrique"
    else:
        data["specs"]["carburant"] = "Essence"
    
    # Extraire la boîte
    if any(x in text_lower for x in ['automatique', 'bva', 'dsg', 'dct', 'edc', 's tronic', 'tiptronic']):
        data["specs"]["boite"] = "Automatique"
    else:
        data["specs"]["boite"] = "Manuelle"
    
    # Extraire la puissance
    puissance_match = re.search(r'(\d{2,3})\s*(ch|cv|bhp|kw)', text, re.IGNORECASE)
    if puissance_match:
        data["specs"]["puissance"] = f"{puissance_match.group(1)} ch"
    
    # Extraire puissance fiscale
    pf_match = re.search(r'(\d{1,2})\s*cv', text_lower)
    if pf_match:
        data["specs"]["puissance_fiscale"] = f"{pf_match.group(1)} CV"
    
    # Extraire cylindrée
    cyl_match = re.search(r'(\d[\s]?\d{3})\s*cm', text)
    if cyl_match:
        data["specs"]["cylindree"] = f"{cyl_match.group(1).strip()} cm³"
    
    # Extraire les options (lignes contenant des mots-clés)
    option_keywords = [
        'climatisation', 'gps', 'navigation', 'bluetooth', 'régulateur',
        'caméra', 'radar', 'aide', 'parking', 'stationnement', 'led',
        'cuir', 'chauffant', 'jantes', 'toit', 'ouvrant', 'panoramique',
        'carplay', 'android', 'connect', 'digital', 'cockpit', 'écran',
        'keyless', 'start', 'stop', 'lane', 'assist', 'détection',
        'feux', 'phares', 'vitres', 'électriques', 'rétroviseurs',
        'isofix', 'airbag', 'abs', 'esp', 'alliage', 'barres',
        'multimedia', 'audio', 'usb', 'wifi', 'apple', 'google'
    ]
    
    lines = text.split('\n')
    options = []
    for line in lines:
        line_clean = line.strip()
        if 10 < len(line_clean) < 80:
            line_lower = line_clean.lower()
            for keyword in option_keywords:
                if keyword in line_lower:
                    # Nettoyer la ligne
                    option = re.sub(r'^[-•●○◦▪▸►\s]+', '', line_clean)
                    option = re.sub(r'\s+', ' ', option).strip()
                    if option and option not in options:
                        options.append(option)
                    break
    
    data["options"] = options[:25]  # Limiter à 25 options
    
    # Extraire l'historique d'entretien
    # Pattern: date DD/MM/YYYY suivi de km et interventions
    history_pattern = re.compile(
        r'(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})\s+(\d{1,3}[\s]?\d{0,3})\s*km?\s+(.+?)(?=\d{1,2}[/.-]\d{1,2}[/.-]|\Z)',
        re.IGNORECASE | re.DOTALL
    )
    
    historique = []
    for match in history_pattern.finditer(text):
        date = match.group(1)
        km = match.group(2).replace(' ', '')
        interventions = match.group(3).strip()
        interventions = re.sub(r'\s+', ' ', interventions)[:150]
        
        if date and interventions and len(interventions) > 5:
            historique.append({
                "date": date,
                "km": f"{km} km",
                "interventions": interventions
            })
    
    data["historique"] = historique[:5]  # Limiter à 5 entrées
    
    return data

def update_vehicle(vehicle_id, data):
    """Mettre à jour un véhicule via l'API"""
    # Nettoyer les données vides
    update_data = {}
    
    if data.get("annee"):
        update_data["annee"] = data["annee"]
    if data.get("km"):
        update_data["km"] = data["km"]
    if data.get("prix"):
        update_data["prix"] = data["prix"]
        update_data["prix_original"] = data.get("prix_original", int(data["prix"] * 1.25))
    if data.get("couleur"):
        update_data["couleur"] = data["couleur"]
    if data.get("specs"):
        update_data["specs"] = data["specs"]
    if data.get("options"):
        update_data["options"] = data["options"]
    if data.get("historique"):
        update_data["historique"] = data["historique"]
    
    if update_data:
        response = requests.put(f"{API_URL}/vehicles/{vehicle_id}", json=update_data)
        return response.status_code == 200
    return False

def process_folder(folder_path, vehicles):
    """Traiter un dossier véhicule"""
    # Trouver le PDF
    pdfs = list(folder_path.glob("*.pdf"))
    if not pdfs:
        return None, "Pas de PDF"
    
    pdf_path = pdfs[0]
    
    # Associer au véhicule
    vehicle_id = match_folder_to_vehicle(folder_path, vehicles)
    if not vehicle_id:
        return None, "Pas de véhicule correspondant"
    
    # Extraire le texte
    text = extract_pdf_text(pdf_path)
    if not text:
        return None, "Pas de texte extrait"
    
    # Parser les données
    data = parse_pdf_data(text, pdf_path.name, folder_path.name)
    
    # Mettre à jour
    success = update_vehicle(vehicle_id, data)
    
    return vehicle_id, data if success else "Échec mise à jour"

def main():
    print("=" * 60)
    print("Mise à jour des véhicules depuis les PDFs")
    print("=" * 60)
    
    # Récupérer les véhicules
    vehicles = get_vehicles()
    print(f"Véhicules en base: {len(vehicles)}")
    
    # Lister les dossiers
    folders = [f for f in BASE_DIR.iterdir() if f.is_dir()]
    print(f"Dossiers à traiter: {len(folders)}")
    
    success_count = 0
    
    for i, folder in enumerate(folders):
        print(f"\n[{i+1}/{len(folders)}] {folder.name[:50]}...")
        
        vehicle_id, result = process_folder(folder, vehicles)
        
        if vehicle_id and isinstance(result, dict):
            success_count += 1
            opts = len(result.get('options', []))
            hist = len(result.get('historique', []))
            print(f"  ✓ {opts} options, {hist} entretiens")
        else:
            print(f"  ✗ {result}")
    
    print(f"\n{'=' * 60}")
    print(f"Mis à jour: {success_count}/{len(folders)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
