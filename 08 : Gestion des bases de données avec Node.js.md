# Partie 2 : Bases de Données, Gestion des Données et Sécurité

## 8. Gestion des bases de données avec Node.js

### Introduction aux ORM (Object-Relational Mapping) : Avantages et cas d'utilisation

Les ORM (Object-Relational Mapping) sont des bibliothèques qui facilitent la gestion des données entre les bases de
données relationnelles et les objets dans le code. En agissant comme une couche d'abstraction, les ORM permettent aux
développeurs d'interagir avec la base de données en utilisant le paradigme de la programmation orientée objet, sans
avoir à écrire des requêtes SQL complexes.

1. **Avantages des ORM :**
    - **Productivité et Efficacité :**  
      Les ORM automatisent et simplifient de nombreuses tâches courantes de gestion des bases de données, comme la
      création de requêtes SQL, la migration de schémas, et la gestion des transactions, ce qui accélère le
      développement.
    - **Sécurité améliorée :**  
      En générant automatiquement des requêtes SQL, les ORM réduisent les risques d'injections SQL, une des
      vulnérabilités de sécurité les plus courantes dans les applications web.
    - **Indépendance vis-à-vis de la Base de Données :**  
      Les ORM fournissent une abstraction qui permet de changer le système de gestion de base de données (SGBD)
      sous-jacent sans modifier le code de l'application, ou du moins avec des modifications minimales.
    - **Maintenance facilitée :**  
      L'utilisation des ORM encourage les bonnes pratiques de développement, comme le DRY (Don't Repeat Yourself) et la
      séparation des préoccupations, ce qui facilite la maintenance et l'évolution de l'application.
    - **Intégration avec le code :**  
      Les ORM permettent de manipuler les données comme des objets dans le langage de programmation utilisé, ce qui rend
      le code plus intuitif pour les développeurs.


2. **Cas d'Utilisation des ORM :**
    - **Applications Web complexes :**  
      Les applications nécessitant des interactions complexes avec la base de données bénéficient particulièrement de
      l'abstraction fournie par les ORM.
    - **Projets nécessitant une Portabilité entre différents SGBD :**  
      Si une application doit supporter différents systèmes de bases de données, utiliser un ORM peut grandement
      simplifier le processus d'adaptation.
    - **Développement Rapide d'Applications (RAD) :**  
      Pour les projets nécessitant un développement rapide, les ORM permettent de gagner du temps en automatisant la
      création de la couche de données.
    - **Projets avec des Modèles de Données en évolution :**  
      Les ORM facilitent les migrations et les modifications du schéma de la base de données, ce qui est
      particulièrement utile dans les environnements agiles.


3. **Exemples d'ORM pour Node.js :**
    - **Sequelize :**  
      Un ORM prometteur pour PostgreSQL, MySQL, MariaDB, SQLite, et Microsoft SQL Server. Il prend en charge les
      transactions, les relations, le chargement paresseux et avide, et plus encore.
    - **TypeORM :**  
      Inspiré par d'autres ORM comme Hibernate, Doctrine, et Entity Framework. Il supporte TypeScript et JavaScript et
      fonctionne avec une grande variété de bases de données.
    - **Mongoose :**  
      Bien que techniquement plus un ODM (Object Document Mapper), Mongoose est largement utilisé avec MongoDB pour
      fournir une expérience similaire à celle d'un ORM dans le contexte des bases de données NoSQL.

Les ORM offrent un moyen puissant et flexible de travailler avec des bases de données relationnelles dans des
applications Node.js, en réduisant la quantité de code SQL nécessaire et en fournissant une couche d'abstraction utile.
Cependant, il est important de considérer les performances et de s'assurer que l'abstraction ne masque pas des
optimisations critiques, surtout dans les applications à fort trafic ou manipulant de grandes quantités de données.

### Mongoose pour interagir avec MongoDB

Mongoose est un Object Data Modeling (ODM) library pour MongoDB et Node.js. Il fournit une solution basée sur des
schémas pour modéliser vos données d'application. Mongoose offre des fonctionnalités telles que la validation, les
requêtes, les hooks pour les opérations middleware, et bien plus, facilitant ainsi le travail avec MongoDB.

1. **Installation de Mongoose :**  
   Pour commencer à utiliser Mongoose dans votre projet Node.js, installez-le via NPM :

    ```bash
    npm install mongoose
    ```


2. **Connexion à MongoDB avec Mongoose :**  
   Avant de pouvoir manipuler des données, vous devez établir une connexion à votre base de données MongoDB. Utilisez
   mongoose.connect() pour vous connecter à votre instance MongoDB :

    ```javascript
    const mongoose = require('mongoose');
   
    mongoose.connect('mongodb://localhost:27017/maBaseDeDonnees', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));
    ```


3. **Définition d'un Schéma avec Mongoose :**  
   Un schéma Mongoose définit la structure des documents dans une collection MongoDB. Il spécifie les types de données
   et les validateurs :

    ```javascript
    const { Schema, model } = mongoose;
   
    const utilisateurSchema = new Schema({
        nom: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: Number,
        creeLe: { type: Date, default: Date.now }
    });
   
    const Utilisateur = model('Utilisateur', utilisateurSchema);
    ```


