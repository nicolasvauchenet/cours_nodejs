# Partie 1 : Introduction à Node.js et Fondamentaux

## 2. Fondamentaux de Node.js

### Le modèle événementiel et non-bloquant (Event Loop)

Node.js est conçu autour d'un modèle événementiel et non-bloquant, qui est au cœur de sa capacité à gérer de nombreuses
connexions simultanées avec efficacité. Cette conception permet à Node.js d'exécuter des opérations d'entrée/sortie
(I/O) de manière asynchrone, ce qui le rend particulièrement adapté pour les applications nécessitant de hautes
performances et une faible latence, comme les applications web en temps réel.

1. **Comprendre l'Event Loop :**  
   L'Event Loop (boucle d'événements) est un mécanisme qui permet à Node.js de réaliser des opérations non-bloquantes,
   bien que JavaScript soit un langage à thread unique. L'Event Loop travaille en cycle, en exécutant les tâches
   inscrites dans différentes files d'attente et en gérant tous les événements ou opérations asynchrones comme les
   lectures/écritures de fichier, les opérations réseau, ou les temporisations.


2. **Fonctionnement de l'Event Loop :**  
   Quand une application Node.js démarre, l'Event Loop initie son exécution. Si une opération asynchrone est rencontrée,
   comme une lecture de fichier, elle est envoyée à un système en arrière-plan (comme le thread pool de libuv, la
   bibliothèque sous-jacente qui gère l'entrée/sortie de manière non-bloquante) et l'exécution du script continue sans
   attendre la fin de cette opération. Dès que l'opération en arrière-plan est terminée, elle est remise dans la queue
   de l'Event Loop pour être traitée dès que possible.


3. **Avantages du modèle non-bloquant :**  
   Ce modèle non-bloquant offre plusieurs avantages significatifs :

    - **Haute Performance et Scalabilité :**  
      En évitant les blocages sur les opérations d'I/O, Node.js peut gérer des milliers de connexions simultanées sur un
      seul thread de service, ce qui réduit considérablement les besoins en ressources système par rapport aux modèles
      traditionnels multithreads.
    - **Développement Simplifié :**  
      Bien que le modèle asynchrone puisse sembler complexe au premier abord, il encourage un style de programmation qui
      peut rendre les applications plus réactives et performantes.
    - **Réactivité Améliorée :**
      Les applications construites avec Node.js peuvent traiter les requêtes et répondre aux événements presque
      instantanément, ce qui est essentiel pour les applications en temps réel.


4. **Exemple de code illustrant l'Event Loop :**
   ```javascript
   console.log('Premier message');
   
   // Une opération asynchrone simulée avec setTimeout
   setTimeout(() => {
    console.log('Message asynchrone');
   }, 0);
   
   console.log('Dernier message');
   ```
   Dans cet exemple, même si le délai du `setTimeout()` est de 0 millisecondes, le "Message asynchrone" s'affiche après
   le "Dernier message". Cela s'explique par le fonctionnement de l'Event Loop : l'appel à `setTimeout()` est une
   opération asynchrone qui est placée dans la file d'attente des événements et ne sera traitée qu'après que le code
   synchrone ait été entièrement exécuté.

Le modèle événementiel et non-bloquant de Node.js est un pilier de sa puissance, permettant de construire des
applications hautement performantes et scalables. En maîtrisant ce concept, les développeurs peuvent tirer pleinement
parti de Node.js pour développer des applications web modernes capables de gérer efficacement de grandes charges de
travail asynchrones.

### Le Global Object, les Modules et NPM (Node Package Manager)

Node.js se distingue par sa capacité à modulariser le code via son système de modules et l'utilisation de NPM (Node
Package Manager) pour la gestion des dépendances. Ce système est fondamental pour construire des applications
organisées, maintenables et évolutives. En outre, l'objet global dans Node.js joue un rôle central, similaire à l'objet
window dans les navigateurs, mais avec des propriétés et des méthodes spécifiques à l'environnement serveur.

1. **L'Objet Global :**  
   Dans Node.js, l'objet global contient des fonctions et des variables qui sont accessibles partout dans l'application.
   Contrairement au navigateur où window sert d'objet global, Node.js utilise un objet nommé global. Cet objet contient
   des éléments essentiels comme Buffer, utilisé pour manipuler des données binaires, ou setImmediate, une fonction
   permettant de différer l'exécution d'une callback après l'exécution du code en cours.

   Un exemple simple d'utilisation de l'objet global :

   ```javascript
   console.log(global.setTimeout === setTimeout); // true
   console.log(global.setInterval === setInterval); // true
   ``` 
   Cet exemple démontre que `setTimeout` et `setInterval` sont en fait des méthodes de l'objet `global`, ce qui permet
   de les appeler directement sans préciser `global.` devant.


