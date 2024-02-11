# Partie 2 : Bases de Données, Gestion des Données et Sécurité

## 10. Gestion des Erreurs et Tests automatisés

### Gestion des erreurs dans une application Express

La gestion des erreurs est un aspect crucial du développement d'applications web robustes. Express fournit un mécanisme
flexible pour gérer les erreurs survenues pendant l'exécution de l'application, permettant aux développeurs de répondre
de manière appropriée aux problèmes et d'améliorer l'expérience utilisateur en évitant les crashs de l'application.

1. **Middleware de Gestion des Erreurs :**  
   Dans Express, les erreurs sont gérées à l'aide de middlewares spéciaux qui ont quatre arguments au lieu de trois :
   (`err`, `req`, `res`, `next`). Express identifie automatiquement une fonction middleware comme un gestionnaire
   d'erreurs si elle prend ces quatre arguments.


2. **Création d'un Middleware de Gestion des Erreurs :**  
   Vous pouvez créer un middleware de gestion des erreurs à la fin de la chaîne de middlewares de votre application pour
   attraper toutes les erreurs qui n'ont pas été gérées précédemment.

    ```javascript
    app.use((err, req, res, next) => {
        console.error(err.stack); // Log de l'erreur dans la console du serveur
        res.status(500).send('Quelque chose s\'est mal passé !');
    });
    ```

3. **Propagation des Erreurs :**  
   Pour passer une erreur à ce middleware de gestion des erreurs, vous pouvez simplement appeler `next()` avec un
   argument d'erreur dans n'importe quel autre middleware ou routeur :

    ```javascript
    app.get('/route-qui-echoue', (req, res, next) => {
        const err = new Error('Erreur simulée');
        next(err); // Passe l'erreur au gestionnaire d'erreurs
    });
    ```


4. **Gestion des Erreurs Asynchrones :**  
   Pour les opérations asynchrones, vous pouvez utiliser `catch()` sur les promesses ou un bloc `try...catch` dans les
   fonctions asynchrones, puis passer l'erreur à `next()` :

    ```javascript
    app.get('/route-async', async (req, res, next) => {
        try {
            // Simule une opération asynchrone qui échoue
            await Promise.reject(new Error('Erreur asynchrone'));
        } catch (err) {
            next(err);
        }
    });
    ```


5. **Personnalisation des Réponses d'Erreur :**  
   Vous pouvez personnaliser le gestionnaire d'erreurs pour renvoyer des réponses différentes selon le type d'erreur ou
   son statut. Cela permet de fournir des messages d'erreur plus utiles aux clients tout en cachant les détails
   d'implémentation ou les informations sensibles.

    ```javascript
    app.use((err, req, res, next) => {
        if (err.type === 'DatabaseError') {
            res.status(500).send('Erreur de Base de Données');
        } else if (err instanceof SyntaxError) {
            res.status(400).send('Erreur de syntaxe dans la requête');
        } else {
            res.status(500).send('Erreur Serveur');
        }
    });
    ```

Une gestion des erreurs efficace et bien planifiée est essentielle pour construire des applications Express fiables et
conviviales. En utilisant des middlewares de gestion des erreurs et en propageant correctement les erreurs à travers
l'application, vous pouvez assurer que votre application traite les erreurs de manière élégante et fournit des réponses
utiles aux utilisateurs finaux, améliorant ainsi la stabilité et la qualité de votre application.

### Introduction aux tests unitaires et d'intégration (Jest, Mocha, Chai)

Les tests unitaires et d'intégration sont essentiels dans le développement d'applications pour s'assurer que le code
fonctionne comme prévu et pour prévenir les régressions lors de l'ajout de nouvelles fonctionnalités ou de la correction
de bugs. Les tests unitaires se concentrent sur des parties isolées du code, généralement des fonctions ou des méthodes,
tandis que les tests d'intégration vérifient comment différentes parties du système travaillent ensemble.

