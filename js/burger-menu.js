// Variables pour le menu burger
// NOTE: isMenuOpen est un type primitif (boolean) = affectation par VALEUR
let isMenuOpen = false; // État du menu (ouvert/fermé)

// Cache des éléments DOM pour éviter les requêtes répétées
// NOTE: Ces variables stockent des RÉFÉRENCES aux objets DOM (affectation par référence)
let topnav, overlay, menuIcon, icon;

/**
 * Initialise le cache des éléments DOM
 * Évite les requêtes DOM répétées (optimisation de performance)
 * 
 * EXEMPLE d'affectation par RÉFÉRENCE :
 * - topnav = référence à l'objet DOM (si on modifie topnav.classList, on modifie l'original)
 */
function initMenuElements() {
  if (!topnav) topnav = document.getElementById("myTopnav");
  if (!overlay) overlay = document.getElementById("menuOverlay");
  if (!menuIcon) menuIcon = document.getElementById("menuIcon");
  if (!icon) icon = document.querySelector(".icon");
}

/**
 * Fonction principale pour basculer l'état du menu burger
 * Ouvre le menu s'il est fermé, le ferme s'il est ouvert
 * Gère l'animation et l'icône du menu
 * 
 * OPTIMISATION: Utilise le cache des éléments DOM au lieu de requêtes répétées
 */
function editNav() {
  initMenuElements();

  if (!topnav || !overlay || !menuIcon) {
    console.error("Éléments du menu burger non trouvés");
    return;
  }

  if (!isMenuOpen) {
    // Ouvrir le menu
    // NOTE: On modifie directement l'objet DOM via la référence
    topnav.classList.add("responsive");
    overlay.classList.add("active");
    
    // NOTE: isMenuOpen est un boolean (primitif) = affectation par valeur
    // On modifie la variable locale, pas une référence
    isMenuOpen = true;

    if (icon) {
      icon.setAttribute("aria-expanded", "true");
      icon.setAttribute("aria-label", "Fermer le menu de navigation");
    }

    // Empêcher le scroll du body
    document.body.style.overflow = "hidden";

    // Ajouter la classe active et changer l'icône en même temps
    setTimeout(() => {
      topnav.classList.add("active");
      // Changer l'icône en croix avec l'animation du menu
      menuIcon.className = "fa fa-times";
    }, 50);
  } else {
    closeMenu();
  }
}

/**
 * Ferme le menu burger avec animation
 * Retire les classes CSS et restaure l'état initial
 * Remet l'icône en burger et réactive le scroll
 * 
 * OPTIMISATION: Utilise le cache des éléments DOM au lieu de requêtes répétées
 */
function closeMenu() {
  initMenuElements();

  if (!topnav || !overlay || !menuIcon) {
    console.error("Éléments du menu burger non trouvés pour la fermeture");
    return;
  }

  if (isMenuOpen) {
    // Animation de fermeture
    topnav.classList.add("closing");

    // Fermer après l'animation
    setTimeout(() => {
      topnav.classList.remove("responsive", "active", "closing");
      overlay.classList.remove("active");
      
      // NOTE: Modification d'une variable primitive (affectation par valeur)
      isMenuOpen = false;

      if (icon) {
        icon.setAttribute("aria-expanded", "false");
        icon.setAttribute("aria-label", "Ouvrir le menu de navigation");
      }

      // Changer l'icône en burger seulement à la fin de l'animation
      menuIcon.className = "fa fa-bars";

      // Restaurer le scroll du body
      document.body.style.overflow = "";
    }, 200); // Durée de l'animation de sortie
  }
}

/**
 * Initialise les événements pour fermer le menu automatiquement
 * Ferme le menu quand on clique sur un lien de navigation
 */
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".main-navbar a:not(.icon)");
  menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Event hydration: Add event listener to burger menu button
  const burgerButton = document.querySelector(".icon");
  if (burgerButton) {
    burgerButton.addEventListener("click", editNav);
  }

  // Event hydration: Add event listener to menu overlay
  const menuOverlay = document.getElementById("menuOverlay");
  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }
});

/**
 * Ferme le menu avec la touche Escape
 * Écoute les événements clavier pour une meilleure accessibilité
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && isMenuOpen) {
    closeMenu();
  }
});
