# Partie 1 : Introduction à Node.js et Fondamentaux

## 3. Comprendre les API et REST

### Introduction aux API

Les API (Application Programming Interfaces) sont des interfaces logicielles qui permettent à différentes applications
de communiquer entre elles. Elles jouent un rôle crucial dans le développement moderne de logiciels, en permettant
l'échange de données et la connexion de services de manière efficace et sécurisée. Dans le contexte du développement web
et de Node.js, comprendre les API est fondamental pour construire des applications dynamiques et interactives.

1. **Qu'est-ce qu'une API ? :**  
   Une API est un ensemble de règles, de protocoles et d'outils pour construire des logiciels et des applications. Elle
   définit la manière dont les composants logiciels doivent interagir entre eux, souvent à travers un ensemble
   d'endpoints HTTP qui exposent des fonctionnalités spécifiques du logiciel ou du service. Par exemple, une API web
   peut permettre à une application web de demander des données à un serveur, de soumettre des mises à jour de données,
   ou d'exécuter des opérations, le tout à travers le protocole HTTP.


2. **Pourquoi les API sont-elles importantes ? :**  
   Les API facilitent la modularité et la réutilisation du code, permettant aux développeurs de construire des
   applications complexes et évolutives en assemblant des services existants. Elles servent de pont entre différents
   systèmes logiciels, permettant à des applications de plateformes différentes (comme des serveurs, des ordinateurs de
   bureau, des appareils mobiles, et même des appareils IoT) de communiquer et de collaborer.


3. **Types d'API :**
    - **API Web / HTTP :**  
      Ces API utilisent le protocole HTTP pour permettre la communication entre le client et le serveur. Elles sont
      largement utilisées pour le développement d'applications web et mobiles.
    - **API de bibliothèque/logiciel :**  
      Fournissent des fonctions et des routines pour effectuer des tâches spécifiques au sein d'un logiciel, comme
      accéder à une base de données ou dessiner des graphiques à l'écran.
    - **API Système d'exploitation :**  
      Permettent aux applications de réaliser des opérations liées au système d'exploitation sous-jacent, comme gérer
      les fichiers ou les processus.


4. **Exemple d'utilisation d'une API :**  
   Imaginons une application de météo. Au lieu de générer ses propres données météorologiques, l'application peut se
   connecter à une API de service météorologique externe pour récupérer les prévisions. L'application envoie une requête
   HTTP à l'API, spécifiant la localisation pour laquelle elle souhaite obtenir des informations. L'API traite la
   requête et renvoie les données météorologiques pour cette localisation, que l'application peut ensuite afficher à
   l'utilisateur.

    ```javascript
    fetch('https://api.meteo.exemple/previsions?location=Paris')
        .then(response => response.json())
        .then(data => console.log('Prévisions météo pour Paris:', data))
        .catch(error => console.error('Erreur lors de la récupération des données météo:', error));
    ```

Les API sont des composants essentiels du paysage technologique actuel, facilitant l'intégration et la communication
entre différents systèmes et services. Dans le développement avec Node.js, les API permettent de construire des
applications web dynamiques qui interagissent avec des bases de données, des services tiers, et des clients web, offrant
une expérience utilisateur riche et interactive.

### La norme REST et le modèle de maturité de Richardson

REST (Representational State Transfer) est un ensemble de principes architecturaux pour la conception d'API web.
Développé par Roy Fielding dans sa thèse de doctorat en 2000, REST est devenu la norme de facto pour le développement
d'API web en raison de sa simplicité, de sa flexibilité et de son efficacité. Le modèle de maturité de Richardson, nommé
d'après Leonard Richardson, propose une méthode pour évaluer la conformité d'une API web aux principes REST en la
classant sur une échelle de 0 à 3.

1. **Principes de REST :**  
   REST est basé sur quelques principes clés qui guident la conception d'une API :

    - **Interface uniforme :**  
      Les ressources exposées par l'API sont accessibles via des URI (Uniform Resource Identifiers) et manipulées à
      travers un ensemble standard de méthodes HTTP (GET, POST, PUT, DELETE, etc.).
    - **Architecture client-serveur :**  
      Les responsabilités du client et du serveur sont séparées, permettant une évolutivité et une maintenance
      indépendantes.
    - **Utilisation des méthodes HTTP standard :**  
      REST s'appuie sur les méthodes HTTP (GET, POST, PUT, DELETE, etc.) pour les opérations CRUD (Create, Read, Update,
      Delete).
    - **Sans état (Stateless) :**  
      Chaque requête de l'API doit contenir toutes les informations nécessaires pour être comprise et traitée, sans
      dépendre d'un état stocké sur le serveur.
    - **Ressources identifiables :**  
      Les ressources, comme les utilisateurs ou les articles, sont identifiées de manière unique à travers des URI (
      Uniform Resource Identifiers).
    - **Représentation des ressources :**  
      Les ressources peuvent être représentées dans différents formats (JSON, XML, HTML, etc.), et l'API utilise la
      négociation de contenu pour sélectionner le format approprié basé sur les en-têtes HTTP envoyés par le client.

