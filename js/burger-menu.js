// Variables pour le menu burger
let isMenuOpen = false; // État du menu (ouvert/fermé)

/**
 * Fonction principale pour basculer l'état du menu burger
 * Ouvre le menu s'il est fermé, le ferme s'il est ouvert
 * Gère l'animation et l'icône du menu
 */
function editNav() {
  const topnav = document.getElementById("myTopnav");
  const overlay = document.getElementById("menuOverlay");
  const icon = document.querySelector(".icon");
  const menuIcon = document.getElementById("menuIcon");

  // Correction : Vérification de l'existence des éléments critiques
  if (!topnav || !overlay || !menuIcon) {
    console.error("Éléments du menu burger non trouvés");
    return;
  }

  if (!isMenuOpen) {
    // Ouvrir le menu
    topnav.classList.add("responsive");
    overlay.classList.add("active");
    isMenuOpen = true;

    // Correction : Mise à jour des attributs d'accessibilité
    icon.setAttribute("aria-expanded", "true");
    icon.setAttribute("aria-label", "Fermer le menu de navigation");

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
 */
function closeMenu() {
  const topnav = document.getElementById("myTopnav");
  const overlay = document.getElementById("menuOverlay");
  const menuIcon = document.getElementById("menuIcon");

  // Correction : Vérification de l'existence des éléments avant manipulation
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
      isMenuOpen = false;

      // Correction : Mise à jour des attributs d'accessibilité
      const icon = document.querySelector(".icon");
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
  // Correction : Sélecteur corrigé pour cibler les liens de navigation
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
