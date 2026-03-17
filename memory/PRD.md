# HERTZ-PRO - Site de vente de véhicules d'occasion

## Problème original
Site professionnel pour "HERTZ-PRO" pour vendre des véhicules de flotte d'occasion.

## Architecture de production
- **Frontend** : Netlify (hertz-pro.fr) - React
- **Backend** : Render (https://hertz-spfi.onrender.com) - FastAPI
- **Base de données** : MongoDB Atlas (luminacluster)
- **Emails** : Resend (contact@hertz-pro.fr)
- **Analytics** : Umami

## Fonctionnalités implémentées
- Homepage, Catalogue (37 véhicules), Pages détail
- Pages: FAQ, CGV, Mentions Légales, Qui sommes-nous
- Contact form avec envoi email via Resend
- Bannière "VENDU" sur 3 véhicules (HP016276, HP178309, HP623279)
- Remise 20% affichée sur tous les véhicules
- Page admin protégée (/documents-hertz-pro, mdp: Capone77@)
- Documents éditables (facture, bon de commande)
- Seed automatique des véhicules au démarrage si base vide
- Retry automatique (3 tentatives) pour les appels API frontend
- Umami Analytics intégré

## Complété le 17 mars 2026
- Synchronisation code GitHub (autoconnectcrypto-ops/hertz)
- Suppression des 37 doublons (74 → 37 véhicules)
- Ajout champ `vendu` au modèle Vehicle
- Ajout seed automatique (seed_data.json) pour Render
- Ajout retry API frontend pour stabilité
- Retrait `emergentintegrations` de requirements.txt pour compatibilité Render
- Déploiement production : Netlify + Render (payant) + MongoDB Atlas
- Configuration REACT_APP_BACKEND_URL vers Render

## Credentials
- Admin documents: /documents-hertz-pro | mdp: Capone77@
- MongoDB Atlas: lumina_admin / luminacluster
- Resend API Key: dans les env vars Render

## Backlog
- P1: Refactoring App.js monolithique (1500+ lignes)
- P2: Logo sur plaques d'immatriculation
- P0: Clone site pour "HERTZ SALES"
