const itemsContainer = document.querySelector("#cart__items");
const totalPriceContainer = document.querySelector(".cart__price");

const quantityContainer = document.querySelector("#totalQuantity");
const priceContainer = document.querySelector("#totalPrice");

let panier = getPanier();
let apiData = {};
fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    onDataAvailable(data);
  });

function onDataAvailable(data) {
    apiData = data;
  // Message si panier vide
  if (panier.length === 0) {
    showEmptyPanier();
    return;
  }
  for (let i in panier) {
    const item = panier[i];
    const templateItem = data.find((p) => p._id === item.id);
    if (templateItem == undefined) {
      continue;
    }
    createArticle(templateItem, item);
    }
    updateTotalPrice();
}

function showEmptyPanier() {
  totalPriceContainer.textContent = "Panier Vide";
  totalPriceContainer.style.textAlign = "center";
  totalPriceContainer.style.fontWeight = "600";
  totalPriceContainer.style.fontSize = "20px";
  totalPriceContainer.style.color = "red";
}

function createArticle(templateItem, item) {
  const article = document.createElement("article");
  article.setAttribute("data-id", item.id);
  article.setAttribute("data-color", item.color);
  article.classList.add("cart__item");

  itemsContainer.append(article);

  createArticleElements(templateItem, item, article);
}

function createArticleElements(templateItem, item, article) {
  createArticleImage(templateItem, article);
  createArticleContent(templateItem, item, article);
}

function createArticleImage(templateItem, article) {
  const imageDiv = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = templateItem.imageUrl;
  imageElement.alt = templateItem.altTxt;
  imageDiv.classList.add("cart__item__img");
  article.append(imageDiv);
  imageDiv.append(imageElement);
}

function createArticleContent(templateItem, item, article) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");
  createArticleContentDescription(templateItem, item, contentDiv);
  createArticleContentSettings(templateItem, item, contentDiv);
  article.append(contentDiv);
}

function createArticleContentDescription(templateItem, item, container) {
  const contentDescriptionDiv = document.createElement("div");
  contentDescriptionDiv.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  const pColor = document.createElement("p");
  const pPrice = document.createElement("p");

  h2.textContent = templateItem.name;

  pColor.textContent = item.color;
  pPrice.textContent = `${templateItem.price} €`;

  container.append(contentDescriptionDiv);

  contentDescriptionDiv.append(h2);
  contentDescriptionDiv.append(pColor);
  contentDescriptionDiv.append(pPrice);
}

function createArticleContentSettings(templateItem, item, container) {
  const settingsDiv = document.createElement("div");

  settingsDiv.classList.add("cart__item__content__settings");
  createSettingsQuantity(templateItem, item, settingsDiv);
  createSettingsDelete(item, settingsDiv);
  container.append(settingsDiv);
}

function createSettingsQuantity(templateItem, item, container) {
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté :";

  const inputQuantity = document.createElement("input");
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("value", item.quantity);
  inputQuantity.setAttribute("min", 1);
  inputQuantity.setAttribute("max", 100);

  setupItemQuantityAction(item, inputQuantity);

  quantityDiv.append(pQuantity);
  quantityDiv.append(inputQuantity);
  container.append(quantityDiv);
}

function createSettingsDelete(item, container) {
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";

  container.appendChild(deleteDiv);
  deleteDiv.append(pDelete);
  setupDeleteAction(item, pDelete);
}

function setupItemQuantityAction(item, element) {
  element.addEventListener("change", () => {
    const updateQuantity = parseInt(element.value);

    updateItemQuantity(item, updateQuantity);
  });
}

function setupDeleteAction(item, element) {
  element.addEventListener("click", () => {
    deleteItemInPanier(item);
  });
}

function deleteItemInPanier(item) {
  const index = panier.findIndex(
    (x) => x.id === item.id && x.color === item.color
  );

  if (index === -1) {
    return;
  }
  panier.splice(index, 1);

  savePanier(panier);

  window.location.reload();
}

function updateItemQuantity(item, quantity) {
  item.quantity = quantity;
    savePanier(panier);
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;

    for(let i in panier){
        const item = panier[i];
        const templateItem = apiData.find((p) => p._id === item.id);
        if (templateItem == undefined) {
          continue;
        }
        totalQuantity += item.quantity;
        totalPrice += templateItem.price * item.quantity;
    }
    quantityContainer.textContent = totalQuantity;
    priceContainer.textContent = totalPrice;
}

//*****************************************************formElementULAIRE************************************************************* */
function setupFormValidator() {
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
      envoieformElementulaire();
    } else {
      alert("Forumaire non valide !");
    }
  });
}

setupFormValidator();