2. **Les Modules :**  
   Node.js adopte le **CommonJS module specification** pour son système de modules. Chaque fichier JavaScript dans un
   projet Node.js est traité comme un module. Cela permet de séparer le code en différents fichiers pour une meilleure
   organisation et réutilisation. Les modules sont encapsulés et ne partagent pas l'espace de nom global, ce qui réduit
   considérablement les conflits entre le code.

   Pour utiliser un module, Node.js fournit `require` pour importer des modules et `module.exports` ou `exports` pour
   exporter des fonctions, objets ou valeurs d'un module.

   Exemple d'exportation d'un module :

   ```javascript
   // Dans message.js
   const message = "Hello, world!";
   module.exports = message;
   ```

   Et son importation :

   ```javascript
   // Dans app.js
   const message = require('./message');
   console.log(message); // Affiche "Hello, world!"
   ```


3. **NPM (Node Package Manager) :**  
   NPM est l'écosystème de packages de Node.js et joue un rôle crucial dans la gestion des bibliothèques et des outils
   tiers. Avec NPM, les développeurs peuvent facilement partager et réutiliser le code. Un fichier package.json au sein
   d'un projet Node.js définit les dépendances nécessaires, permettant une installation facile avec la commande npm
   install.

   Pour initialiser un nouveau projet Node.js et créer un package.json, utilisez :

   ```bash
   npm init
   ```
   Pour installer un package, comme Express, utilisez :

   ```bash
   npm install express
   ```

   Cette commande télécharge Express et l'ajoute aux dépendances dans package.json, assurant que tout autre développeur
   travaillant sur le projet puisse installer les mêmes dépendances.

La combinaison de l'objet global, du système de modules, et de NPM crée un environnement de développement puissant et
flexible pour Node.js. En séparant le code en modules et en utilisant NPM pour gérer les bibliothèques externes, les
développeurs peuvent construire des applications robustes et maintenables.

### Création d'un petit serveur HTTP

Un des usages les plus répandus de Node.js est la création de serveurs HTTP pour développer des applications web. Grâce
à ses capacités asynchrones et non-bloquantes, Node.js est particulièrement bien adapté à cette tâche. Voici comment
vous pouvez créer un serveur HTTP simple avec Node.js, illustrant la simplicité et l'efficacité de Node.js pour des
tâches de ce type.

1. **Utilisation du module HTTP natif :**  
   Node.js inclut un module `http` qui permet de créer des serveurs HTTP sans dépendances externes. Cela rend le
   processus de mise en place d'un serveur HTTP basique incroyablement simple et rapide.


2. **Création du serveur :**  
   Pour créer un serveur HTTP, vous commencez par importer le module `http` et utilisez sa méthode `createServer`. Cette
   méthode attend une fonction de rappel (callback) qui sera invoquée à chaque requête reçue par le serveur. La fonction
   de rappel reçoit deux objets : `req` (la requête) et `res` (la réponse), vous permettant d'interagir avec les données
   de la requête et de construire la réponse à envoyer.


3. **Exemple de code :**  
   Voici un exemple simple de création d'un serveur HTTP qui écoute sur le port 3000 et répond "Hello, World!" à toutes
   les requêtes :

   ```javascript
   const http = require('http');
   
   // Création du serveur
   const server = http.createServer((req, res) => {
    res.statusCode = 200; // Code HTTP de succès
    res.setHeader('Content-Type', 'text/plain'); // Définition du type de contenu de la réponse
    res.end('Hello, World!\n'); // Corps de la réponse envoyée au client
   });
   
   // Le serveur écoute sur le port 3000
   server.listen(3000, '127.0.0.1', () => {
    console.log('Serveur en écoute sur http://127.0.0.1:3000/');
   });
   ```
   Pour exécuter ce serveur, enregistrez le code dans un fichier, par exemple `server.js`, puis exécutez-le avec Node.js
   en utilisant la commande `node server.js` dans votre terminal. Vous verrez le message "Serveur en écoute
   sur http://127.0.0.1:3000/" s'afficher, indiquant que le serveur est démarré et prêt à recevoir des requêtes.


4. **Tester le serveur :**  
   Pour tester votre serveur, ouvrez un navigateur web et accédez à http://127.0.0.1:3000/. Vous devriez voir s'afficher
   le message "Hello, World!". Cela confirme que votre serveur fonctionne et est capable de répondre aux requêtes HTTP.

La création d'un serveur HTTP avec Node.js est un processus simple et direct, démontrant la puissance et la flexibilité
de Node.js pour le développement d'applications web. En partant de ce modèle de base, vous pouvez ajouter des routes,
gérer différentes méthodes HTTP (GET, POST, etc.), et intégrer des fonctionnalités plus complexes pour construire des
applications web complètes.