4. **Opérations CRUD avec Mongoose :**
    - **Créer (Create) :**  
      Pour créer et enregistrer une nouvelle instance de votre modèle dans la base de données :

       ```javascript
       const nouvelUtilisateur = new Utilisateur({
           nom: 'John Doe',
           email: 'john@example.com',
           age: 30
       });
      
       nouvelUtilisateur.save()
       .then(doc => console.log('Utilisateur enregistré', doc))
       .catch(err => console.error('Erreur lors de l\'enregistrement', err));
       ```

    - **Lire (Read) :**  
      Pour lire des documents, utilisez des méthodes comme `find()`, `findOne()`, ou `findById()` :

       ```javascript
       Utilisateur.find({ age: { $gt: 18 } }) // Recherche tous les utilisateurs de plus de 18 ans
       .then(utilisateurs => console.log('Utilisateurs trouvés', utilisateurs))
       .catch(err => console.error('Erreur lors de la recherche', err));
       ```

    - **Mettre à jour (Update) :**  
      Pour mettre à jour des documents, utilisez `updateOne()`, `updateMany()`, ou `findByIdAndUpdate()` :

       ```javascript
       Utilisateur.findByIdAndUpdate(idUtilisateur, { age: 31 }, { new: true })
       .then(utilisateur => console.log('Utilisateur mis à jour', utilisateur))
       .catch(err => console.error('Erreur lors de la mise à jour', err));
       ```

    - **Supprimer (Delete) :**  
      Pour supprimer des documents, utilisez `deleteOne()`, `deleteMany()`, ou `findByIdAndDelete()` :

       ```javascript
       Utilisateur.findByIdAndDelete(idUtilisateur)
       .then(result => console.log('Utilisateur supprimé', result))
       .catch(err => console.error('Erreur lors de la suppression', err));
       ```

Mongoose simplifie le travail avec MongoDB en fournissant une interface de haut niveau pour modéliser vos données et
effectuer des opérations CRUD. En utilisant des schémas pour définir la structure de vos données et en tirant parti des
fonctionnalités de validation et de conversion de types de Mongoose, vous pouvez créer des applications robustes et
maintenables avec Node.js et MongoDB.

### Sequelize pour interagir avec des bases de données SQL

Sequelize est un ORM (Object-Relational Mapping) prometteur pour Node.js. Il supporte les principaux systèmes de gestion
de bases de données relationnelles (SGBDR) tels que PostgreSQL, MySQL, MariaDB, SQLite, et Microsoft SQL Server.
Sequelize offre une approche riche et mature pour modéliser les données d'application, gérer les relations entre les
tables, effectuer des opérations CRUD, et bien plus, le tout en utilisant le paradigme de programmation orienté objet.

1. **Installation de Sequelize :**  
   Pour commencer à utiliser Sequelize dans votre projet Node.js, vous aurez besoin d'installer Sequelize lui-même ainsi
   que le pilote de la base de données que vous comptez utiliser. Par exemple, pour un projet utilisant PostgreSQL :

    ```bash
    npm install sequelize pg pg-hstore
    ```


2. **Configuration et Connexion :**  
   La première étape consiste à configurer Sequelize et à établir une connexion avec votre base de données :

    ```javascript
    const { Sequelize } = require('sequelize');
   
    // Création d'une nouvelle instance Sequelize
    const sequelize = new Sequelize('nom_de_la_base', 'utilisateur', 'mot_de_passe', {
        host: 'localhost',
        dialect: 'postgres' // ou 'mysql', 'mariadb', 'sqlite', 'mssql'
    });
   
    // Tester la connexion
    async function testerConnexion() {
        try {
            await sequelize.authenticate();
            console.log('Connexion réussie.');
        } catch (error) {
            console.error('Impossible de se connecter à la base de données:', error);
        }
    }
   
    testerConnexion();
    ```


3. **Définition des Modèles :**  
   Avec Sequelize, les tables de la base de données sont représentées par des modèles. Un modèle est une classe qui
   hérite de Model et définit les champs de la table ainsi que leurs types de données :

    ```javascript
    const { Model, DataTypes } = require('sequelize');
   
    class Utilisateur extends Model {}
   
    Utilisateur.init({
        // Définition des attributs du modèle
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: DataTypes.INTEGER
        }, {
        sequelize, // instance de connexion
        modelName: 'Utilisateur' // nom du modèle
    });
    ```


4. **Opérations CRUD avec Sequelize :**
    - **Créer (Create) :**  
      Pour créer une nouvelle entrée dans la base de données :

       ```javascript
       Utilisateur.create({ nom: 'John Doe', email: 'john@example.com', age: 30 });
       ```

    - **Lire (Read) :**  
      Pour lire des données, utilisez des méthodes comme findAll() ou findOne() :

       ```javascript
       const utilisateurs = await Utilisateur.findAll();
       const utilisateur = await Utilisateur.findOne({ where: { email: 'john@example.com' } });
       ```

    - **Mettre à jour (Update) :**  
      Pour mettre à jour des données :

       ```javascript
       Utilisateur.update({ age: 31 }, { where: { email: 'john@example.com' } });
       ```

    - **Supprimer (Delete) :**  
      Pour supprimer des données :

       ```javascript
       Utilisateur.destroy({ where: { email: 'john@example.com' } });
       ```

Sequelize offre une solution puissante et flexible pour le travail avec des bases de données relationnelles dans des
applications Node.js. En fournissant une couche d'abstraction ORM, Sequelize facilite la gestion des données
relationnelles, la migration des schémas, et l'exécution des opérations CRUD, tout en promouvant des pratiques de codage
propres et maintenables. Avec une documentation complète et une communauté active, Sequelize est un excellent choix pour
les développeurs cherchant à interagir avec des bases de données SQL dans leurs projets Node.js.
