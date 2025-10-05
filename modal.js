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
  
  if (!isMenuOpen) {
    // Ouvrir le menu
    topnav.classList.add("responsive");
    overlay.classList.add("active");
    isMenuOpen = true;
    
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
  
  if (isMenuOpen) {
    // Animation de fermeture
    topnav.classList.add("closing");
    
    // Fermer après l'animation
    setTimeout(() => {
      topnav.classList.remove("responsive", "active", "closing");
      overlay.classList.remove("active");
      isMenuOpen = false;
      
      // Changer l'icône en burger seulement à la fin de l'animation
      menuIcon.className = "fa fa-bars";
      
      // Restaurer le scroll du body
      document.body.style.overflow = "";
    }, 200); // Durée de l'animation de sortie
  }
}

// Fermer le menu si on clique sur un lien
/**
 * Initialise les événements pour fermer le menu automatiquement
 * Ferme le menu quand on clique sur un lien de navigation
 */
document.addEventListener("DOMContentLoaded", function() {
  const menuLinks = document.querySelectorAll(".topnav.responsive a:not(.icon)");
  menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
});

/**
 * Ferme le menu avec la touche Escape
 * Écoute les événements clavier pour une meilleure accessibilité
 */
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && isMenuOpen) {
    closeMenu();
  }
});

// DOM Elements - Sélection des éléments du modal
const modalbg = document.querySelector(".bground"); // Arrière-plan du modal
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons pour ouvrir le modal
const formData = document.querySelectorAll(".formData"); // Champs du formulaire
const closeBtn = document.querySelector(".close"); // Bouton de fermeture

// launch modal event - Événement pour ouvrir le modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event - Événement pour fermer le modal
closeBtn.addEventListener("click", closeModal);

/**
 * Initialise la validation en temps réel des champs du formulaire
 * Ajoute des écouteurs d'événements sur chaque champ pour valider à la perte de focus
 */
document.addEventListener("DOMContentLoaded", function() {
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.querySelectorAll('input[name="location"]');
  const checkbox1 = document.getElementById("checkbox1");
  
  // Ajouter les écouteurs d'événements pour chaque champ
  if (first) first.addEventListener("blur", validateFirst);
  if (last) last.addEventListener("blur", validateLast);
  if (email) email.addEventListener("blur", validateEmail);
  if (birthdate) birthdate.addEventListener("blur", validateBirthdate);
  if (quantity) quantity.addEventListener("blur", validateQuantity);
  if (locations) {
    locations.forEach(location => {
      location.addEventListener("change", validateLocation);
    });
  }
  if (checkbox1) checkbox1.addEventListener("change", validateCheckbox1);
});

/**
 * Ouvre le modal de formulaire
 * Ajoute la classe CSS "show" pour afficher le modal
 */
function launchModal() {
  modalbg.classList.add("show");
}

/**
 * Ferme le modal de formulaire avec animation
 * Ajoute la classe "closing" puis retire toutes les classes après l'animation
 */
function closeModal() {
  modalbg.classList.add("closing");
  setTimeout(() => {
    modalbg.classList.remove("show", "closing");
  }, 800); // 800ms correspond à la durée de l'animation définie dans --modal-duration
}

// Validation functions - Fonctions de validation des champs

/**
 * Valide le champ prénom
 * Vérifie que le prénom contient au moins 2 caractères
 * @returns {boolean} true si valide, false sinon
 */
