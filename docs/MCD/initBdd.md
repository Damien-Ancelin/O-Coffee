# 📄 Les 5 étapes de l’Init de la BDD locale

1. **Se connecter à la base avec psql en tant que super utilisateur**
    - `sudo -i -u postgres psql`
2. **Créer un utilisateur**
    - `CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';`
        - ⚠️ pour données USER & PASSWORD
            - *postgres* convertit **tout** en minuscule !!!
3. **Créer la base de données**
    - `CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;`
    - Enfin, on pense bien à immédiatement se déconnecter.
        - `Ctrl + D`
4. **Tester la connexion à la base de données**
    - Si on est déconnecté de *postgres*
        - `psql -U nomDeLutilisateur -d nomDeLaBase`
        - Si tout va bien, on devrait se retrouver avec une invite de commande qui dit `nom_bdd=>`
    - Si on est toujours connecté
        - `\c** nom_bdd` ⇒ *pour passer sur la bdd depuis postgres*
        - `\dt` ⇒ pour afficher les tables, à ce moment il n’y a aucune relation
5. **Exécuter un script SQL sur une base de données**
    - Si on est déconnecté de la *bdd*
        - Se placer dans le fichier du projet
        - `psql -U numUtilisateur -d nomBaseDeDonnees -f chemin/du/fichier.sql`
    - Si on est toujours connecté
        - `\i drag & drop le fichier` dans le terminal