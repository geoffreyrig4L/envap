Vous trouverez ici toutes les étapes à suivre pour profiter au maximum de l'application Envap :

    1. Démarrer les applications

        1.1 Démarrer le backend
            a. Dans votre GitBash, placer vous dans le répertoire "envap/backend"
            b. Puis entrer la commande "npm run start"

        1.2 Démarrer le frontend
            a. Dans votre GitBash, placer vous dans le répertoire "envap/frontend"
            b. Puis entrer la commande "npm run dev"

    2. Connectez-vous à l'application
        Pour vous connecter à l'application, il vous suffit de vous rendre dans la page connexion de l'application web "Envap".
        Un bouton 'Connexion' est visible dans la partie supérieure droite depuis la barre de navigation
        Une fois sur la page de connexion, renseignez un de ces trois utilisateurs :

        | X | Username | Password | Description                                                          |
        |---|----------|----------|----------------------------------------------------------------------|
        | 1 | alpha    | alpha1   | Ne peux pas créer de VM                                              |
        | 2 | beta     | beta1    | Peux créer une unique VM                                             |
        | 3 | gamma    | gamma1   | Peux créer autant de VM qu'il souhaite                               |

    3. Modifier le fichier .env du dossier /backend
        A présent que vous êtes connecté, vous avez la possibilité de créer une VM. Cependant, pour ce faire,
        Vous devez renseigner vos identifiants Azure au backend de l'application. Suivez les étapes ci-dessous
        pour exécuter convenablement cette opération :

        a. A la racine du dossier backend, créer un fichier nommé ".env"

        b. A l'intérieur de ce fichier, copiez ceci :
            AZURE_TENANT_ID={your_tenant_id}
            AZURE_CLIENT_ID={your_client_id}
            AZURE_CLIENT_SECRET={your_client_secret}
            AZURE_SUBSCRIPTION_ID={your_subscription_id}

        c. Maintenant, il vous suffit de remplacer les valeurs des variables d'environnements par vos identifiants Azure

Vous pouvez maintenant profiter pleinement de l'application Envap :D
