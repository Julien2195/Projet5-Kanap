const itemContainer = document.querySelector("#cart__items");
let panier = getPanier();

const quantityContainer = document.querySelector("#totalQuantity");
const priceContainer = document.querySelector("#totalPrice");
//Appelle l'API
fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    onDataAvailable(data);
    calcul(data);
  });
//Condition si le LS est vide on affiche la fonction showMessage sinon on affiche nos articles
function onDataAvailable(data) {
  if (panier.length === 0) {
    showMessage();
    return;
  }
  for (let i in panier) {
    const item = panier[i];
    const foundID = data.find((p) => p._id === item.id);
    if (foundID === undefined) {
      continue;
    }
    createArticle(data, foundID, item);
  }
}

//Panier vide
function showMessage() {
  itemContainer.textContent = " Panier vide !";
  itemContainer.style.textAlign = "center";
  itemContainer.style.fontWeight = "600";
  itemContainer.style.fontSize = "20px";
  itemContainer.style.color = "red";
}
//creation du container article
function createArticle(data, foundID, item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", item.id);
  article.setAttribute("data-color", item.color);

  itemContainer.append(article);
  //Affiche les images
  createImage(data, foundID, item, article);
}
// Fonction pour afficher les images du produit
function createImage(data, foundID, item, article) {
  const createImgDiv = document.createElement("div");
  createImgDiv.classList.add("cart__item__img");
  const img = document.createElement("img");

  img.src = foundID.imageUrl;
  img.alt = foundID.altTxt;

  article.append(createImgDiv);
  createImgDiv.append(img);
  //Container qui englobe les éléments
  containerElements(data, foundID, item, article);
}

function containerElements(data, foundID, item, article) {
  const contentGlobalDiv = document.createElement("div");
  contentGlobalDiv.classList.add("cart__item__content");

  article.append(contentGlobalDiv);
  //Affiche les descriptions des articles
  contentDescription(foundID, item, contentGlobalDiv);
  contentSettings(data, foundID, item, contentGlobalDiv);
}
//Créer les descriptions des articles
function contentDescription(foundID, item, contentGlobalDiv) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  const pColor = document.createElement("p");
  const pPrice = document.createElement("p");

  h2.textContent = foundID.name;
  pColor.textContent = item.color;
  pPrice.textContent = `${foundID.price} €`;

  contentGlobalDiv.append(contentDiv);
  contentDiv.append(h2);
  contentDiv.append(pColor);
  contentDiv.append(pPrice);
}

function contentSettings(data, foundID, item, contentGlobalDiv) {
  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");

  contentGlobalDiv.append(settingsDiv);
  //Affiche l'input avec la qté
  contentSettingsQuantity(data, foundID, item, settingsDiv);

  deleteItem(foundID, item, settingsDiv);
}

//création de la qté
function contentSettingsQuantity(data, foundID, item, settingsDiv) {
  const settingsQuantityDiv = document.createElement("div");
  settingsQuantityDiv.classList.add("cart__item__content__settings__quantity");

  settingsDiv.append(settingsQuantityDiv);

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté :";

  settingsQuantityDiv.append(pQuantity);

  //création de Input
  const inputQuantity = document.createElement("input");
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("name", "inputQuantity");
  inputQuantity.setAttribute("min", 1);
  inputQuantity.setAttribute("max", 100);
  inputQuantity.setAttribute("value", item.quantity);
  settingsQuantityDiv.append(inputQuantity);

  //Modification de la nouvelle quantité
  inputQuantity.addEventListener("change", () => {
    const updateQuantity = parseInt(inputQuantity.value);

    item.quantity = updateQuantity;
    savePanier(panier);

    //Condition si article <1 ou >100
    if (item.quantity < 1) {
      deleteItemAction(foundID, item);
      window.location.reload();
      alert(
        "Vous ne pouvez pas prendre une quantité inférieur à 100, article supprimé "
      );
      savePanier(panier);
    } else if (item.quantity > 100) {
      alert("Vous ne pouvez pas prendre plus de 100 articles !");
      window.location.reload();
      item.quantity = 100;
      savePanier(panier);
    }

    calcul(data);
  });
}

//Ajout du fonction supprimer
function deleteItem(foundID, item, settingsDiv) {
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");

  pDelete.textContent = "Supprimer";

  pDelete.addEventListener("click", () => {
    deleteItemAction(item);
    alert("Article supprimé");
    savePanier(panier);
    window.location.reload();
  });
  settingsDiv.append(deleteDiv);
  deleteDiv.append(pDelete);
}

//Action supprimé
function deleteItemAction(item) {
  panier = panier.filter((p) => p.id != item.id || p.color != item.color);
}

//Calcul de la quantité et prix !
function calcul(data) {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let i in panier) {
    const item = panier[i];
    const foundID = data.find((p) => p._id === item.id);
    if (foundID == undefined) {
      continue;
    }
    totalQuantity += item.quantity;
    totalPrice += foundID.price * item.quantity;
  }
  quantityContainer.textContent = totalQuantity;
  priceContainer.textContent = totalPrice;
}

//*****************************************************FORMULAIRE************************************************************* */

//PRENOM

formElement.firstName.addEventListener("change", function () {
  validationfirstName(formElement.firstName);
});

//NOM
formElement.lastName.addEventListener("change", function () {
  validationlastName(formElement.lastName);
});

// ADRESSE
formElement.address.addEventListener("change", function () {
  validationAddress(formElement.address);
});

//VILLE
formElement.city.addEventListener("change", function () {
  validationCity(formElement.city);
});

//EMAIL
formElement.email.addEventListener("change", function () {
  validationEmail(formElement.email);
});

//ENVOYER

formElement.addEventListener("submit", (e) => {
  e.preventDefault(e);
  if (
    //Condition si les Regex sont true envoie du fomulaire sinon message d'erreur
    validationfirstName(formElement.firstName) &&
    validationlastName(formElement.lastName) &&
    validationAddress(formElement.address) &&
    validationCity(formElement.city) &&
    validationEmail(formElement.email)
  ) {
    //Envoi formElementulaire
    envoieFormulaire();
  } else {
    alert("Formulaire non valide !");
  }
});
