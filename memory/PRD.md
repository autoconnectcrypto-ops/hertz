# HERTZ-PRO - Site Catalogue Véhicules

## Problem Statement
Créer un site web professionnel pour HERTZ-PRO permettant de vendre des véhicules d'occasion issus de la flotte Hertz. Le site doit présenter chaque véhicule avec une galerie complète (~20 photos), des caractéristiques détaillées, équipements, et historique d'entretien extrait des PDFs.

## Architecture
- **Backend**: FastAPI + MongoDB (motor async)
- **Frontend**: React + Tailwind CSS + React Router
- **Design**: Thème premium avec homepage sombre et pages intérieures claires
- **Fonts**: Oswald (headings) + Manrope (body)
- **Images**: Stockées dans `/app/frontend/public/vehicles/`

## User Personas
- Acheteurs de voitures d'occasion recherchant qualité et transparence
- Particuliers sensibles aux garanties et historique d'entretien complet
- Clients cherchant des prix avantageux (-20% destockage flotte)

## Core Requirements
- ✅ Site responsive mobile-first
- ✅ Homepage sombre et immersive avec image premium
- ✅ Page Catalogue avec grille de véhicules (thème clair)
- ✅ Page Détail avec galerie ~20 photos + 3 onglets (Caractéristiques, Équipements, Entretien)
- ✅ Numéro de référence unique pour chaque véhicule
- ✅ Page Contact avec formulaire
- ✅ Design professionnel aux couleurs Hertz (Jaune #FFD100, Noir)

## What's Been Implemented (Décembre 2025)
- ✅ Homepage avec Hero section immersive (image Porsche cinématique)
- ✅ Navigation complète (Accueil, Catalogue, Contact)
- ✅ Carte véhicule : image principale, marque, modèle, référence unique, prix
- ✅ Page détail : galerie photos avec thumbnails, specs, 3 onglets d'infos
- ✅ Page Contact avec formulaire fonctionnel
- ✅ API CRUD complète pour véhicules et contacts
- ✅ Suppression auto-seed pour éviter données de démo

## État Actuel (Décembre 2025)
- **Base de données**: VIDE - Prête pour nouveau processus "un par un"
- **Raison**: Les 37 véhicules précédents contenaient des erreurs et doublons
- **Nouveau workflow**: Ajout véhicule par véhicule avec validation utilisateur

## Prioritized Backlog
### P0 (En cours)
- [ ] Attendre lien WeTransfer pour premier véhicule
- [ ] Processus d'ajout "un par un" avec extraction PDF complète
- [ ] Validation utilisateur après chaque ajout

### P1 (Next)
- [ ] Ajouter coordonnées réelles (téléphone, email, adresse)
- [ ] Interface admin pour gérer les véhicules

### P2 (Future)
- [ ] Ajout signe/logo sur plaques d'immatriculation visibles
- [ ] Filtres de recherche (marque, prix, année)
- [ ] Refactoring App.js en composants séparés
- [ ] Export PDF du véhicule
- [ ] Partage WhatsApp direct

## Key API Endpoints
- `GET /api/vehicles` - Liste tous les véhicules
- `GET /api/vehicles/{id}` - Détail d'un véhicule
- `POST /api/vehicles` - Créer un véhicule
- `PUT /api/vehicles/{id}` - Mettre à jour un véhicule
- `DELETE /api/vehicles/{id}` - Supprimer un véhicule
- `POST /api/contact` - Envoyer un message de contact

## Key Files
- `/app/backend/server.py` - API FastAPI
- `/app/frontend/src/App.js` - Frontend React (monolithique)
- `/app/frontend/public/vehicles/` - Images des véhicules
