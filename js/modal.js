// DOM Elements - Sélection des éléments du modal (seront initialisés après le chargement)
// NOTE: Ces variables stockent des RÉFÉRENCES aux objets DOM (affectation par référence)
// Quand on modifie modalbg, on modifie l'objet DOM original, pas une copie
let modalbg, modalBtn, formData, closeBtn;

// Variables globales pour le système modal
// NOTE: modalLoaded est un type primitif (boolean), donc affectation par VALEUR
let modalLoaded = false;

// Constantes pour les expressions régulières (évite la duplication)
// NOTE: Les regex sont des objets, donc affectation par référence quand on les assigne
const NAME_REGEX = /^[a-zA-ZÀ-ÿ]+(?:[-'][a-zA-ZÀ-ÿ]+| [a-zA-ZÀ-ÿ]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
 * Fonction générique pour valider les champs de nom (prénom/nom)
 * Évite la duplication de code entre validateFirst() et validateLast()
 * 
 * EXEMPLE d'affectation par VALEUR vs RÉFÉRENCE :
 * - fieldId est une chaîne (string) : affectation par VALEUR
 * - fieldElement est un objet DOM : affectation par RÉFÉRENCE
 * 
 * @param {string} fieldId - L'ID du champ à valider
 * @param {string} fieldName - Le nom du champ pour les messages d'erreur ("prénom" ou "nom")
 * @returns {boolean} true si valide, false sinon
 */
function validateNameField(fieldId, fieldName) {
  const fieldElement = document.getElementById(fieldId);
  if (!fieldElement) {
    console.error(`Champ ${fieldId} non trouvé`);
    return false;
  }

  // NOTE: .value retourne une chaîne (type primitif) = affectation par VALEUR
  // trim() crée une NOUVELLE chaîne, ne modifie pas l'original
  const fieldValue = fieldElement.value.trim();
  const fieldData = fieldElement.closest(".formData");

  if (fieldValue.length < 2) {
    fieldData.setAttribute("data-error", `Veuillez entrer 2 caractères ou plus pour le champ du ${fieldName}.`);
    fieldData.setAttribute("data-error-visible", "true");
    return false;
  } else if (!NAME_REGEX.test(fieldValue)) {
    fieldData.setAttribute("data-error", `Le ${fieldName} ne peut contenir que des lettres, espaces, tirets et apostrophes. Il ne peut pas commencer ou finir par un tiret ou un espace.`);
    fieldData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    fieldData.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Valide le champ prénom
 * Utilise la fonction générique validateNameField() pour éviter la duplication
 * @returns {boolean} true si valide, false sinon
 */
function validateFirst() {
  return validateNameField("first", "prénom");
}

/**
 * Valide le champ nom
 * Utilise la fonction générique validateNameField() pour éviter la duplication
 * @returns {boolean} true si valide, false sinon
 */
function validateLast() {
  return validateNameField("last", "nom");
}

/**
 * Valide le champ email
 * Vérifie que l'email respecte le format standard (exemple@domaine.com)
 * @returns {boolean} true si valide, false sinon
 */
function validateEmail() {
  const email = document.getElementById("email");
  if (!email) {
    console.error("Champ email non trouvé");
    return false;
  }

  const emailValue = email.value.trim();
  const emailData = email.closest(".formData");

  if (!EMAIL_REGEX.test(emailValue)) {
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
  if (!birthdate) {
    console.error("Champ birthdate non trouvé");
    return false;
  }

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
 * 
 * NOTE: Number() convertit la chaîne en nombre (affectation par VALEUR)
 * Les nombres sont des types primitifs, donc affectation par valeur
 * 
 * @returns {boolean} true si valide, false sinon
 */
function validateQuantity() {
  const quantity = document.getElementById("quantity");
  if (!quantity) {
    console.error("Champ quantity non trouvé");
    return false;
  }

  const quantityValue = quantity.value;
  const quantityData = quantity.closest(".formData");
  
  // Convertir en nombre et valider
  // NOTE: Number() crée une NOUVELLE valeur (affectation par valeur)
  const numValue = Number(quantityValue);

  if (!quantityValue || isNaN(numValue) || numValue < 0 || numValue > 99) {
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
 * 
 * OPTIMISATION: Utilise Array.some() au lieu d'une boucle forEach
 * some() s'arrête dès qu'un élément correspond (plus performant)
 * 
 * @returns {boolean} true si valide, false sinon
 */
function validateLocation() {
  const locations = document.querySelectorAll('input[name="location"]');

  if (locations.length === 0) {
    console.error("Aucun élément de localisation trouvé");
    return false;
  }

  const locationData = locations[0].closest(".formData");
  
  // NOTE: Array.from() convertit NodeList en Array pour utiliser .some()
  // .some() retourne true dès qu'un élément vérifie la condition
  // Plus efficace que forEach car s'arrête à la première correspondance
  const isChecked = Array.from(locations).some(location => location.checked);

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
  if (!checkbox1) {
    console.error("Champ checkbox1 non trouvé");
    return false;
  }

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
 * 
 * OPTIMISATION: Utilise un tableau de fonctions de validation
 * Permet une validation plus maintenable et extensible
 * 
 * EXEMPLE d'affectation par RÉFÉRENCE :
 * - validators est un tableau contenant des RÉFÉRENCES aux fonctions
 * - Chaque fonction est un objet, donc stockée par référence
 * 
 * @returns {boolean} false pour empêcher la soumission normale du formulaire
 */
function validate() {
  // Tableau de fonctions de validation (affectation par RÉFÉRENCE)
  // Chaque élément du tableau est une référence à une fonction
  const validators = [
    validateFirst,
    validateLast,
    validateEmail,
    validateBirthdate,
    validateQuantity,
    validateLocation,
    validateCheckbox1
  ];

  // NOTE: .every() vérifie que TOUTES les fonctions retournent true
  // S'arrête à la première fonction qui retourne false (court-circuit)
  // Chaque fonction est appelée avec () car ce sont des références
  const isValid = validators.every(validator => validator());

  if (isValid) {
    showConfirmation();
  }

  return false; // Empêche toujours la soumission normale du formulaire
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
