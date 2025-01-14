# Online Library Manager

Une application de gestion de bibliothèque en ligne permettant de gérer les livres et les catégories. Ce projet utilise **Node.js**, **Express**, **MongoDB** et **EJS** pour une gestion dynamique des livres et des catégories, ainsi qu'un filtrage par catégorie.

## Fonctionnalités principales

### 1. **Gestion des livres (CRUD)**

- **Ajouter un livre** : 
  - Titre, Auteur
  - Sélection d'une catégorie (parmi celles existantes)
  - Statut de disponibilité (disponible ou non)
  - Date d'ajout et de modification générées automatiquement.
  
- **Afficher la liste des livres** : 
  - Affichage de tous les livres sur la page d'accueil avec possibilité de filtrer par catégorie.
  
- **Modifier un livre** : 
  - Modifier les informations d'un livre existant.
  
- **Supprimer un livre** : 
  - Supprimer un livre.

### 2. **Gestion des catégories (CRUD)**

- **Ajouter une catégorie** : 
  - Nom de la catégorie et description
  - Le nombre de livres est automatiquement calculé en fonction des livres associés.
  
- **Afficher la liste des catégories** : 
  - Affichage de toutes les catégories sur une page dédiée, avec leur nom, description et le nombre de livres associés.

- **Modifier une catégorie** : 
  - Modifier les informations d'une catégorie existante.

- **Supprimer une catégorie** : 
  - Supprimer une catégorie. Les livres associés ne sont pas supprimés mais leur catégorie est mise à `null`.

### 3. **Filtrage des livres**
- Filtrer les livres par catégorie directement depuis la page d'accueil.

## Technologies utilisées

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Template Engine** : EJS
- **Middleware** : Method-Override (pour les requêtes PUT/DELETE)
- **Gestion des dépendances** : npm
- **CSS** : Bootstrap (optionnel, mais recommandé pour un design responsive)

## Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) et [MongoDB](https://www.mongodb.com/try/download/community) sur votre machine.

### Étapes d'installation

1. Clonez le projet :

```bash
git clone https://github.com/Gbane26/gestion-biblio.git
cd gestion-biblio
```

 un fichier .env
```bash
SERVER_PORT=3000
DB_HOST=cluster0.f4qnc.mongodb.net
DB_USER=projet-demo-user
DB_PASSWORD=JNTsUnrmbIu95dKw
DB_NAME=onlineLibrary
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur :
```bash
npm start
```

Accédez à l'application dans votre navigateur à l'adresse suivante : http://localhost:3000.