Ressource complémentaire : [Les règles de l'API REST](https://restfulapi.net/rest-architectural-constraints/)

2. **Le modèle de maturité de Richardson :**  
   Le modèle de maturité de Richardson décrit quatre niveaux d'adoption des principes REST, permettant de mesurer à quel
   point une API est "RESTful".

    - **Niveau 0 - Le marais POX (Plain Old XML) :**  
      À ce niveau, l'API n'utilise pas les principes REST. Les opérations sont effectuées via un seul point d'entrée,
      souvent en utilisant uniquement POST et retournant les données dans un format comme XML.
    - **Niveau 1 - Ressources :**  
      L'API introduit des concepts de ressources individuelles identifiables via des URI, mais n'utilise pas pleinement
      les méthodes HTTP pour les opérations sur ces ressources.
    - **Niveau 2 - Verbes HTTP :**  
      L'API utilise les méthodes HTTP pour définir les opérations sur les ressources. Ce niveau intègre la notion de
      sans état et la gestion appropriée des réponses HTTP.
    - **Niveau 3 - Hypermedia (HATEOAS ou Hypermedia As The Engine Of Application State) :**  
      Le plus haut niveau de maturité. Les réponses de l'API incluent des hypermédias, généralement des liens, guidant
      le client sur les actions possibles à partir de l'état actuel. Cela permet une navigation et une découverte
      dynamiques des opérations disponibles.

Ressource
complémentaire : [Le modèle de maturité de Richardson](https://martinfowler.com/articles/richardsonMaturityModel.html)

3. **Importance de REST et du modèle de Richardson :**  
   Adopter REST et viser un niveau élevé sur l'échelle de maturité de Richardson permet de construire des API web plus
   claires, plus standardisées et plus faciles à utiliser. Cela favorise l'intégrabilité, la scalabilité et la
   maintenance des applications web. Les clients de l'API peuvent interagir avec les ressources de manière intuitive et
   efficace, en utilisant les standards web existants.

La norme REST et le modèle de maturité de Richardson fournissent un cadre pour concevoir des API web robustes,
évolutives et faciles à utiliser. En suivant les principes REST et en visant un niveau élevé de maturité, les
développeurs peuvent assurer une meilleure compatibilité et flexibilité dans le développement d'applications web
modernes.

### La documentation d'API avec Swagger

La documentation est une composante essentielle de toute API REST, facilitant la compréhension, l'utilisation et
l' intégration de l'API par les développeurs. Swagger (aujourd'hui connu sous le nom de OpenAPI) est l'un des outils les
plus populaires pour documenter, concevoir et consommer des API REST. Il fournit un ensemble d'outils open source pour
générer des interfaces utilisateur interactives pour les API REST, ainsi que des spécifications pour décrire les API de
manière structurée.

1. **Qu'est-ce que Swagger / OpenAPI ? :**  
   Swagger est une spécification pour les fichiers de description d'API qui permet aux développeurs de définir
   l'ensemble des opérations disponibles dans une API, les structures de données, les paramètres, et les réponses
   attendues. La spécification OpenAPI (OAS) est une extension de Swagger et est utilisée pour créer une documentation
   vivante et interactive de l'API, facilitant ainsi le test et le débogage des endpoints de l'API.


2. **Intégration de Swagger dans un projet Node.js :**  
   Pour intégrer Swagger dans un projet Node.js utilisant Express, vous pouvez utiliser le package `swagger-ui-express`
   pour servir la documentation de l'API générée à partir d'un fichier de spécification Swagger (généralement un fichier
   YAML ou JSON).

   Installation de `swagger-ui-express` :

   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

   Configuration de Swagger dans votre projet :

   Créez un fichier de spécification Swagger, par exemple `swagger.yaml`, dans le répertoire racine de votre projet, ou
   utilisez `swagger-jsdoc` pour générer la spécification à partir de commentaires dans votre code.

   Intégration avec Express :

   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerJsdoc = require('swagger-jsdoc');
   const express = require('express');
   const app = express();
   
   const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API des utilisateurs',
            version: '1.0.0',
            description: 'Une simple API REST pour gérer des utilisateurs',
        },
   },
   apis: ['./routes/*.js'], // chemin vers les fichiers de vos routes Express
   };
   
   const specs = swaggerJsdoc(options);
   
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
   
   app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
   });
   ```


3. **Avantages de documenter votre API avec Swagger :**
    - **Documentation Interactive :**  
      Swagger UI offre une interface utilisateur web où les utilisateurs peuvent voir toutes les routes, les paramètres,
      et les réponses de l'API, et même exécuter des requêtes directement depuis le navigateur.
    - **Facilité d'Intégration :**  
      La spécification OpenAPI peut être utilisée pour générer des clients d'API dans de nombreux langages de
      programmation, réduisant le temps nécessaire pour intégrer l'API dans des applications.
    - **Standardisation :**  
      Utiliser Swagger aide à standardiser la documentation de l'API à travers les projets, rendant plus facile pour les
      nouveaux développeurs de comprendre et d'utiliser les API.

Documenter votre API REST avec Swagger améliore considérablement l'expérience de développement en fournissant une
documentation claire, interactive, et facile à naviguer. L'intégration de Swagger dans vos projets Node.js avec Express
est simple et apporte des bénéfices immédiats en termes de testabilité, d'intégrabilité, et de maintenabilité de votre
API.

Pour approfondir, explorez le [site officiel de Swagger Editor](https://editor.swagger.io/), ainsi que le package
NPM [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc), pour tirer le meilleur parti de Swagger dans vos
projets d'API REST.

### Création d'une API REST simple avec Node.js

Créer une API REST simple avec Node.js est une excellente manière de comprendre les principes fondamentaux de Node.js et
du développement d'API. Cela implique d'utiliser le module HTTP natif de Node.js pour gérer les requêtes et les
réponses. Voici comment vous pouvez créer une API REST de base pour gérer des utilisateurs avec les opérations CRUD
(Create, Read, Update, Delete), uniquement avec le module HTTP de Node.js.

1. **Mise en place du serveur HTTP :**  
   Commencez par créer un fichier, par exemple `server.js`, puis importez le module HTTP natif de Node.js pour démarrer
   un serveur :

   ```javascript
   const http = require('http');
   const url = require('url');
   
   const port = 3000;
   
   const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
   
    // Routeur simple
    switch (trimmedPath) {
        case '':
            homeRoute(req, res);
            break;
        case 'utilisateurs':
            utilisateursRoute(req, res);
            break;
        default:
            notFoundRoute(req, res);
            break;
    }
   });
   
   server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
   });
   ```


2. **Définition des routes :**  
   Définissez les fonctions pour gérer les différentes routes. Dans cet exemple simplifié, nous allons définir une route
   pour accueillir les utilisateurs et une autre pour gérer les requêtes liées aux utilisateurs.

   ```javascript
   // Route Accueil
   function homeRoute(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bienvenue sur notre API REST simple');
   }
   
   // Route Utilisateurs
   function utilisateursRoute(req, res) {
    const method = req.method;
   
    if (method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Liste des utilisateurs' }));
    }
   }
   
   // Route 404
   function notFoundRoute(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Non Trouvé');
   }
   ```


3. **Gestion des requêtes et des réponses :**  
   Dans cet exemple, la gestion des requêtes est très basique. Pour un vrai projet, vous devrez analyser le corps des
   requêtes POST ou PUT pour extraire les données envoyées par les clients, ce qui peut être fait en écoutant les
   événements `data` et `end` sur l'objet de requête.

4. **Tester l'API :**
   Pour tester votre serveur, utilisez un client HTTP comme Postman ou cURL. Par exemple, pour accéder à la route des
   utilisateurs avec cURL :

   ```bash
   curl http://localhost:3000/utilisateurs
   ```

   Vous devriez recevoir une réponse avec le message "Liste des utilisateurs".

Bien que cet exemple soit extrêmement basique et ne couvre pas de nombreux aspects importants du développement d'API
REST (comme la gestion des erreurs, le parsing du corps de la requête, et l'interaction avec une base de données), il
fournit une bonne introduction à la création d'une API REST sans frameworks externes en Node.js. Cela démontre la
flexibilité de Node.js et comment il peut être utilisé pour construire des fonctionnalités backend avec relativement peu
de code. Pour des applications en production, l'utilisation de frameworks tels qu'Express.js est recommandée pour
simplifier le développement et la maintenance.
