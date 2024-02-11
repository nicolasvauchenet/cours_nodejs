# Partie 1 : Introduction à Node.js et Fondamentaux

## 5. Introduction à Express.js

### Introduction au framework Express

Express.js est un framework web minimaliste et flexible pour Node.js, conçu pour faciliter la création d'applications
web et d'API REST. Il s'est imposé comme l'un des frameworks les plus populaires dans l'écosystème Node.js grâce à sa
simplicité, sa flexibilité et sa performance. Express fournit un ensemble riche de fonctionnalités pour les applications
web sans masquer les fonctionnalités de Node.js, offrant ainsi un bon équilibre entre performance et facilité de
développement.

1. **Qu'est-ce qu'Express.js ?**  
   Express.js est un framework pour construire des applications web basées sur Node.js. Il simplifie le processus de
   développement en fournissant une couche d'abstraction pour gérer les routes, les requêtes HTTP, les réponses et les
   middlewares. Express permet de structurer une application web ou API de manière organisée et maintenable.


2. **Caractéristiques Principales :**
    - **Simplicité :**  
      Express est conçu pour être simple et léger, offrant les outils nécessaires pour construire des applications web
      sans surcharge.
    - **Middleware :**  
      Express utilise le concept de middleware, des fonctions qui ont accès à l'objet de requête (`req`), l'objet de
      réponse (`res`), et la fonction middleware suivante dans le cycle de requête/réponse de l'application. Cela permet
      une modularité et une réutilisation du code.
    - **Routage :**  
      Le système de routage d'Express est très puissant et permet de définir des routes pour gérer différentes méthodes
      HTTP sur différents URL.
    - **Performance :**  
      En étant construit sur Node.js, Express hérite de sa performance, surtout pour les opérations d'entrée/sortie non
      bloquantes.
    - **Large écosystème :**  
      L'utilisation d'Express ouvre l'accès à un large écosystème de middlewares et de modules tiers qui peuvent être
      intégrés pour étendre les fonctionnalités de votre application.


3. **Installation d'Express :**  
   Pour commencer à utiliser Express dans votre projet, installez-le via NPM :

    ```bash
    npm install express
    ```


4. **Exemple de Base avec Express :**  
   Voici un exemple simple d'application Express qui crée un serveur web écoutant sur le port 3000 et répond à la racine
   avec "Hello, World!":

    ```javascript
    const express = require('express');
    const app = express();
    const port = 3000;
    
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    
    app.listen(port, () => {
        console.log(`Application exemple écoutant sur le port ${port}`);
    });
    ```


5. **Pourquoi Utiliser Express.js ?**
    - **Rapidité de développement :**  
      Express simplifie de nombreuses tâches répétitives liées à la gestion des requêtes HTTP, ce qui accélère le
      développement.
    - **Communauté active :**  
      Express jouit d'une large communauté de développeurs. Vous trouverez facilement des solutions à vos problèmes, des
      modules complémentaires et de la documentation.
    - **Flexibilité :**  
      Express n'impose pas beaucoup de structure à votre application, vous laissant libre de l'organiser comme vous le
      souhaitez.

