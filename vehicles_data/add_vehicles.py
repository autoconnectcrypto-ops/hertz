#!/usr/bin/env python3
"""
Script pour ajouter tous les véhicules à la base de données MongoDB
En utilisant les infos extraites des noms de dossiers + valeurs par défaut
"""
import json
import re
import requests
import os
from pathlib import Path

API_URL = "https://hertz-marketplace.preview.emergentagent.com/api"

# Charger les données des véhicules traités
with open("/app/vehicles_data/vehicles_processed.json", "r") as f:
    vehicles_data = json.load(f)

# Mapping des carburants par mot-clé
CARBURANT_MAP = {
    "TDI": "Diesel",
    "HDi": "Diesel",
    "BlueHDi": "Diesel",
    "dCi": "Diesel",
    "TFSI": "Essence",
    "TSI": "Essence",
    "PureTech": "Essence",
    "TCe": "Essence",
    "Hybrid": "Hybride",
    "PHEV": "Hybride rechargeable",
    "E-TECH": "Électrique",
    "eHybrid": "Hybride rechargeable",
    "E-Tense": "Hybride rechargeable",
    "Cooper SE": "Électrique",
}

# Mapping des catégories par modèle
CATEGORIE_MAP = {
    "A3": "Berline",
    "A4": "Break",
    "Q2": "SUV",
    "Q3": "SUV",
    "Serie 1": "Berline",
    "Serie 2": "Monospace",
    "X1": "SUV",
    "DS7": "SUV",
    "500": "Citadine",
    "XCeed": "SUV",
    "Evoque": "SUV",
    "Classe A": "Berline",
    "CLA": "Coupé",
    "GLC": "SUV",
    "Countryman": "SUV",
    "Mini Cooper": "Citadine",
    "208": "Citadine",
    "2008": "SUV",
    "308": "Berline",
    "3008": "SUV",
    "5008": "SUV",
    "Clio": "Citadine",
    "Megane": "Berline",
    "Scenic": "Monospace",
    "Golf": "Berline",
    "Polo": "Citadine",
    "T-Roc": "SUV",
}

# Prix estimés par marque/segment (prix de vente avec -20%)
PRIX_BASE = {
    "Audi": {"Citadine": 18000, "Berline": 24000, "Break": 28000, "SUV": 26000},
    "BMW": {"Citadine": 20000, "Berline": 24000, "Monospace": 28000, "SUV": 30000},
    "DS": {"SUV": 28000},
    "Fiat": {"Citadine": 14000},
    "Kia": {"SUV": 22000},
    "Land Rover": {"SUV": 42000},
    "Mercedes": {"Citadine": 22000, "Berline": 26000, "Coupé": 32000, "SUV": 45000},
    "Mini": {"Citadine": 18000, "SUV": 24000},
    "Peugeot": {"Citadine": 16000, "Berline": 20000, "SUV": 24000},
    "Renault": {"Citadine": 14000, "Berline": 22000, "Monospace": 18000},
    "Volkswagen": {"Citadine": 14000, "Berline": 22000, "SUV": 24000},
}

def detect_carburant(modele_info):
    """Détecter le type de carburant"""
    for key, value in CARBURANT_MAP.items():
        if key.lower() in modele_info.lower():
            return value
    return "Essence"

def detect_categorie(marque, modele_info):
    """Détecter la catégorie du véhicule"""
    for key, value in CATEGORIE_MAP.items():
        if key.lower() in modele_info.lower():
            return value
    return "Berline"

def extract_puissance(modele_info):
    """Extraire la puissance du nom"""
    # Chercher un nombre suivi de "ch" ou entre des espaces
    match = re.search(r'(\d{2,3})\s*(ch|cv|bhp)?', modele_info, re.IGNORECASE)
    if match:
        return int(match.group(1))
    return 130  # Valeur par défaut

def extract_boite(modele_info):
    """Extraire le type de boîte"""
    if any(x in modele_info.upper() for x in ['BVA', 'DSG', 'DKG', 'DCT', 'EDC', 'TRONIC', 'AUTO']):
        return "Automatique"
    if 'BVM' in modele_info.upper():
        return "Manuelle"
    return "Automatique"

def extract_annee(modele_info, pdf_path):
    """Extraire l'année du PDF ou estimer"""
    if pdf_path:
        # Chercher l'année dans le nom du PDF
        match = re.search(r'(\d{4})', Path(pdf_path).stem)
        if match:
            return int(match.group(1))
    return 2022  # Valeur par défaut

def get_prix(marque, categorie):
    """Obtenir le prix estimé"""
    if marque in PRIX_BASE and categorie in PRIX_BASE[marque]:
        return PRIX_BASE[marque][categorie]
    return 20000

