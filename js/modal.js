// DOM Elements - Sélection des éléments du modal (seront initialisés après le chargement)
let modalbg, modalBtn, formData, closeBtn;

// Variables globales pour le système modal
let modalLoaded = false;

/**
 * Charge le contenu de la modal depuis modal-content.html
 * et initialise les événements une fois le contenu chargé
 */
async function loadModal() {
  const container = document.getElementById("modal-container");
  
  if (!container) {
    console.error("Conteneur modal introuvable");
    return;
  }

  try {
    // Charger le contenu de modal-content.html
    const response = await fetch("modal-content.html");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Insérer le contenu dans le conteneur
    container.innerHTML = html;
    
    // Initialiser les éléments DOM une fois le contenu chargé
    modalbg = document.querySelector(".bground");
    modalBtn = document.querySelectorAll(".modal-btn");
    formData = document.querySelectorAll(".formData");
    closeBtn = document.querySelector(".close");
    
    // Attacher les événements
    if (modalBtn && modalBtn.length > 0) {
      modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
    }
    
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    
    // Initialiser la validation du formulaire
    initializeValidation();
    
    // Initialiser la gestion de la soumission du formulaire (moderne)
    initializeFormSubmission();
    
    modalLoaded = true;
    console.log("Modal chargée avec succès");
    
  } catch (error) {
    console.error("Erreur lors du chargement de la modal:", error);
  }
}

// Charger la modal au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  loadModal();
});

/**
 * Initialise la gestion moderne de la soumission du formulaire
 * Remplace l'ancienne pratique onsubmit inline par un EventListener
 */
function initializeFormSubmission() {
  const form = document.querySelector("form[name='reserve']");
  
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Empêche la soumission par défaut
      validate(); // Appelle la fonction de validation
    });
  }
}

/**
 * Initialise la validation en temps réel des champs du formulaire
 * Ajoute des écouteurs d'événements sur chaque champ pour valider à la perte de focus
 */
function initializeValidation() {
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
}

/**
 * Ouvre le modal de formulaire
 * Ajoute la classe CSS "show" pour afficher le modal
 */
function launchModal() {
  if (!modalbg) {
    modalbg = document.querySelector(".bground");
  }
  
  if (!modalbg) {
    console.error("Element .bground non trouvé");
    return;
  }
  
  modalbg.classList.add("show");

  modalbg.setAttribute("aria-hidden", "false");

  const firstInput = document.getElementById("first");
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

/**
 * Ferme le modal de formulaire avec animation
 * Ajoute la classe "closing" puis retire toutes les classes après l'animation
 */
function closeModal() {
  if (!modalbg) {
    modalbg = document.querySelector(".bground");
  }
  
  if (!modalbg) {
    console.error("Element .bground non trouvé");
    return;
  }
  
  modalbg.classList.add("closing");

  modalbg.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    modalbg.classList.remove("show", "closing");
  }, 800); // 800ms correspond à la durée de l'animation définie dans --modal-duration
}

// Validation functions - Fonctions de validation des champs

/**
 * Valide le champ prénom
 * Vérifie que le prénom contient au moins 2 caractères et respecte le format alphabétique
 * @returns {boolean} true si valide, false sinon
 */
function validateFirst() {
  const first = document.getElementById("first");
  const firstValue = first.value.trim();
  const firstData = first.closest(".formData");

  // Regex pour prénom : lettres, espaces, tirets, apostrophes (minimum 2 caractères)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,}$/;

  if (firstValue.length < 2) {
    firstData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    firstData.setAttribute("data-error-visible", "true");
    return false;
  } else if (!nameRegex.test(firstValue)) {
    firstData.setAttribute("data-error", "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes.");
    firstData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    firstData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ nom
 * Vérifie que le nom contient au moins 2 caractères et respecte le format alphabétique
 * @returns {boolean} true si valide, false sinon
 */
function validateLast() {
  const last = document.getElementById("last");
  const lastValue = last.value.trim();
  const lastData = last.closest(".formData");

  // Regex pour nom : lettres, espaces, tirets, apostrophes (minimum 2 caractères)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,}$/;

  if (lastValue.length < 2) {
    lastData.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    lastData.setAttribute("data-error-visible", "true");
    return false;
  } else if (!nameRegex.test(lastValue)) {
    lastData.setAttribute("data-error", "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes.");
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

  if (locations.length === 0) {
    console.error("Aucun élément de localisation trouvé");
    return false;
  }

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

  if (!modalBody) {
    console.error("Élément modal-body non trouvé");
    return;
  }

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
