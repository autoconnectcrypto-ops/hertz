#!/usr/bin/env python3
"""
Script pour extraire les informations détaillées des PDFs et mettre à jour les véhicules
"""
import json
import re
import os
import subprocess
from pathlib import Path

BASE_DIR = Path("/app/vehicles_data/extracted/NOUVEAU DOSSIER AUTO")
OUTPUT_FILE = Path("/app/vehicles_data/pdf_extractions.json")

def find_all_pdfs():
    """Trouver tous les PDFs"""
    pdfs = list(BASE_DIR.glob("**/*.pdf"))
    return sorted(pdfs)

def extract_text_from_pdf(pdf_path):
    """Extraire le texte brut d'un PDF avec pdftotext"""
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', str(pdf_path), '-'],
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout
    except Exception as e:
        print(f"Erreur extraction PDF: {e}")
        return ""

def parse_vehicle_info(text, pdf_name):
    """Parser les informations du véhicule depuis le texte"""
    info = {
        "marque": "",
        "modele": "",
        "version": "",
        "annee": 0,
        "km": 0,
        "prix": 0,
        "couleur": "",
        "carburant": "",
        "boite": "",
        "puissance": "",
        "puissance_fiscale": "",
        "cylindree": "",
        "portes": 5,
        "categorie": "",
        "options": [],
        "historique": []
    }
    
    # Extraire l'année du nom du PDF
    year_match = re.search(r'(\d{4})', pdf_name)
    if year_match:
        info["annee"] = int(year_match.group(1))
    
    # Extraire la marque du nom
    marques = ['Audi', 'BMW', 'DS', 'Fiat', 'Kia', 'Land Rover', 'Mercedes', 'Mini', 'Peugeot', 'Renault', 'Volkswagen']
    for marque in marques:
        if marque.lower() in pdf_name.lower():
            info["marque"] = marque
            break
    
    # Extraire le kilométrage
    km_match = re.search(r'(\d{1,3}[\s\u00a0]?\d{3})\s*km', text, re.IGNORECASE)
    if km_match:
        km_str = km_match.group(1).replace(' ', '').replace('\u00a0', '')
        info["km"] = int(km_str)
    
    # Extraire le prix
    prix_match = re.search(r'(\d{1,2}[\s\u00a0]?\d{3})\s*€', text)
    if prix_match:
        prix_str = prix_match.group(1).replace(' ', '').replace('\u00a0', '')
        info["prix"] = int(prix_str)
    
    # Extraire la couleur
    couleurs = ['Blanc', 'Noir', 'Gris', 'Bleu', 'Rouge', 'Vert', 'Argent', 'Beige', 'Marron', 'Orange']
    for couleur in couleurs:
        if couleur.lower() in text.lower():
            info["couleur"] = couleur
            break
    
    # Extraire le carburant
    if 'diesel' in text.lower() or 'tdi' in text.lower() or 'hdi' in text.lower() or 'bluehdi' in text.lower():
        info["carburant"] = "Diesel"
    elif 'essence' in text.lower() or 'tfsi' in text.lower() or 'tsi' in text.lower() or 'puretech' in text.lower():
        info["carburant"] = "Essence"
    elif 'hybride' in text.lower() or 'e-tech' in text.lower() or 'phev' in text.lower():
        info["carburant"] = "Hybride"
    elif 'électrique' in text.lower() or 'electric' in text.lower():
        info["carburant"] = "Électrique"
    
    # Extraire la boîte de vitesse
    if any(x in text.lower() for x in ['automatique', 'bva', 'dsg', 'dct', 'edc', 's tronic', 'dkg']):
        info["boite"] = "Automatique"
    elif 'manuelle' in text.lower() or 'bvm' in text.lower():
        info["boite"] = "Manuelle"
    
    # Extraire la puissance
    puissance_match = re.search(r'(\d{2,3})\s*(ch|cv|bhp)', text, re.IGNORECASE)
    if puissance_match:
        info["puissance"] = f"{puissance_match.group(1)} ch"
    
    # Extraire puissance fiscale
    pf_match = re.search(r'(\d{1,2})\s*cv\s*fiscaux?', text, re.IGNORECASE)
    if pf_match:
        info["puissance_fiscale"] = f"{pf_match.group(1)} CV"
    
    # Extraire cylindrée
    cyl_match = re.search(r'(\d[\s\u00a0]?\d{3})\s*cm[³3]', text)
    if cyl_match:
        info["cylindree"] = cyl_match.group(0).strip()
    
    # Extraire les options (lignes avec certains mots-clés)
    option_keywords = [
        'climatisation', 'gps', 'navigation', 'bluetooth', 'régulateur', 
        'caméra', 'radar', 'aide', 'parking', 'stationnement', 'led',
        'cuir', 'chauffant', 'jantes', 'toit', 'ouvrant', 'panoramique',
        'carplay', 'android', 'connect', 'digital', 'cockpit', 'écran',
        'keyless', 'start', 'stop', 'lane', 'assist', 'détection',
        'feux', 'phares', 'vitres', 'électriques', 'rétroviseurs',
        'isofix', 'airbag', 'abs', 'esp', 'alliage', 'barres', 'toit'
    ]
    
    lines = text.split('\n')
    options = []
    for line in lines:
        line_clean = line.strip()
        if len(line_clean) > 5 and len(line_clean) < 100:
            for keyword in option_keywords:
                if keyword in line_clean.lower():
                    # Nettoyer la ligne
                    option = re.sub(r'^[-•●○◦▪▸►]\s*', '', line_clean)
                    option = re.sub(r'\s+', ' ', option).strip()
                    if option and option not in options and len(option) > 3:
                        options.append(option)
                    break
    
    info["options"] = options[:30]  # Limiter à 30 options
    
    # Extraire l'historique d'entretien
    # Chercher des patterns de date avec interventions
    history_pattern = re.compile(r'(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})\s*[:\-]?\s*(\d{1,3}[\s\u00a0]?\d{0,3})\s*km?\s*[:\-]?\s*(.+?)(?=\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|$)', re.IGNORECASE | re.DOTALL)
    
    historique = []
    for match in history_pattern.finditer(text):
        date = match.group(1)
        km = match.group(2).replace(' ', '').replace('\u00a0', '')
        interventions = match.group(3).strip()
        
        # Nettoyer les interventions
        interventions = re.sub(r'\s+', ' ', interventions)
        interventions = interventions[:200]  # Limiter la longueur
        
        if date and interventions and len(interventions) > 5:
            historique.append({
                "date": date,
                "km": f"{km} km" if km else "",
                "interventions": interventions
            })
    
    info["historique"] = historique[:10]  # Limiter à 10 entrées
    
    return info

