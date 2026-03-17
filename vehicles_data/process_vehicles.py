#!/usr/bin/env python3
"""
Script pour traiter tous les véhicules et les ajouter à la base de données
"""
import os
import re
import json
import shutil
import requests
from pathlib import Path

BASE_DIR = Path("/app/vehicles_data/extracted/NOUVEAU DOSSIER AUTO")
PUBLIC_DIR = Path("/app/frontend/public/vehicles")
API_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://hertz-pro-preview.preview.emergentagent.com')

def slugify(text):
    """Convertir le texte en slug URL-friendly"""
    text = text.lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def get_vehicle_folders():
    """Récupérer la liste des dossiers véhicules"""
    folders = []
    for folder in BASE_DIR.iterdir():
        if folder.is_dir():
            folders.append(folder)
    return sorted(folders)

def parse_folder_name(folder_name):
    """Extraire marque et modèle du nom de dossier"""
    # Nettoyer le nom
    name = folder_name.replace("_ Arval AutoSelect_files", "").strip()
    
    # Patterns pour extraire marque/modèle
    patterns = [
        r'^(Audi|BMW|DS|Fiat|Kia|Land Rover|Mercedes|Mini|Peugeot|Renault|Volkswagen)\s+(.+)$',
    ]
    
    for pattern in patterns:
        match = re.match(pattern, name, re.IGNORECASE)
        if match:
            return match.group(1), match.group(2)
    
    # Fallback: premier mot = marque, reste = modèle
    parts = name.split(' ', 1)
    if len(parts) >= 2:
        return parts[0], parts[1]
    return name, ""

def find_pdf(folder):
    """Trouver le PDF dans le dossier"""
    for f in folder.iterdir():
        if f.suffix.lower() == '.pdf':
            return f
    return None

def find_images(folder):
    """Trouver toutes les images dans le dossier"""
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png']:
        images.extend(folder.glob(ext))
    
    # Trier: d'abord les fichiers numériques (01, 02, etc.)
    def sort_key(f):
        name = f.stem
        # Si c'est un nombre, retourner ce nombre
        if name.isdigit():
            return (0, int(name))
        # Sinon trier alphabétiquement
        return (1, name)
    
    return sorted(images, key=sort_key)

def copy_images_to_public(folder, vehicle_slug):
    """Copier les images vers le dossier public"""
    dest_dir = PUBLIC_DIR / vehicle_slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    images = find_images(folder)
    copied_images = []
    
    for i, img in enumerate(images[:20]):  # Max 20 images
        new_name = f"{i+1:02d}{img.suffix}"
        dest_path = dest_dir / new_name
        shutil.copy2(img, dest_path)
        copied_images.append(f"/vehicles/{vehicle_slug}/{new_name}")
    
    return copied_images

def process_vehicle_folder(folder):
    """Traiter un dossier véhicule"""
    folder_name = folder.name
    marque, modele_info = parse_folder_name(folder_name)
    
    # Trouver le PDF et les images
    pdf_path = find_pdf(folder)
    images = find_images(folder)
    
    # Créer le slug
    vehicle_slug = slugify(f"{marque}-{modele_info[:30]}")
    
    # Copier les images
    image_urls = copy_images_to_public(folder, vehicle_slug)
    
    return {
        "folder": str(folder),
        "marque": marque,
        "modele_info": modele_info,
        "slug": vehicle_slug,
        "pdf_path": str(pdf_path) if pdf_path else None,
        "image_count": len(images),
        "image_urls": image_urls
    }

def main():
    """Fonction principale"""
    print("=" * 60)
    print("Traitement des véhicules HERTZ-PRO")
    print("=" * 60)
    
    folders = get_vehicle_folders()
    print(f"\nNombre de dossiers trouvés: {len(folders)}")
    
    results = []
    for i, folder in enumerate(folders):
        print(f"\n[{i+1}/{len(folders)}] {folder.name[:50]}...")
        try:
            result = process_vehicle_folder(folder)
            results.append(result)
            print(f"  ✓ {result['marque']} - {len(result['image_urls'])} images copiées")
        except Exception as e:
            print(f"  ✗ Erreur: {e}")
    
    # Sauvegarder les résultats
    output_file = Path("/app/vehicles_data/vehicles_processed.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'=' * 60}")
    print(f"Traitement terminé: {len(results)} véhicules")
    print(f"Fichier de résultats: {output_file}")
    print("=" * 60)

if __name__ == "__main__":
    main()