function validateFirst() {
  const first = document.getElementById("first");
  const firstValue = first.value.trim();
  const firstData = first.closest(".formData");
  
  if (firstValue.length < 2) {
    firstData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    firstData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    firstData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ nom
 * Vérifie que le nom contient au moins 2 caractères
 * @returns {boolean} true si valide, false sinon
 */
function validateLast() {
  const last = document.getElementById("last");
  const lastValue = last.value.trim();
  const lastData = last.closest(".formData");
  
  if (lastValue.length < 2) {
    lastData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    lastData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    lastData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ email
 * Vérifie que l'email respecte le format standard (exemple@domaine.com)
 * @returns {boolean} true si valide, false sinon
 */
function validateEmail() {
  const email = document.getElementById("email");
  const emailValue = email.value.trim();
  const emailData = email.closest(".formData");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(emailValue)) {
    emailData.setAttribute("data-error", "Veuillez entrer une adresse email valide.");
    emailData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    emailData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ date de naissance
 * Vérifie que la date de naissance est renseignée
 * @returns {boolean} true si valide, false sinon
 */
function validateBirthdate() {
  const birthdate = document.getElementById("birthdate");
  const birthdateValue = birthdate.value;
  const birthdateData = birthdate.closest(".formData");
  
  if (!birthdateValue) {
    birthdateData.setAttribute("data-error", "Vous devez entrer votre date de naissance.");
    birthdateData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    birthdateData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ quantité
 * Vérifie que la quantité est un nombre entre 0 et 99
 * @returns {boolean} true si valide, false sinon
 */
function validateQuantity() {
  const quantity = document.getElementById("quantity");
  const quantityValue = quantity.value;
  const quantityData = quantity.closest(".formData");
  
  if (!quantityValue || isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
    quantityData.setAttribute("data-error", "Veuillez entrer un nombre valide entre 0 et 99.");
    quantityData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    quantityData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ localisation (boutons radio)
 * Vérifie qu'au moins une option de localisation est sélectionnée
 * @returns {boolean} true si valide, false sinon
 */
function validateLocation() {
  const locations = document.querySelectorAll('input[name="location"]');
  const locationData = locations[0].closest(".formData");
  let isChecked = false;
  
  locations.forEach(location => {
    if (location.checked) {
      isChecked = true;
    }
  });
  
  if (!isChecked) {
    locationData.setAttribute("data-error", "Vous devez choisir une option.");
    locationData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    locationData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide la checkbox des conditions d'utilisation
 * Vérifie que l'utilisateur a accepté les termes et conditions
 * @returns {boolean} true si valide, false sinon
 */
function validateCheckbox1() {
  const checkbox1 = document.getElementById("checkbox1");
  const checkbox1Data = checkbox1.closest(".formData");
  
  if (!checkbox1.checked) {
    checkbox1Data.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
    checkbox1Data.setAttribute("data-error-visible", "true");
    return false;
  } else {
    checkbox1Data.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Fonction principale de validation du formulaire
 * Valide tous les champs et affiche la confirmation si tout est valide
 * @returns {boolean} false pour empêcher la soumission normale du formulaire
 */
function validate() {
  const isFirstValid = validateFirst();
  const isLastValid = validateLast();
  const isEmailValid = validateEmail();
  const isBirthdateValid = validateBirthdate();
  const isQuantityValid = validateQuantity();
  const isLocationValid = validateLocation();
  const isCheckbox1Valid = validateCheckbox1();
  
  const isValid = isFirstValid && isLastValid && isEmailValid && isBirthdateValid && isQuantityValid && isLocationValid && isCheckbox1Valid;
  
  if (isValid) {
    showConfirmation();
    return false; // Empêche la soumission normale du formulaire
  }
  
  return false; // Empêche la soumission si validation échoue
}

/**
 * Affiche le message de confirmation après validation réussie
 * Remplace le contenu du formulaire par un message de remerciement
 */
function showConfirmation() {
  const modalBody = document.querySelector(".modal-body");
  const form = document.querySelector("form[name='reserve']");
  
  // Créer le message de confirmation
  const confirmationHTML = `
    <div class="confirmation-message">
      <div class="message-container">
        <h2>Merci pour votre inscription</h2>
      </div>
      <button class="btn-submit" onclick="closeModal()">Fermer</button>
    </div>
  `;
  
  // Remplacer le contenu du formulaire
  modalBody.innerHTML = confirmationHTML;
}