def main():
    print("=" * 60)
    print("Extraction des données des PDFs")
    print("=" * 60)
    
    # Vérifier si pdftotext est disponible
    try:
        subprocess.run(['pdftotext', '-v'], capture_output=True, timeout=5)
    except FileNotFoundError:
        print("Installation de poppler-utils...")
        os.system("apt-get install -y poppler-utils -qq")
    
    pdfs = find_all_pdfs()
    print(f"\nNombre de PDFs trouvés: {len(pdfs)}")
    
    extractions = []
    
    for i, pdf in enumerate(pdfs):
        print(f"\n[{i+1}/{len(pdfs)}] {pdf.name}...")
        
        try:
            # Extraire le texte
            text = extract_text_from_pdf(pdf)
            
            if text:
                # Parser les infos
                info = parse_vehicle_info(text, pdf.name)
                info["pdf_path"] = str(pdf)
                info["folder_path"] = str(pdf.parent)
                
                extractions.append(info)
                print(f"  ✓ {info['marque']} - {len(info['options'])} options, {len(info['historique'])} entretiens")
            else:
                print(f"  ✗ Pas de texte extrait")
                
        except Exception as e:
            print(f"  ✗ Erreur: {e}")
    
    # Sauvegarder
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(extractions, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'=' * 60}")
    print(f"Extraction terminée: {len(extractions)} PDFs traités")
    print(f"Fichier: {OUTPUT_FILE}")
    print("=" * 60)

if __name__ == "__main__":
    main()