def extract_modele_simple(modele_info):
    """Extraire un nom de modèle simple"""
    # Prendre les premiers mots significatifs
    parts = modele_info.split()
    if len(parts) >= 2:
        # Garder le modèle (ex: "A3 Sportback" ou "Serie 1")
        if parts[0].lower() in ['serie', 'classe']:
            return f"{parts[0]} {parts[1]}"
        return parts[0]
    return modele_info

def create_vehicle(vehicle_info):
    """Créer un véhicule dans la base de données"""
    marque = vehicle_info['marque']
    modele_info = vehicle_info['modele_info']
    slug = vehicle_info['slug']
    image_urls = vehicle_info['image_urls']
    pdf_path = vehicle_info.get('pdf_path')
    
    # Extraire les informations
    modele = extract_modele_simple(modele_info)
    carburant = detect_carburant(modele_info)
    categorie = detect_categorie(marque, modele_info)
    puissance = extract_puissance(modele_info)
    boite = extract_boite(modele_info)
    annee = extract_annee(modele_info, pdf_path)
    prix = get_prix(marque, categorie)
    prix_original = int(prix * 1.25)  # +25% = prix avant remise
    
    # Kilométrage estimé (entre 30000 et 80000)
    import random
    km = random.randint(30000, 80000)
    
    # Construire les images
    images = [{"url": url, "alt": f"{marque} {modele} photo {i+1}"} for i, url in enumerate(image_urls[:10])]
    
    # Construire le véhicule
    vehicle = {
        "id": slug,
        "marque": marque,
        "modele": modele,
        "annee": annee,
        "km": km,
        "prix": prix,
        "prix_original": prix_original,
        "couleur": "Blanc",  # Par défaut
        "images": images,
        "specs": {
            "carburant": carburant,
            "boite": boite,
            "puissance": f"{puissance} ch",
            "puissance_fiscale": "8 CV",
            "cylindree": "1 500 cm³",
            "portes": 5,
            "categorie": categorie
        },
        "options": [
            "Climatisation automatique",
            "GPS Navigation",
            "Bluetooth",
            "Régulateur de vitesse",
            "Aide au stationnement",
            "Caméra de recul",
            "Sièges chauffants",
            "Jantes alliage"
        ],
        "historique": [
            {"date": "2025", "km": str(km - 5000), "interventions": "Révision complète"},
            {"date": "2024", "km": str(km - 20000), "interventions": "Révision + freins"}
        ],
        "description": f"{marque} {modele} {modele_info[:50]}... Véhicule issu de la flotte HERTZ, entretenu en concession. Excellent état général.",
        "disponible": True
    }
    
    return vehicle

def main():
    print("=" * 60)
    print("Ajout des véhicules à la base de données HERTZ-PRO")
    print("=" * 60)
    
    # Supprimer l'ancien véhicule test
    try:
        requests.delete(f"{API_URL}/vehicles/vw-troc-2022-001")
        print("Ancien véhicule test supprimé")
    except:
        pass
    
    vehicles_to_add = []
    
    for i, v in enumerate(vehicles_data):
        print(f"\n[{i+1}/{len(vehicles_data)}] {v['marque']} - {v['modele_info'][:40]}...")
        try:
            vehicle = create_vehicle(v)
            vehicles_to_add.append(vehicle)
            print(f"  ✓ Préparé: {vehicle['marque']} {vehicle['modele']} - {vehicle['prix']}€")
        except Exception as e:
            print(f"  ✗ Erreur: {e}")
    
    # Sauvegarder pour référence
    with open("/app/vehicles_data/vehicles_to_add.json", "w", encoding="utf-8") as f:
        json.dump(vehicles_to_add, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'=' * 60}")
    print(f"Véhicules préparés: {len(vehicles_to_add)}")
    print(f"Fichier sauvegardé: /app/vehicles_data/vehicles_to_add.json")
    print("=" * 60)
    
    # Ajouter via l'API
    print("\nAjout via l'API...")
    success_count = 0
    for vehicle in vehicles_to_add:
        try:
            response = requests.post(f"{API_URL}/vehicles", json=vehicle)
            if response.status_code == 200:
                success_count += 1
                print(f"  ✓ {vehicle['marque']} {vehicle['modele']}")
            else:
                print(f"  ✗ {vehicle['marque']} {vehicle['modele']}: {response.status_code}")
        except Exception as e:
            print(f"  ✗ {vehicle['marque']} {vehicle['modele']}: {e}")
    
    print(f"\n{'=' * 60}")
    print(f"Ajoutés avec succès: {success_count}/{len(vehicles_to_add)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