1. **Jest :**  
   Jest est un framework de tests populaire créé par Facebook. Il est conçu pour être complet, fonctionnant à la fois
   comme un lanceur de tests, une bibliothèque d'assertion, et un outil de couverture de code. Jest est souvent loué
   pour sa simplicité d'utilisation, en particulier pour les applications React, mais il est suffisamment polyvalent
   pour être utilisé dans tout projet JavaScript.

    - **Installation de Jest :**

      ```bash
      npm install --save-dev jest
      ```

    - **Configuration de Jest :**
      Vous pouvez configurer Jest en ajoutant une section `jest` dans votre `package.json`, ou en créant un fichier de
      configuration séparé, `jest.config.js`. Pour les projets utilisant Babel, vous aurez également besoin
      de `babel-jest`.

    - **Exemple de Test Unitaire avec Jest :**

       ```javascript
       // fonction.js
       function addition(a, b) {
           return a + b;
       }
   
       module.exports = addition;
   
       // fonction.test.js
       const addition = require('./fonction');
   
       test('additionne 1 + 2 pour donner 3', () => {
           expect(addition(1, 2)).toBe(3);
       });
       ```

   Pour exécuter les tests, ajoutez un script de test dans votre `package.json` :

    ```json
    "scripts": {
      "test": "jest"
    }
   ```

   Et lancez-le avec :

    ```bash
    npm test
    ```


2. **Mocha et Chai :**  
   Mocha est un autre framework de test populaire, qui fournit la structure de base pour l'écriture de tests, tandis que
   Chai est une bibliothèque d'assertion qui peut être utilisée avec Mocha pour effectuer des vérifications. Mocha est
   apprécié pour sa flexibilité et sa compatibilité avec de nombreux autres outils et bibliothèques.

    - **Installation de Mocha et Chai :**

       ```bash
       npm install --save-dev mocha chai
       ```

    - **Exemple de Test Unitaire avec Mocha et Chai :**

       ```javascript
       // fonction.js reste inchangé
      
       // fonction.test.js
       const addition = require('./fonction');
       const expect = require('chai').expect;
      
       describe('Test de la fonction addition', () => {
        it('additionne 1 + 2 pour donner 3', () => {
            expect(addition(1, 2)).to.equal(3);
        });
       });
       ```

   Pour exécuter les tests avec Mocha, ajustez le script de test dans votre `package.json` :

   ```json
   "scripts": {
    "test": "mocha"
   }
   ```

   Et lancez-le avec :

   ```bash
   npm test
   ```

Les tests unitaires et d'intégration sont cruciaux pour le développement logiciel, offrant une assurance que le code se
comporte comme prévu et facilitant la maintenance et l'évolution des applications. Jest, avec son approche tout-en-un,
et la combinaison flexible de Mocha avec Chai, sont des outils puissants qui peuvent améliorer la qualité et la
fiabilité de votre code.

### La couverture du code

La couverture du code est une mesure utilisée pour évaluer la qualité des tests en déterminant quelle partie du code
source d'un programme est exécutée lorsque l'ensemble des tests est lancé. Elle est cruciale pour identifier les parties
du code qui ne sont pas testées, permettant ainsi aux développeurs de compléter leurs tests pour couvrir plus de cas et
d'améliorer la fiabilité de l'application.

1. **Pourquoi la Couverture du Code est-elle Importante ? :**
    - **Détecter les Parties Non Testées :**  
      Aide à identifier les lignes de code, les branches conditionnelles, et les fonctions qui ne sont pas couvertes par
      les tests actuels.
    - **Améliorer la Qualité du Code :**  
      Encourage la rédaction de tests supplémentaires pour les parties non couvertes, réduisant ainsi le risque de bugs.
    - **Confiance dans les Refactorisations :**  
      Avec une bonne couverture de tests, les développeurs peuvent refactoriser le code en étant confiants que les
      changements n'introduisent pas de nouveaux bugs.


2. **Mesurer la Couverture du Code :**  
   La couverture du code est généralement mesurée selon plusieurs critères :

    - **Couverture des Lignes :** Pourcentage de lignes de code exécutées par les tests.
    - **Couverture des Fonctions :** Pourcentage de fonctions ou de méthodes exécutées.
    - **Couverture des Branches :** Pourcentage de branches de contrôle (comme les conditions if/else) exécutées.
    - **Couverture des Instructions :** Pourcentage d'instructions exécutées.


