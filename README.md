# Pendu en TypeScript pour le challenge du café des devs ✨

Un jeu de Pendu simple implémenté en TypeScript, jouable dans la console.

![Capture d'écran du jeu](screenshot.png)

## Fonctionnalités

- Sélection aléatoire d'un mot à deviner parmi une liste prédéfinie.
- Affichage visuel du pendu à chaque mauvais coup.
- Gestion des lettres et des mots complets comme propositions.
- Sons pour les réponses correctes et incorrectes.
- Citation aléatoire affichée à la fin du jeu.

## Installation

1. Clonez le repository :

   ```bash
   git clone https://github.com/votre-utilisateur/pendu-typescript.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd pendu-typescript
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

## Démarrage

Pour démarrer le jeu, utilisez la commande suivante :

```bash
npm start
```

Suivez les instructions affichées dans la console pour deviner les lettres ou le mot complet.

## Règles du jeu

1. Vous devez deviner le mot caché en proposant des lettres ou en devinant le mot complet.
2. Vous avez droit à un maximum de 6 mauvaises propositions avant de perdre.
3. Si vous devinez toutes les lettres du mot, vous gagnez !
4. Pour quitter à tout moment, tapez `q!`.

## Capture d'écran

![Capture d'écran du jeu](screenshot.png)

## Remarques

- Ce jeu utilise `node-fetch` pour récupérer des citations aléatoires. Assurez-vous d'avoir une connexion internet active lors de l'utilisation.
- Les sons sont joués en utilisant `afplay`. Assurez-vous que votre système le supporte ou adaptez le code pour utiliser un lecteur audio compatible avec votre environnement.