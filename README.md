GROUPOMANIA
Installation des modules :

Ma version de node: v14.17.5 (il peut y avoir des problèmes avec node-sass si vous avez une version supérieure)
Installer les packages nodemon server et vue-cli version 3
options de vue-cli v3: préprocesseur CSS Sass/Scss (with node-sass), ESL lint with error prevention only, Lint on save, In dedicated config files.
« npm install » pour les autres packages
Connexion à la base de données :

Télécharger MySQL si vous ne l’avez pas déjà
Créer une base de données vide appelée « groupomania »
La connexion à la BDD se trouve dans le dossier config/database.js
Le fichier .env contient les identifiants de connexion (il faudra peut-être les changer si vos identifiants sont différents)
Lancement du projet :

Depuis la racine dans la console : « nodemon server » ou « node server » pour le back
Dans un autre terminal « npm run serve » pour le front
Données de la base : Vous pouvez soit partir de zéro en créant vos utilisateurs, publications et commentaires, dans se cas il faudra créer le rôle « moderator » directement dans la base en SQL ou via Postman avant d’insérer d’autres données. Les utilisateurs modérateurs ne peuvent aussi être créé que via SQL ou Postman en renseignant l’identifiant du rôle de modérateur.

Sinon, je vous mets dans le dossier config/datas à la racine, des utilisateurs, publications et commentaires. Il faut simplement copier/coller la partie « INSERT INTO » dans MySQL en respectant l’ordre d’insertion des données : Rôle -> User -> Post -> Comment -> Like. Les mots de passe des utilisateurs sont leur prénom en minuscule. Les modérateurs sont Chani et Leto.
