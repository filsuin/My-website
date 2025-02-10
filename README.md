# My-Website
Un site web regroupant tous les outils que je code moi-même, avec un générateur de QR Code comme première réalisation. Ce projet est voué à être enrichi et amélioré jour après jour pour intégrer toujours plus de fonctionnalités !

## Prérequis

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari).
- Une connexion Internet pour accéder aux ressources externes et APIs.
- Un serveur web local (comme XAMPP) pour le développement.

## Installation

1. Clonez ou téléchargez le projet.
2. Configurez votre serveur web local.
3. Créez un fichier `config.js` dans le dossier `private` avec votre clé API OpenWeatherMap.
4. Ouvrez le site via votre serveur local.

## Fonctionnalités

### Page d'accueil (`index.html`)

- Présente les projets et propose des liens vers les différents outils.
- Permet d'accéder à mon [GitHub](https://github.com/filsuin) pour découvrir d'autres projets.

### Générateur de QR Code (`qr_code.html`)

Cette page vous permet de générer un QR Code à partir d'une URL.

#### Instructions :

1. **Entrez une URL** dans le champ prévu à cet effet.
2. **Sélectionnez la couleur** du QR Code en cliquant sur le sélecteur de couleur.
3. **Choisissez la taille** du QR Code en ajustant le champ de taille.
4. **Cliquez sur "Générer QR Code"** pour créer le QR Code.
5. **Téléchargez le QR Code** en cliquant sur le bouton de téléchargement.

### Convertisseur d'Images (`image.html`)

Cette page vous permet de convertir des images en différents formats et de redimensionner les images.

#### Instructions :

1. **Téléchargez une image** en cliquant sur le bouton de téléchargement.
2. **Sélectionnez le format de sortie** dans le menu déroulant.
3. **Ajustez la qualité** de l'image en utilisant le curseur.
4. **Entrez la largeur** souhaitée en pixels.
5. **Cliquez sur "Convertir"** pour convertir l'image.

### Générateur de Mots de Passe (`password.html`)

Cette page vous permet de générer des mots de passe sécurisés.

#### Instructions :

1. **Sélectionnez la longueur** du mot de passe.
2. **Choisissez les options** (lettres majuscules, lettres minuscules, chiffres, symboles).
3. **Cliquez sur "Générer"** pour créer un mot de passe sécurisé.

### Convertisseur de Devises (`currency_converter.html`)

Cette page vous permet de convertir des montants d'une monnaie à une autre en utilisant des taux de change actualisés.

#### Instructions :

1. **Entrez le montant** à convertir.
2. **Sélectionnez la devise de départ** dans le menu déroulant.
3. **Sélectionnez la devise d'arrivée** dans le menu déroulant.
4. **Cliquez sur "Convertir"** pour obtenir le montant converti.

### Météo (`meteo.html`)

Cette page vous permet de consulter la météo actuelle et les prévisions.

#### Instructions :

1. **Entrez le nom d'une ville** dans la barre de recherche.
2. **Sélectionnez une ville** parmi les suggestions qui apparaissent.
3. **Consultez les informations météo actuelles** :
   - Température
   - Description du temps
   - Humidité
   - Vitesse du vent
4. **Choisissez le type de prévisions** :
   - Par heure (24 prochaines heures)
   - Sur 7 jours
5. **Faites défiler horizontalement** pour voir toutes les prévisions.

### Sécurité

- Protection des dossiers sensibles via `.htaccess`
- Clés API sécurisées dans un dossier privé
- Validation des entrées utilisateur
- Protection contre les injections

### Page de Contact (`contact.html`)

Cette page vous permet de me contacter via un formulaire.

#### Instructions :

1. **Entrez votre nom** dans le champ prévu à cet effet.
2. **Entrez votre email** dans le champ prévu à cet effet.
3. **Entrez votre message** dans le champ prévu à cet effet.
4. **Cliquez sur "Envoyer"** pour envoyer le message.

## Technologies Utilisées

- HTML5, CSS3, JavaScript
- API OpenWeatherMap pour la météo
- API ExchangeRate pour les taux de change
- Bibliothèque QRCode.js
- Apache avec configuration `.htaccess`

## Auteur

- **Filsuin** - [GitHub](https://github.com/filsuin)
