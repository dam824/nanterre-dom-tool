# Nanterre Dom Tool

## Description
Nanterre Dom Tool est une application web qui permet d'automatiser l'envoi de messages SMS en masse via diverses API (Octopush, Twilio, Vonage). Elle comprend également un système d'authentification, une gestion des utilisateurs et des clients, ainsi qu'une interface de gestion des modèles de messages.

## Captures d'écran et descriptions de l'application

### Page de connexion
![Login Page](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.46.18.png)
Ceci est la page de connexion de l'application. Les utilisateurs saisissent leur nom d'utilisateur et leur mot de passe pour accéder au système. La page présente un design épuré avec un formulaire de connexion à gauche et une image de paysage urbain à droite. Le bouton "Connexion" soumet le formulaire de connexion.

### Gestion des clients
![Clients Management](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.48.36.png)
Cette page permet aux utilisateurs de gérer leurs clients. Les utilisateurs peuvent voir une liste de clients avec des colonnes pour le nom du client, le numéro de téléphone, le nombre de courriers reçus et les actions (modifier ou supprimer). Le bouton "Add Client" ouvre un formulaire pour ajouter un nouveau client. Chaque ligne de client comprend des boutons pour modifier ou supprimer le client.

### Gestion des modèles de messages
![Message Templates Management](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.49.54.png)
Cette page est destinée à la gestion des modèles de messages. Les utilisateurs peuvent voir une liste de modèles de messages avec des colonnes pour le titre du modèle, le contenu et les actions (modifier ou supprimer). Le bouton "Add Message Template" ouvre un formulaire pour créer un nouveau modèle de message.

### Envoi de SMS via Octopush
![Send SMS via Octopush](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.50.02.png)
Cette page permet aux utilisateurs d'envoyer des messages SMS en utilisant le service Octopush. Les utilisateurs peuvent sélectionner des clients dans la liste de gauche et choisir un modèle de message dans le menu déroulant à droite. Le formulaire comprend des champs pour le titre et le contenu du message, qui sont pré-remplis en fonction du modèle sélectionné. Le bouton "Submit" envoie le SMS aux clients sélectionnés.

### Gestion du compte utilisateur
![User Account Management](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.50.51.png)
Ceci est la page de gestion du compte utilisateur. Les utilisateurs peuvent voir leur nom d'utilisateur et ont des options pour modifier leur mot de passe et leurs informations de profil. La page comprend des boutons pour "Modifier Mot de Passe" et "Modifier profil".

### Vue d'ensemble du tableau de bord
![Dashboard Overview](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.51.01.png)
Le tableau de bord fournit une vue d'ensemble des principales métriques de l'application, y compris le nombre de clients, le solde restant et le nombre total de messages envoyés. Sous les métriques, il y a un tableau des clients similaire à celui de la page de gestion des clients, avec des colonnes pour le nom du client, le numéro de téléphone, le nombre de courriers reçus et les actions (modifier ou supprimer).

### Modifier le compte utilisateur
![Edit User Account](public/readmepic/Capture%20d%E2%80%99%C3%A9cran%202024-07-03%20%C3%A0%2022.51.09.png)
Ceci est la page de modification du compte utilisateur, où les utilisateurs peuvent mettre à jour leurs informations de profil. Le formulaire permet aux utilisateurs de changer leur nom d'utilisateur et leur mot de passe. La page assure que les utilisateurs peuvent facilement mettre à jour les détails de leur compte.

## Installation

Pour installer et exécuter ce projet localement :

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/dam824/nanterre-dom-tool.git
   cd nanterre-dom-tool
