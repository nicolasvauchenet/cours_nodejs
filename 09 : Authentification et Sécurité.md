# Partie 2 : Bases de Données, Gestion des Données et Sécurité

## 9. Authentification et Sécurité

### Introduction à l'authentification dans les applications web

L'authentification est un processus crucial dans les applications web, permettant de vérifier l'identité des
utilisateurs avant de leur donner accès à certaines ressources ou fonctionnalités. Elle est fondamentale pour la
sécurité des applications web, car elle aide à protéger les informations sensibles et à garantir que seuls les
utilisateurs autorisés peuvent effectuer certaines actions.

1. **Pourquoi l'Authentification est-elle importante ?**
    - **Sécurité des Données :**  
      Protège les données sensibles contre les accès non autorisés.
    - **Personnalisation :**  
      Permet de personnaliser l'expérience utilisateur en stockant des préférences et des données utilisateur.
    - **Contrôle d'accès :**  
      Assure que seuls les utilisateurs ayant les droits appropriés peuvent accéder à certaines parties de
      l'application.


2. **Mécanismes d'Authentification communs :**
    - **Authentification par Nom d'Utilisateur et Mot de Passe :**  
      Le mécanisme le plus courant, où les utilisateurs doivent fournir un identifiant unique et un mot de passe.
    - **Authentification Multifacteur (MFA) :**  
      Ajoute une couche de sécurité supplémentaire en demandant aux utilisateurs de fournir deux ou plusieurs preuves
      d'identité (facteurs), comme un mot de passe et un code envoyé sur leur téléphone.
    - **Authentification par Jetons (Token-Based Authentication) :**  
      Utilise des jetons, généralement des JWT (JSON Web Tokens), pour gérer les sessions utilisateur après une
      connexion réussie.
    - **OAuth et Authentification par Tiers :**  
      Permet aux utilisateurs de se connecter à l'aide de leurs comptes existants sur des plateformes tierces, comme
      Google ou Facebook.


3. **Processus d'Authentification basique :**
    - **Inscription :**  
      L'utilisateur crée un compte en fournissant des informations d'identification, qui sont vérifiées et stockées de
      manière sécurisée dans la base de données.
    - **Connexion :**  
      L'utilisateur soumet ses informations d'identification, qui sont comparées aux données stockées. Si elles
      correspondent, l'utilisateur est authentifié.
    - **Session :**  
      Une fois authentifié, une session est établie et maintenue, permettant à l'utilisateur d'accéder aux ressources
      protégées sans avoir à se réauthentifier à chaque requête.
    - **Déconnexion :**  
      La session est terminée, et l'utilisateur doit se ré-authentifier pour accéder à nouveau aux ressources protégées.


4. **Stockage des Mots de Passe :**  
   Le stockage sécurisé des mots de passe est essentiel pour protéger les informations d'identification des
   utilisateurs. Les meilleures pratiques incluent :

    - **Hachage :**  
      Transformer le mot de passe en une chaîne fixe de caractères à l'aide d'une fonction de hachage cryptographique,
      rendant impossible la récupération du mot de passe original.
    - **Salage :**  
      Ajouter un "sel" aléatoire au mot de passe avant le hachage pour renforcer la sécurité et empêcher les attaques
      par dictionnaire ou par tables arc-en-ciel.

L'authentification est une composante essentielle de la sécurité des applications web, protégeant à la fois les données
utilisateur et l'accès aux fonctionnalités de l'application. La mise en œuvre de stratégies d'authentification robustes
et l'utilisation de pratiques de stockage de mots de passe sécurisées sont essentielles pour maintenir la sécurité et la
confiance des utilisateurs dans votre application.

### Mise en place d'une authentification simple avec Express et JWT (JSON Web Tokens)

Les JSON Web Tokens (JWT) sont une méthode standard pour sécuriser les échanges entre le client et le serveur, souvent
utilisée pour l'authentification dans les applications web. Un JWT est un jeton compact, sûr pour les URL, qui
représente des affirmations (claims) entre deux parties. Dans le contexte de l'authentification, un serveur génère un
token qui certifie l'identité de l'utilisateur, et le client l'envoie ensuite dans les en-têtes de requête pour accéder
aux ressources protégées.

1. **Installation des Dépendances Nécessaires :**  
   Pour implémenter l'authentification JWT avec Express, vous aurez besoin des modules jsonwebtoken pour créer et
   vérifier les tokens, et bcryptjs pour hacher les mots de passe.

    ```bash
    npm install express jsonwebtoken bcryptjs
    ```


2. **Configuration d'Express :**  
   Créez une application Express simple comme point de départ :

    ```javascript
    const express = require('express');
    const app = express();
    app.use(express.json()); // Middleware pour parser le JSON
   
    const port = 3000;
    app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`));
    ```


3. **Gestion des Utilisateurs et Authentification :**
    - **Hachage des Mots de Passe :**  
      Avant de stocker les mots de passe des utilisateurs dans votre base de données, il est crucial de les hacher pour
      des raisons de sécurité.

      ```javascript
      const bcrypt = require('bcryptjs');
      
      async function hacherMotDePasse(motDePasse) {
      const sel = await bcrypt.genSalt(10);
      const motDePasseHache = await bcrypt.hash(motDePasse, sel);
      return motDePasseHache;
      }
      ```

    - **Création de Token JWT :**  
      Après une authentification réussie, vous générez un JWT pour l'utilisateur.

        ```javascript
        const jwt = require('jsonwebtoken');
      
        function genererToken(utilisateur) {
            return jwt.sign({id: utilisateur.id}, 'secret_clé', {expiresIn: '1h'});
        }
        ```

    - **Route d'Inscription :**  
      Exemple simplifié d'une route d'inscription qui hache le mot de passe avant de le stocker (dans une base de
      données hypothétique ici).

      ```javascript
      app.post('/inscription', async (req, res) => {
          const {nom, email, motDePasse} = req.body;
          const motDePasseHache = await hacherMotDePasse(motDePasse);
      // Ici, vous stockeriez nom, email et motDePasseHache dans votre base de données
          res.status(201).send('Utilisateur créé');
      });
      ```

    - **Route de Connexion :**  
      Authentifiez les utilisateurs et renvoyez un JWT.

      ```javascript
      app.post('/connexion', async (req, res) => {
          const {email, motDePasse} = req.body;
          // Ici, vous rechercheriez l'utilisateur par email dans votre base de données
          const utilisateur = {id: 1, email}; // Utilisateur trouvé
          const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasseHache);

          if (!valide) return res.status(401).send('Mot de passe incorrect');

          const token = genererToken(utilisateur);
          res.status(200).json({message: 'Authentifié avec succès', token});
      });
      ```


4. **Vérification du Token JWT :**  
   Pour les routes nécessitant une authentification, créez un middleware qui vérifie le token JWT inclus dans les
   en-têtes de requête.

   ```javascript
   function verifierToken(req, res, next) {
       const token = req.headers['authorization'];
       if (!token) return res.status(403).send('Token requis');

       jwt.verify(token, 'secret_clé', (err, decoded) => {
           if (err) return res.status(401).send('Token invalide');
           req.utilisateur = decoded;
           next();
       });
   }
   ```

L'utilisation de JWT pour l'authentification dans les applications Express offre une méthode sécurisée et flexible pour
gérer les sessions utilisateur et protéger les ressources. En combinant JWT avec le hachage sécurisé des mots de passe,
vous pouvez construire un système d'authentification robuste pour vos applications web.
