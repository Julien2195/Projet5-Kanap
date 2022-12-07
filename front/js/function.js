// ********************************************************LOCAL STORAGE ************************************************************

// Sauvegarde les éléments ID, couleur(s) et quantité(s) dans le LocalStorage
function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier)); // On transforme le format JSON en string  (JSON ne peux pas être lu directement)
}
// On récupère le LS
function getPanier() {
  let panier = localStorage.getItem("panier");
  if (panier === null) {
    panier = []; // Si aucun éléments dans le LS (null) on créer le tableau
  } else {
    return JSON.parse(panier); //Transforme string en objet JS
  }
  return panier;
}
// On ajoute le panier dans le LS
function addPanier(items) {
  let panier = getPanier();

  //Si foundProduct === true on ajoute la quantité sinon on créer un nouveau tableau
  let foundProduct = panier.find(
    (p) => p.id === items.id && p.color === items.color
  );

  if (foundProduct != undefined) {
    foundProduct.quantity += items.quantity;
  } else {
    panier.push(items);
  }
  savePanier(panier);
}

// ********************************************************FORMULAIRE ************************************************************

const inputs = document.querySelectorAll("input");
//Création de la balise si Regex === true
const succes = document.createElement("p");
succes.style.color = "green";

const formElement = document.querySelector(".cart__order__form");
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const itemQuestion = document.querySelectorAll(".cart__order__form__question");
//PRENOM
function validationfirstName(Name) {
  const nameRegex = new RegExp(/^[a-zA-Z\-]+$/);
  const testName = nameRegex.test(Name.value);
  if (testName === false) {
    firstNameErrorMsg.textContent = "Prenom non valide !";
    succes.remove(succes);
    itemQuestion[0].appendChild(firstNameErrorMsg);
    return false;
  } else {
    succes.textContent = "Le prenom est valide !";
    firstNameErrorMsg.remove(firstNameErrorMsg);
    itemQuestion[0].appendChild(succes);
    return true;
  }
}

//NOM
function validationlastName(Name) {
  const nameRegex = new RegExp(/^[a-zA-Z\-]+$/);
  const testName = nameRegex.test(Name.value);
  if (testName === false) {
    lastNameErrorMsg.textContent = "Le nom n'est pas valide !";
    succes.remove(succes);
    itemQuestion[1].appendChild(lastNameErrorMsg);
    return false;
  } else {
    succes.textContent = "Le nom est valide !";
    lastNameErrorMsg.remove(lastNameErrorMsg);
    itemQuestion[1].appendChild(succes);
    return true;
  }
}

//ADRESSE
function validationAddress(Name) {
  const nameRegex = new RegExp(/([0-9]*)?([-'\s][a-zA-Zàâäéèêëïîôöùûüç]+)+$/);
  const testName = nameRegex.test(Name.value);
  if (testName === false) {
    addressErrorMsg.textContent = "L'adresse n'est pas valide !";
    succes.remove(succes);
    itemQuestion[2].appendChild(addressErrorMsg);
    return false;
  } else {
    succes.textContent = "L'adresse est valide !";
    addressErrorMsg.remove(addressErrorMsg);
    itemQuestion[2].appendChild(succes);
    return true;
  }
}

// VILLE
function validationCity(City) {
  const nameRegex = new RegExp(/^[0-9]{5}([-'\s][a-zA-Zàâäéèêëïîôöùûüç]+)+$/);
  const testName = nameRegex.test(City.value);
  if (testName === false) {
    cityErrorMsg.textContent = "La ville n'est pas valide !";
    succes.remove(succes);
    itemQuestion[3].appendChild(cityErrorMsg);
    return false;
  } else {
    succes.textContent = "La ville est valide !";
    cityErrorMsg.remove(cityErrorMsg);
    itemQuestion[3].appendChild(succes);
    return true;
  }
}
//EMAIL
function validationEmail(Email) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testEmail = emailRegex.test(Email.value);

  if (testEmail === false) {
    emailErrorMsg.textContent = "Adresse email non valide !";
    succes.remove(succes);
    itemQuestion[4].appendChild(emailErrorMsg);
    return false;
  } else {
    succes.textContent = "Adresse email valide !";
    emailErrorMsg.remove(emailErrorMsg);
    itemQuestion[4].appendChild(succes);
    return true;
  }
}
//On vide le panier une fois la commande passer
function updatePanier() {
  localStorage.removeItem("panier");
}
//Envoi du formulaire
function envoieFormulaire() {
  let panier = getPanier();
  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: panier.map((p) => p.id),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      ((response) => response.orderId).then(
        (window.location.href = `./confirmation.html?${data.orderId}`).then(
          updatePanier()
        )
      );
    });
}
