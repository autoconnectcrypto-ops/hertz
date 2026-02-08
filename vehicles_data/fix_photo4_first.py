#!/usr/bin/env python3
"""
Script pour mettre la photo 4 en premier sur toutes les annonces
"""
import os
import re
import json
import shutil
import requests
from pathlib import Path

BASE_DIR = Path("/app/vehicles_data/extracted/NOUVEAU DOSSIER AUTO")
PUBLIC_DIR = Path("/app/frontend/public/vehicles")
API_URL = "https://hertz-marketplace.preview.emergentagent.com/api"

def slugify(text):
    text = text.lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')[:50]

def find_images(folder):
    """Trouver toutes les images"""
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
        images.extend(folder.glob(ext))
    return list(images)

def get_sort_key_with_4_first(filename):
    """
    Trier les fichiers avec la photo 4 en premier
    """
    name = Path(filename).stem
    
    # Photo 4 ou 04 en premier (priorité 0)
    if name in ['4', '04']:
        return (0, 0)
    
    # Ensuite les autres photos numérotées
    # Extraire le numéro
    num_match = re.match(r'^0?(\d+)$', name)
    if num_match:
        num = int(num_match.group(1))
        # Éviter de remettre 4 ici
        if num == 4:
            return (0, 0)
        return (1, num)
    
    # Autres fichiers à la fin
    return (2, name)

def copy_images_with_4_first(folder, vehicle_slug):
    """Copier les images avec la photo 4 en premier"""
    dest_dir = PUBLIC_DIR / vehicle_slug
    
    # Supprimer l'ancien dossier
    if dest_dir.exists():
        shutil.rmtree(dest_dir)
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    images = find_images(folder)
    
    # Trier avec photo 4 en premier
    images_sorted = sorted(images, key=lambda f: get_sort_key_with_4_first(f.name))
    
    copied_images = []
    
    for i, img in enumerate(images_sorted):
        new_name = f"{i+1:02d}{img.suffix.lower()}"
        dest_path = dest_dir / new_name
        shutil.copy2(img, dest_path)
        copied_images.append(f"/vehicles/{vehicle_slug}/{new_name}")
    
    return copied_images

def get_vehicles():
    response = requests.get(f"{API_URL}/vehicles")
    return response.json()

def match_folder_to_vehicle(folder_path, vehicles):
    folder_name = folder_path.name.lower()
    for v in vehicles:
        marque = v['marque'].lower()
        modele = v['modele'].lower()
        if marque in folder_name and modele in folder_name:
            return v['id']
    return None

def update_vehicle_images(vehicle_id, image_urls):
    images = [{"url": url, "alt": f"Photo {i+1}"} for i, url in enumerate(image_urls)]
    response = requests.put(f"{API_URL}/vehicles/{vehicle_id}", json={"images": images})
    return response.status_code == 200

def main():
    print("=" * 60)
    print("Mise à jour : Photo 4 en premier sur toutes les annonces")
    print("=" * 60)
    
    vehicles = get_vehicles()
    print(f"Véhicules: {len(vehicles)}")
    
    folders = [f for f in BASE_DIR.iterdir() if f.is_dir()]
    print(f"Dossiers: {len(folders)}")
    
    success_count = 0
    
    for i, folder in enumerate(folders):
        folder_name = folder.name[:50]
        print(f"\n[{i+1}/{len(folders)}] {folder_name}...")
        
        vehicle_id = match_folder_to_vehicle(folder, vehicles)
        if not vehicle_id:
            print(f"  ✗ Pas de véhicule correspondant")
            continue
        
        slug = slugify(folder.name.replace("_ Arval AutoSelect_files", ""))
        
        # Copier avec photo 4 en premier
        image_urls = copy_images_with_4_first(folder, slug)
        
        if not image_urls:
            print(f"  ✗ Pas d'images")
            continue
        
        if update_vehicle_images(vehicle_id, image_urls):
            success_count += 1
            print(f"  ✓ {len(image_urls)} photos (4.jpg en 1er)")
        else:
            print(f"  ✗ Échec")
    
    print(f"\n{'=' * 60}")
    print(f"Terminé: {success_count}/{len(folders)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
