#!/usr/bin/env python3
"""
Script pour recopier TOUTES les photos avec le bon ordre (face en premier)
"""
import os
import re
import json
import shutil
import requests
from pathlib import Path

BASE_DIR = Path("/app/vehicles_data/extracted/NOUVEAU DOSSIER AUTO")
PUBLIC_DIR = Path("/app/frontend/public/vehicles")
API_URL = "https://hertz-showroom.preview.emergentagent.com/api"

def slugify(text):
    """Convertir le texte en slug"""
    text = text.lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')[:50]

def get_sort_key(filename):
    """
    Trier les fichiers pour avoir les photos de face en premier.
    Priorité:
    1. Fichiers commençant par 01, 02, 03, 04 (souvent les vues principales HD)
    2. Fichiers numériques simples (1, 2, 3...)
    3. Autres fichiers
    """
    name = Path(filename).stem
    
    # Si c'est un nombre avec zéro (01, 02, etc.) - priorité haute
    if re.match(r'^0\d+$', name):
        return (0, int(name))
    
    # Si c'est un nombre simple (1, 2, 3...)
    if name.isdigit():
        return (1, int(name))
    
    # Autres fichiers
    return (2, name)

def find_images(folder):
    """Trouver et trier toutes les images"""
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
        images.extend(folder.glob(ext))
    
    # Trier avec notre fonction personnalisée
    return sorted(images, key=lambda f: get_sort_key(f.name))

def copy_all_images(folder, vehicle_slug):
    """Copier TOUTES les images avec le bon ordre"""
    dest_dir = PUBLIC_DIR / vehicle_slug
    
    # Supprimer l'ancien dossier pour repartir à zéro
    if dest_dir.exists():
        shutil.rmtree(dest_dir)
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    images = find_images(folder)
    copied_images = []
    
    for i, img in enumerate(images):
        # Nouveau nom avec numéro séquentiel
        new_name = f"{i+1:02d}{img.suffix.lower()}"
        dest_path = dest_dir / new_name
        shutil.copy2(img, dest_path)
        copied_images.append(f"/vehicles/{vehicle_slug}/{new_name}")
    
    return copied_images

def get_vehicles():
    """Récupérer tous les véhicules"""
    response = requests.get(f"{API_URL}/vehicles")
    return response.json()

def match_folder_to_vehicle(folder_path, vehicles):
    """Trouver le véhicule correspondant au dossier"""
    folder_name = folder_path.name.lower()
    
    for v in vehicles:
        marque = v['marque'].lower()
        modele = v['modele'].lower()
        
        if marque in folder_name and modele in folder_name:
            return v['id']
    return None

def update_vehicle_images(vehicle_id, image_urls):
    """Mettre à jour les images d'un véhicule"""
    images = [{"url": url, "alt": f"Photo {i+1}"} for i, url in enumerate(image_urls)]
    
    response = requests.put(
        f"{API_URL}/vehicles/{vehicle_id}",
        json={"images": images}
    )
    return response.status_code == 200

def main():
    print("=" * 60)
    print("Recopie de TOUTES les photos avec bon ordre")
    print("=" * 60)
    
    vehicles = get_vehicles()
    print(f"Véhicules: {len(vehicles)}")
    
    folders = [f for f in BASE_DIR.iterdir() if f.is_dir()]
    print(f"Dossiers: {len(folders)}")
    
    success_count = 0
    
    for i, folder in enumerate(folders):
        folder_name = folder.name[:50]
        print(f"\n[{i+1}/{len(folders)}] {folder_name}...")
        
        # Trouver le véhicule
        vehicle_id = match_folder_to_vehicle(folder, vehicles)
        if not vehicle_id:
            print(f"  ✗ Pas de véhicule correspondant")
            continue
        
        # Générer le slug
        slug = slugify(folder.name.replace("_ Arval AutoSelect_files", ""))
        
        # Copier les images
        image_urls = copy_all_images(folder, slug)
        
        if not image_urls:
            print(f"  ✗ Pas d'images trouvées")
            continue
        
        # Mettre à jour en base
        if update_vehicle_images(vehicle_id, image_urls):
            success_count += 1
            print(f"  ✓ {len(image_urls)} photos copiées")
        else:
            print(f"  ✗ Échec mise à jour")
    
    print(f"\n{'=' * 60}")
    print(f"Terminé: {success_count}/{len(folders)} véhicules")
    print("=" * 60)

if __name__ == "__main__":
    main()