3. **Outils de Couverture du Code :**  
   Plusieurs outils peuvent être utilisés pour mesurer la couverture du code dans des projets Node.js, souvent intégrés
   ou compatibles avec des frameworks de test comme Jest ou Mocha.

    - **Jest :**  
      Jest intègre sa propre fonctionnalité de couverture du code. Pour l'activer, ajoutez l'option --coverage à votre
      commande de test dans package.json :

    ```json
    "scripts": {
      "test": "jest --coverage"
    }
    ```

    - **nyc (Istanbul) :**  
      Pour les projets utilisant Mocha (ou d'autres frameworks de test), nyc, le successeur de l'outil Istanbul, est
      largement utilisé pour la couverture du code.

   Installation de nyc :

    ```bash
    npm install --save-dev nyc
    ```

   Intégration avec Mocha :

    ```json
    "scripts": {
      "test": "nyc mocha"
    }
    ```


4. **Bonnes Pratiques :**
    - **Viser une Couverture Réaliste :**  
      Bien qu'une couverture de 100 % soit idéale, elle n'est pas toujours réalisable ou nécessaire. Concentrez-vous sur
      les parties critiques du code.
    - **Ne Pas Sacrifier la Qualité pour les Statistiques :**  
      Écrire des tests significatifs plutôt que de chercher à augmenter artificiellement les statistiques de couverture.
    - **Utiliser la Couverture du Code Comme Guide :**  
      Utilisez les rapports de couverture pour identifier les lacunes dans vos tests, mais ne remplacez pas le jugement
      humain et les tests d'intégration complets par des chiffres.

La couverture du code est un indicateur précieux de la qualité des tests dans un projet. En fournissant une vue
d'ensemble des parties du code testées et en identifiant les lacunes, elle guide les développeurs vers l'écriture de
tests plus complets et la création de logiciels plus fiables. Utiliser des outils comme Jest ou nyc facilite la mesure
et l'amélioration de la couverture du code dans les projets Node.js.

### Utilisation de Jest pour les tests unitaires

Jest est un framework de test populaire dans l'écosystème JavaScript, apprécié pour sa simplicité, sa rapidité et son
intégration avec des projets basés sur Node.js et React. Jest est bien adapté pour les tests unitaires, offrant des
fonctionnalités telles que le mocking, le snapshot testing, et la couverture de code, directement intégrées sans
nécessiter de configurations complexes.

#### Configuration de Base de Jest

Pour commencer avec Jest dans un projet Node.js :

1. **Installation :** Installez Jest comme dépendance de développement.

    ```bash
    npm install --save-dev jest
    ```


2. **Configuration :**  
   Configurez Jest en ajoutant un script de test dans votre package.json.

    ```json
    "scripts": {
      "test": "jest"
    }
    ```


3. **Structure de Dossier :**  
   Par convention, Jest recherche les fichiers de test dans des dossiers `__tests__` ou des fichiers avec des
   suffixes `.test.js` ou `.spec.js`.

#### Écrire un Test Unitaire avec Jest

Supposons que vous avez une fonction simple à tester :

```javascript
// sum.js
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

Vous pouvez écrire un test unitaire pour cette fonction comme suit :

```javascript
// sum.test.js
const sum = require('./sum');

test('additionne 1 + 2 pour donner 3', () => {
    expect(sum(1, 2)).toBe(3);
});
```

#### Exécution des Tests

Pour exécuter vos tests, utilisez la commande :

```bash
npm test
```

Jest exécutera automatiquement tous les fichiers de test trouvés dans le projet et affichera les résultats dans la
console.

#### Fonctionnalités Avancées de Jest

1. **Mocking :**
   Jest permet de mocker des fonctions, des modules ou des requêtes HTTP pour isoler des parties de votre code pendant
   les tests.


2. **Tests Asynchrones :**  
   Jest supporte les tests de fonctions asynchrones, en utilisant des callbacks, des promesses, ou le mot-clé
   async/await.


3. **Snapshot Testing :**  
   Très utile pour tester des UIs, cela permet de sauvegarder le rendu de vos composants et de détecter automatiquement
   lorsque le rendu change dans les mises à jour futures.

#### Exemple de Test Asynchrone

Si vous avez une fonction asynchrone à tester :

```javascript
// fetchData.js
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}
```

Vous pouvez écrire un test asynchrone comme suit :

```javascript
// fetchData.test.js
const fetchData = require('./fetchData');

