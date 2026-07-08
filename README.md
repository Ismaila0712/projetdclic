markdown
# ShopEase - Plateforme E-commerce Full-Stack

ShopEase est une application web de commerce en ligne développée avec **React** (front-end) et **Laravel** (back-end / API). 
Elle permet aux utilisateurs de parcourir un catalogue de produits, gérer un panier, passer des commandes et consulter leur historique. 
Un espace administrateur permet de gérer les produits et les commandes.

---

##  Technologies utilisées

- **Front-end** : React 18, React Router DOM, Bootstrap 5, Axios
- **Back-end** : Laravel 13, PHP 8.3, MySQL
- **Authentification** : Laravel Sanctum (tokens API)
- **Tests** : PHPUnit (backend), Selenium IDE (frontend)
- **Versionnement** : Git / GitHub

---

##  Fonctionnalités principales

###  Utilisateur non connecté
- Consultation du catalogue de produits
- Recherche et filtrage par catégorie
- Visualisation du détail d’un produit
- Inscription / Connexion

###  Utilisateur connecté
- Gestion du panier (ajout, modification des quantités, suppression)
- Passage de commande
- Consultation de l’historique des commandes

###  Administrateur
- Tableau de bord avec statistiques (produits, commandes, utilisateurs)
- Gestion complète des produits (CRUD)
- Gestion des commandes (visualisation et mise à jour du statut)

---

##  Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 18
- **MySQL** 
- **Git**

---

##  Installation

### 1️.Cloner le dépôt

```bash
git clone https://github.com/Ismaila0712/projetdclic.git
cd shopease
2️.Configurer le Backend (Laravel)
bash
cd backend
composer install
cp .env.example .env
Modifiez le fichier .env avec vos identifiants de base de données :

env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shopease_db
DB_USERNAME=root
DB_PASSWORD=
Générez la clé et exécutez les migrations + seeders :

bash
php artisan key:generate
php artisan migrate --seed

3️Configurer le Frontend (React)
bash
cd ../frontend
npm install
▶️ Lancer l’application
Backend
bash
cd backend
php artisan serve
Le backend est accessible sur http://127.0.0.1:8000

Frontend
bash
cd frontend
npm run dev
Le frontend est accessible sur http://localhost:5173

🔑 Identifiants de test
Rôle	Email	Mot de passe
Admin	admin@shopease.com	password
Utilisateur	ismaila@shopease.com	password
📂 Structure du projet
text
shop-ease-project/
├── backend/                 # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── ...
│   └── ...
└── README.md

🧪 Tests
Tests Backend (PHPUnit)
bash
cd backend
php artisan test
Tests Frontend (Selenium IDE)
Des scénarios de test sont disponibles dans le dossier tests/selenium/.
Voir le document SELENIUM_TESTS.md pour plus de détails.

🤝 Contribuer
Les contributions sont les bienvenues. Merci de créer une branche et de soumettre une pull request.

📄 Licence
Ce projet est réalisé dans le cadre d’un cours de développement web approfondi organiser par Dclic et OIF. Il est libre d’utilisation à des fins éducatives.

© 2026 ShopEase - Projet Full-Stack React + Laravel