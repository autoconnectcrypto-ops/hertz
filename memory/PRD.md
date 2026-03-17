# HERTZ-PRO - Site de Vente de Véhicules B2B

## Problème Original
Créer un site web professionnel pour "HERTZ-PRO" permettant de vendre des véhicules d'occasion issus de la flotte Hertz à des professionnels (B2B).

## Informations de la Société
- **Raison sociale** : Hertz France
- **Siège social** : Bâtiment A1, Immeuble Diagonale Sud, 6 Avenue Gustave Eiffel, 78180 Montigny-le-Bretonneux
- **SIRET** : 377 839 667 01946
- **Email** : contact@hertz-pro.fr
- **Téléphone** : 00 00 00 00 (à modifier)

## Fonctionnalités Implémentées

### Pages
- ✅ **Accueil** : Hero avec image, stats, section "Comment ça marche", véhicules à la une, marques
- ✅ **Catalogue** : Grille de 37 véhicules avec filtres, badges -20%
- ✅ **Détail véhicule** : Galerie photos, specs, prix avec remise
- ✅ **Contact** : Formulaire de contact, coordonnées, horaires
- ✅ **Qui sommes-nous** : Informations société complètes
- ✅ **FAQ** : Questions fréquentes avec accordéon
- ✅ **CGV** : Conditions générales de vente
- ✅ **Mentions légales** : Informations juridiques

### Design
- ✅ Thème blanc/clair professionnel
- ✅ Couleurs Hertz : Jaune #FFD100, Noir #0A0A0A
- ✅ Police Oswald pour les titres
- ✅ Responsive mobile
- ✅ Animations au scroll
- ✅ Badge -20% jaune avec prix barré

### Prix
- Prix barré en gris foncé
- Prix remisé en noir gras avec trait jaune en dessous
- Remise de 20% automatique

### Données
- 37 véhicules dans la base MongoDB
- Tous les véhicules ont "France" comme pays d'origine
- Images stockées dans /app/frontend/public/vehicles/

## Architecture Technique
- **Frontend** : React + TailwindCSS + React Router
- **Backend** : FastAPI + Motor (async MongoDB)
- **Database** : MongoDB (collection: vehicles)
- **Fichier principal** : /app/frontend/src/App.js (monolithique)

## Processus B2B (4 étapes)
1. Sélectionnez - Parcourez notre catalogue et sélectionnez les véhicules
2. Contactez - Appelez nos commerciaux ou envoyez un email
3. Commandez - Édition du bon de commande et paiement
4. Livraison - Livraison des véhicules via transporteur

## Tâches Complétées
- [x] Site complet avec toutes les pages
- [x] 37 véhicules ajoutés
- [x] Design thème blanc professionnel
- [x] Version mobile responsive
- [x] Prix avec -20% et trait jaune
- [x] Pays d'origine corrigé (France pour tous)
- [x] Page "Qui sommes-nous" avec infos société
- [x] Section "Comment ça marche" mise à jour pour B2B

## Prochaines Étapes
- [ ] Déploiement et liaison du nom de domaine HERTZ PRO
- [ ] Création du site HERTZ SALES (copie avec nouveau branding)
- [ ] Mettre à jour le vrai numéro de téléphone
- [ ] (Optionnel) Refactoriser App.js en composants séparés

## URLs
- Preview : https://hertz-pro-preview.preview.emergentagent.com
- Production : (à lier)
