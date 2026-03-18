# HERTZ-PRO - Site de Vente de Véhicules d'Occasion Professionnels

## Problème Original
Site professionnel pour "HERTZ-PRO" pour la vente de véhicules d'occasion aux professionnels.

## Stack Technique
- **Frontend**: React, react-router-dom, TailwindCSS
- **Backend**: FastAPI, motor (MongoDB async)
- **DB**: MongoDB Atlas
- **Déploiement**: Netlify (Frontend) + Render (Backend) + MongoDB Atlas (DB)
- **Intégrations**: Resend (emails contact), Umami Analytics

## Pages
- Accueil, Catalogue, Détail Véhicule, Contact, Qui sommes-nous, FAQ, Mentions légales
- Admin documents: `/documents-hertz-pro` (mdp: Capone77@)

## Fonctionnalités
- Remise 20% affichée sur tous les véhicules
- Bandeau "VENDU" sur véhicules vendus
- Formulaire de contact avec Resend
- Documents admin éditables (factures, bons de commande)
- Auto-seeding DB depuis seed_data.json

## Catalogue - État Actuel
- **Total**: 65 véhicules
- **Originaux**: 37 (dont 13 marqués VENDU)
- **Nouveaux ajoutés**: 28 (sur 29 prévus, Cupra Formentor exclu par l'utilisateur)
- **Tous les nouveaux véhicules ont leur VIN renseigné**
- **seed_data.json synchronisé** avec les 65 véhicules

## Véhicules ajoutés dans cette session (9)
1. Renault Megane E-TECH Techno EV60 220 - HP553728
2. Renault Megane Estate Business TCe 115 FAP - HP567412
3. Renault Trafic Fourgon FG CF L1H1 2T8 Blue dCi 110 - HP582163
4. Toyota Corolla Hybride 122h Dynamic Business - HP596847
5. Toyota Corolla Hybride 184h Dynamic Business - HP611293
6. Toyota Proace City 1.5 Medium 130 D-4D Business Auto - HP625731
7. VW Polo Life Business 1.0 TSI 95 - HP639518
8. VW Polo VI Style 1.0 TSI 95 BVM5 - HP653274
9. VW T-Roc LOUNGE 1.0 TSI 110 - HP667935

## Tâches Restantes
- P1: Clone du site pour "HERTZ SALES"
- P1: Refactoring App.js (1500+ lignes monolithique)
- P2: Logo sur plaques d'immatriculation

## Fichiers Critiques
- `/app/frontend/src/App.js` - Monolithe à refactorer
- `/app/backend/server.py` - Logique seeding DB
- `/app/backend/seed_data.json` - Source de vérité pour les véhicules
