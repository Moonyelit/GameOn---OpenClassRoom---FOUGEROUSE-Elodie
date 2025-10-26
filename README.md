# 🎮 GameOn - Marathon National de Jeux Vidéos
**OpenClassrooms HTML5 CSS3 JavaScript Vanilla**

![Capture d'écran du projet GameOn](image.png)

## 📚 Contexte du Projet

GameOn est un projet de formation OpenClassrooms qui consiste à développer un formulaire d'inscription interactif pour des concours de jeux vidéos. Ce projet permet d'apprendre les fondamentaux du développement front-end avec JavaScript Vanilla.

### 🎯 Objectifs Pédagogiques

Ce projet vise à développer les compétences suivantes :

- 🎨 **JavaScript Vanilla** : Maîtriser les fondamentaux sans bibliothèques
- 🧭 **Manipulation du DOM** : Interagir avec les éléments HTML
- 🎯 **Gestion d'événements** : Créer des interfaces interactives
- ✅ **Validation de formulaires** : Garantir la qualité des données utilisateur
- 🎭 **Modales dynamiques** : Créer des expériences utilisateur engageantes
- 📱 **Menu responsive** : Adapter la navigation selon les appareils

## 🚀 Compétences Développées

- **JavaScript ES6+** : Modernité et performances
- **DOM Manipulation** : Sélection et modification d'éléments
- **Event Handling** : Gestion interactive des événements
- **Form Validation** : Validation en temps réel des champs
- **Async/Await** : Chargement dynamique de contenu
- **Accessibilité** : ARIA labels et navigation clavier

## 📋 Spécifications du Projet

### 🎯 Objectifs du Projet

Vous travaillez pour GameOn, une PME spécialisée dans les conférences et concours de jeux vidéos. Votre mission est de compléter un formulaire d'inscription fonctionnel en JavaScript Vanilla.

### 📱 Fonctionnalités à Implémenter

1. **Modal d'inscription** : Formulaire dynamique chargé via AJAX
2. **Validation en temps réel** : Feedback utilisateur immédiat
3. **Menu burger responsive** : Navigation mobile optimisée
4. **Chargement dynamique** : Contenu de la modal chargé asynchronement
5. **Gestion d'événements** : Interactions fluides et intuitives

### 🎨 Validation de Formulaire

Chaque champ doit être validé selon des critères spécifiques :

- **Prénom** : Minimum 2 caractères, lettres uniquement
- **Nom** : Minimum 2 caractères, lettres uniquement
- **Email** : Format email valide (regex)
- **Date de naissance** : Champ obligatoire
- **Nombre de tournois** : Nombre entre 0 et 99
- **Localisation** : Sélection d'une ville obligatoire (radio buttons)
- **Conditions** : Acceptation des termes obligatoire (checkbox)

## ✨ Fonctionnalités Implémentées

### 🏠 Page d'Accueil

- **Hero Section** : Mise en avant de l'événement
- **Call-to-Action** : Bouton d'ouverture du formulaire
- **Navigation** : Menu burger avec animations fluides
- **Accessibilité** : ARIA labels et navigation clavier

### 📝 Formulaire d'Inscription

- **Chargement dynamique** : Modal chargée via `fetch()` API
- **Validation en temps réel** : Feedback immédiat pour chaque champ
- **Messages d'erreur** : Affichage contextuel et accessible
- **Confirmation** : Message de remerciement après soumission
- **Localisation** : 6 villes disponibles avec radio buttons
- **Newsletter optionnelle** : Checkbox pour recevoir les actualités

### 🎮 Menu Burger

- **Animation fluide** : Transition smooth pour l'ouverture/fermeture
- **Overlay** : Fond sombre semi-transparent
- **Icône dynamique** : Transformation burger ↔ croix
- **Scroll bloqué** : Empêche le scroll pendant l'ouverture
- **Fermeture automatique** : Au clic sur un lien ou l'overlay

### 🎨 Modal Interactive

- **Animation d'entrée** : Fade in avec transition
- **Focus management** : Focus automatique sur le premier champ
- **Fermeture multiple** : Bouton de fermeture, clic extérieur, touche Escape
- **Accessibilité** : ARIA attributes complets
- **Validation progressive** : Validation champ par champ

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : Animations, transitions et responsive design
- **JavaScript Vanilla** : ES6+ moderne sans frameworks
- **Fetch API** : Chargement asynchrone du contenu
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : DM Sans pour la typographie

## 📁 Structure du Projet

```
GameOn/
├── 📄 index.html              # Page d'accueil principale
├── 📄 modal-content.html      # Contenu de la modal (chargé dynamiquement)
├── 📁 Css/
│   ├── 📄 main.css            # Point d'entrée CSS
│   ├── 📄 reset.css           # Reset CSS
│   ├── 📄 variable.css        # Variables CSS
│   ├── 📄 navbar.css          # Styles de navigation
│   ├── 📄 homepage.css        # Styles de la page d'accueil
│   ├── 📄 modal.css           # Styles de la modal
│   └── 📄 footer.css          # Styles du footer
├── 📁 js/
│   ├── 📄 modal.js            # Gestion de la modal et validation
│   └── 📄 burger-menu.js      # Menu burger responsive
├── 📁 assets/
│   └── 📁 images/
│       ├── 📄 Logo.png        # Logo GameOn
│       └── 📄 bg_img.jpg      # Image de fond hero
└── 📄 README.md
```

## 🎨 Modernisation du Design

Ce projet a été entièrement **remanié et modernisé** avec :

### 🏗️ Architecture Modulaire

Le code HTML et CSS a été **refactorisé et découpé en fichiers modulaires** pour une meilleure organisation et maintenabilité :

- **CSS découpé par composants** : Chaque section du site a son propre fichier CSS (navbar, homepage, modal, footer)
- **Architecture modulaire** : Reset CSS, variables CSS, et styles spécifiques séparés
- **Code JavaScript optimisé** : Séparation entre la gestion de la modal et du menu burger

### 🎨 Modernisation du Design

- **CSS moderne** : Utilisation de variables CSS, animations fluides, transitions élégantes
- **HTML sémantique** : Structure accessible et optimisée pour le SEO
- **Refonte du design** : HTML et CSS entièrement modernisés pour une meilleure UX
- **Design responsive** : Adaptation parfaite sur tous les appareils
- **Expérience utilisateur** : Interface intuitive et moderne

## 🎯 Fonctionnalités Techniques

### 📝 Validation de Formulaire

Chaque champ est validé individuellement avec des fonctions dédiées :

```javascript
validateFirst()      // Prénom : 2+ caractères, lettres uniquement
validateLast()       // Nom : 2+ caractères, lettres uniquement
validateEmail()      // Email : format valide (regex)
validateBirthdate()  // Date de naissance : champ requis
validateQuantity()   // Quantité : 0-99
validateLocation()   // Localisation : sélection obligatoire
validateCheckbox1()  // Conditions : acceptation obligatoire
```

### 🎭 Gestion de la Modal

```javascript
launchModal()      // Ouvre la modal avec animation
closeModal()       // Ferme avec animation de transition
loadModal()        // Charge le contenu via fetch()
showConfirmation() // Affiche le message de remerciement
```

### 🍔 Menu Burger

```javascript
editNav()          // Toggle le menu burger
closeMenu()        // Ferme le menu avec animation
// + fermeture automatique sur Escape, clic overlay, clic lien
```

## 👨‍💻 Auteur & Liens

**Elodie FOUGEROUSE** - Étudiante OpenClassrooms

- **Parcours** : Développeur d'application JavaScript React
- **Projet** : P4 - Créez une landing page avec JavaScript
- **Année** : 2025
- **🔗 GitHub** : [GameOn - OpenClassroom](https://github.com/Moonyelit/GameOn---OpenClassRoom---FOUGEROUSE-Elodie)

Fait avec ❤️ et beaucoup de ☕

## 📄 Licence

Copyright 2025 - GameOn Inc. - Tous droits réservés

---

© 2025 GameOn - Tous droits réservés - FOUGEROUSE Élodie
