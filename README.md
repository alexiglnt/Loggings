# Ingestion d’évènement LOGGING


## Description du projet

Ce projet a été réalisé en utilisant les technologies suivantes : 
- Next.js 
- React 
- TypeScript
- MongoDB
- Docker

L'objectif est de créer une route d'API pour l'ingestion d'événements de logging au format JSON. Les données horaires, le type et d'autres informations sont automatiquement enregistrées en fonction des données fournies. Les événements sont affichés dans un back-office sous forme de liste. Les événements sont également disponibles sous forme de volet déroulant, permettant d'afficher les données JSON stockées dans la route d'API.


## Getting Started

Lancer le serveur MongoDB avec Docker et MongoDB Compass :


Puis Lancez le serveur de développement :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.