Express.js est le choix privilégié pour de nombreux développeurs Node.js pour construire des applications web et des API
REST. Sa simplicité, couplée à la puissance de Node.js, en fait une solution efficace pour développer des applications
performantes et facilement maintenables.
Pour en savoir plus sur Express.js et découvrir comment l'utiliser pour construire des applications web sophistiquées,
visitez la [documentation officielle d'Express.js](https://expressjs.com/fr/).

### Création d'une application simple avec Express : Routes et Middleware

Express.js facilite grandement la création d'applications web et d'API en fournissant une interface simple pour définir
des routes HTTP et intégrer des middlewares, qui sont des fonctions exécutées entre la réception de la requête et
l'envoi de la réponse. Voici comment vous pouvez construire une application Express simple, en démontrant l'utilisation
de routes et de middleware.

1. **Définition de Routes :**  
   Les routes permettent de définir des réponses à différents chemins et méthodes HTTP. Chaque route peut avoir une ou
   plusieurs fonctions de traitement, qui sont exécutées lorsque la route est appariée.

   Exemple de base :

   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;
   
   // Route GET à la racine
   app.get('/', (req, res) => {
    res.send('Accueil de notre application Express!');
   });
   
   // Route GET pour "/a-propos"
   app.get('/a-propos', (req, res) => {
    res.send('À propos de notre application');
   });
   
   app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
   });
   ```


2. **Utilisation de Middleware :**  
   Les middlewares sont des fonctions qui ont accès aux objets de requête (`req`), de réponse (`res`), et à la
   fonction `next` du cycle de demande-réponse. Ils peuvent exécuter du code, modifier les objets de requête et de
   réponse, terminer le cycle de demande-réponse, ou appeler la fonction `next` pour passer le contrôle au middleware
   suivant.

   Exemple d'un middleware simple :

   ```javascript
   // Middleware qui affiche la date et l'heure de chaque requête
   app.use((req, res, next) => {
    console.log('Requête reçue à :', new Date().toISOString());
    next();
   });
   ```

   Middleware pour servir des fichiers statiques : Express fournit une fonctionnalité pour servir des fichiers
   statiques, tels que des images, des fichiers CSS, et des fichiers JavaScript, en utilisant le middleware
   intégré `express.static`.

   ```javascript
   app.use(express.static('public'));
   ```

   Avec cette ligne, tous les fichiers dans le dossier `public` seront servis directement. Par exemple, si vous avez une
   image `logo.png` dans `public/images`, elle sera accessible à http://localhost:3000/images/logo.png.


3. **Middleware pour le parsing du corps de la requête :**  
   Express 4.16.0 et plus récents incluent un middleware de base pour analyser le corps entrant de la requête en JSON et
   en données de formulaire URL-encoded. Cela permet d'accéder facilement aux données envoyées dans le corps de la
   requête via `req.body`.

   ```javascript
   app.use(express.json()); // Pour le parsing des requêtes JSON
   app.use(express.urlencoded({ extended: true })); // Pour le parsing des requêtes avec des corps encodés en URL
   ```

En combinant les routes et les middlewares, Express.js vous offre une grande flexibilité pour construire des
applications web et des API selon vos besoins spécifiques. Les routes permettent de répondre de manière appropriée aux
différentes requêtes HTTP, tandis que les middlewares offrent un mécanisme puissant pour traiter les requêtes, modifier
les réponses, et gérer des tâches telles que la journalisation, l'authentification, et la gestion des erreurs.

### Utilisation de Middleware tiers

Les middlewares tiers dans Express.js sont des modules ou des paquets qui offrent des fonctionnalités supplémentaires ou
prédéfinies à votre application. Ces middlewares peuvent être intégrés pour gérer des tâches courantes telles que le
parsing de corps de requête, la gestion des sessions, la sécurité, la journalisation et bien plus. L'utilisation de
middlewares tiers permet de réduire le temps de développement en réutilisant des solutions éprouvées au lieu de
réinventer la roue.

1. **Installation et Utilisation de Middleware tiers :**  
   Pour utiliser un middleware tiers dans votre application Express, vous devez d'abord l'installer via NPM. Après
   l'installation, vous pouvez l'intégrer dans votre application en utilisant app.use().

   Voici quelques middlewares tiers couramment utilisés dans les projets Express :

    - **Helmet pour la Sécurité** :  
      Helmet aide à sécuriser votre application en définissant divers en-têtes HTTP pour prévenir certaines
      vulnérabilités web.

      Installation :

       ```bash
      npm install helmet
       ```

      Utilisation :

       ```javascript
      const helmet = require('helmet');
      app.use(helmet());
       ```

    - **Morgan pour la Journalisation :**  
      Morgan est un middleware de journalisation des requêtes HTTP, utile pour le débogage et le monitoring de votre
      application.

      Installation :

       ```bash
      npm install morgan
       ```

      Utilisation :

       ```javascript
      const morgan = require('morgan');
      app.use(morgan('dev')); // Le format 'dev' est concis, idéal pour le développement
       ```

    - **Cors pour la Gestion des CORS :**  
      Le middleware cors permet d'activer facilement les CORS (Cross-Origin Resource Sharing), essentiel pour permettre
      à des clients web d'accéder à votre API depuis d'autres domaines.

      Installation :

      ```bash
      npm install cors
       ```

      Utilisation :

      ```javascript
      const cors = require('cors');
      app.use(cors()); // Utilise la configuration par défaut de CORS
       ```

    - **body-parser pour le Parsing des Corps de Requête :**  
      Bien qu'Express intègre son propre parser pour le JSON et les données URL-encoded, body-parser offre plus de
      flexibilité pour le parsing des corps de requête.

      Installation :

      ```bash
      npm install body-parser
       ```

      Utilisation :

      ```javascript
      const bodyParser = require('body-parser');
      app.use(bodyParser.json()); // Pour le parsing des corps de requête JSON
      app.use(bodyParser.urlencoded({ extended: true })); // Pour le parsing des corps de requête URL-encoded
       ```


2. **Avantages de l'Utilisation de Middleware tiers :**
    - **Productivité :**  
      Accélère le développement en fournissant des solutions prêtes à l'emploi pour des problèmes courants.
    - **Fiabilité :**  
      Beaucoup de middlewares tiers sont largement utilisés et testés par la communauté, offrant une base solide pour
      votre application.
    - **Maintenabilité :**  
      Simplifie la maintenance de l'application en séparant les préoccupations et en utilisant des composants
      modulaires.

L'intégration de middlewares tiers dans vos applications Express.js peut considérablement améliorer la fonctionnalité,
la sécurité et la performance de vos applications, tout en réduisant le temps de développement. En choisissant les bons
middlewares pour vos besoins spécifiques, vous pouvez construire des applications web robustes et efficaces avec moins
d'effort.
Pour explorer d'autres middlewares tiers disponibles et apprendre comment les intégrer dans vos projets, vous pouvez
consulter le [registre NPM ](https://www.npmjs.com/) ou
la [documentation officielle d'Express.js](https://expressjs.com/fr/), qui propose une liste de middlewares couramment
utilisés.
