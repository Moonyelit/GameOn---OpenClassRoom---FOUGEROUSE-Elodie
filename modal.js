function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// Add real-time validation
document.addEventListener("DOMContentLoaded", function() {
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.querySelectorAll('input[name="location"]');
  const checkbox1 = document.getElementById("checkbox1");
  
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

// launch modal form
function launchModal() {
  modalbg.classList.add("show");
}

// close modal form
function closeModal() {
  modalbg.classList.add("closing");
  setTimeout(() => {
    modalbg.classList.remove("show", "closing");
  }, 800); // 800ms correspond à la durée de l'animation définie dans --modal-duration
}

// Validation functions
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

function validateBirthdate() {
  const birthdate = document.getElementById("birthdate");
  const birthdateValue = birthdate.value;
  const birthdateData = birthdate.closest(".formData");
  
  if (!birthdateValue) {
    birthdateData.setAttribute("data-error", "Veuillez entrer votre date de naissance.");
    birthdateData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    birthdateData.setAttribute("data-error-visible", "false");
    return true;
  }
}

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
    locationData.setAttribute("data-error", "Veuillez sélectionner une ville.");
    locationData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    locationData.setAttribute("data-error-visible", "false");
    return true;
  }
}

function validateCheckbox1() {
  const checkbox1 = document.getElementById("checkbox1");
  const checkbox1Data = checkbox1.closest(".formData");
  
  if (!checkbox1.checked) {
    checkbox1Data.setAttribute("data-error", "Vous devez accepter les conditions d'utilisation.");
    checkbox1Data.setAttribute("data-error-visible", "true");
    return false;
  } else {
    checkbox1Data.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Main validation function
function validate() {
  const isFirstValid = validateFirst();
  const isLastValid = validateLast();
  const isEmailValid = validateEmail();
  const isBirthdateValid = validateBirthdate();
  const isQuantityValid = validateQuantity();
  const isLocationValid = validateLocation();
  const isCheckbox1Valid = validateCheckbox1();
  
  return isFirstValid && isLastValid && isEmailValid && isBirthdateValid && isQuantityValid && isLocationValid && isCheckbox1Valid;
}


