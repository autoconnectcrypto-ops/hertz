# HERTZ-PRO - Site Catalogue Véhicules

## Problem Statement
Créer un site catalogue de vente de véhicules HERTZ-PRO avec thème jaune/noir Hertz. Vente de véhicules d'ancienne flotte avec prix destockage -20%.

## Architecture
- **Backend**: FastAPI + MongoDB (motor async)
- **Frontend**: React + Tailwind CSS
- **Design**: Hertz brand colors (Jaune #FFD100, Noir #000000)
- **Fonts**: Oswald (headings) + Manrope (body)

## User Personas
- Acheteurs de voitures d'occasion
- Particuliers cherchant qualité à bon prix
- Clients sensibles aux garanties et historique d'entretien

## Core Requirements
- ✅ Site responsive mobile-first
- ✅ Liste véhicules avec photo + infos de base
- ✅ Page détail avec galerie photos + fiche technique
- ✅ Badge promotion -20%
- ✅ Page contact avec formulaire
- ✅ Design professionnel aux couleurs Hertz

## What's Been Implemented (Décembre 2025)
- ✅ Homepage avec Hero section, badges de confiance, catalogue
- ✅ Carte véhicule : image, marque, modèle, prix, km, année, discount
- ✅ Page détail véhicule : galerie 4+ photos, specs, options, historique
- ✅ Page contact avec formulaire fonctionnel
- ✅ API CRUD véhicules + contacts
- ✅ Véhicule test : Volkswagen T-Roc 2022 (photos client)

## Prioritized Backlog
### P0 (MVP) - DONE
- [x] Catalogue véhicules
- [x] Page détail avec galerie
- [x] Contact form

### P1 (Next)
- [ ] Ajouter coordonnées réelles (téléphone, email, adresse)
- [ ] Ajouter plus de véhicules
- [ ] Interface admin pour gérer les véhicules

### P2 (Future)
- [ ] Filtres de recherche (marque, prix, année)
- [ ] Export PDF du véhicule
- [ ] Partage WhatsApp direct