test('récupère les données d\'une API', async () => {
    const data = await fetchData('https://api.exemple.com/data');
    expect(data).toBe('données attendues');
});
```

Jest est un outil de test puissant et flexible, idéal pour les projets Node.js grâce à sa facilité d'utilisation et ses
nombreuses fonctionnalités intégrées. Que vous effectuiez des tests unitaires simples ou des tests plus complexes, Jest
offre les outils nécessaires pour écrire des tests clairs, maintenables et efficaces.

### Utilisation de Mocha et Chai pour les tests d'intégration

Mocha est un framework de test flexible pour Node.js, tandis que Chai est une bibliothèque d'assertion qui peut être
utilisée avec Mocha pour effectuer des vérifications plus lisibles et expressives. Ensemble, ils forment une solution
puissante pour écrire des tests d'intégration, qui vérifient comment différentes parties de votre application
interagissent entre elles, comme les interactions avec une base de données ou entre différents composants logiciels.

#### Configuration de Base de Mocha et Chai

1. **Installation :**  
   Installez Mocha et Chai comme dépendances de développement.

    ```bash
    npm install --save-dev mocha chai
    ```


2. **Configuration :**  
   Configurez un script de test dans votre package.json pour utiliser Mocha.

    ```json
    "scripts": {
      "test": "mocha"
    }
    ```


3. **Structure des Fichiers de Test :**  
   Mocha cherche par défaut les fichiers de test dans le dossier test à la racine de votre projet. Vous pouvez organiser
   vos fichiers de test en les nommant avec des suffixes .test.js ou .spec.js.

#### Écrire un Test d'Intégration avec Mocha et Chai

Supposons que vous avez une API à tester qui récupère des informations utilisateur depuis une base de données.

```javascript
// app.js
const express = require('express');
const app = express();
app.get('/utilisateur/:id', (req, res) => {
    // Simule la récupération d'un utilisateur depuis une base de données
    res.json({id: req.params.id, nom: "John Doe"});
});

module.exports = app;
```

Pour tester cette route, vous pouvez utiliser Mocha pour exécuter le test et Chai, en particulier chai-http pour
faciliter les tests HTTP, pour effectuer des assertions sur les réponses.

1. **Installation de chai-http :**

    ```bash
    npm install --save-dev chai-http
    ```


2. **Exemple de Test d'Intégration :**

   ```javascript
   // test/utilisateur.test.js
   const chai = require('chai');
   const chaiHttp = require('chai-http');
   const app = require('../app');
   
   chai.use(chaiHttp);
   const expect = chai.expect;
   
   describe('GET /utilisateur/:id', () => {
    it('devrait récupérer un utilisateur par son ID', (done) => {
        chai.request(app)
        .get('/utilisateur/1')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', '1');
            expect(res.body).to.have.property('nom', 'John Doe');
            done();
        });
    });
   });
   ```

#### Exécution des Tests

Pour exécuter vos tests, utilisez la commande :

```bash
npm test
```

Mocha parcourra le dossier test pour trouver et exécuter tous les fichiers de test correspondants, et Chai fournira des
assertions lisibles pour vérifier les résultats.

Mocha, combiné avec Chai et chai-http, offre un cadre robuste pour écrire des tests d'intégration pour des applications
Node.js. Les tests d'intégration jouent un rôle crucial dans le processus de développement en s'assurant que les
différentes parties de l'application fonctionnent correctement ensemble, fournissant ainsi une sécurité supplémentaire
avant les déploiements en production. Utiliser Mocha et Chai ensemble permet de créer des tests expressifs et flexibles,
adaptés à une large gamme de scénarios de test.
