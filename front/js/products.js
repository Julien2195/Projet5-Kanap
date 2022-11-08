//Recherche de l'URL via window.location
const queryString = window.location.search;

//On coupe le ? avec la methode slice pour recuperer seulement l'id
let myID = queryString.slice(1);

////////////////////////////////////////////////////////////

const item = document.querySelector(".item__img");
const titleH1 = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const colorsSelect = document.querySelector("#colors");
const card = document.querySelector("#addToCart");
const nbrOfQuantity = document.querySelector("#quantity");

////////////////////////////////////////////////////////////

fetch(`http://localhost:3000/api/products/${myID}`)
  .then((response) => response.json())
  .then((data) => {
    // RECUPERE L'IMG, LE PRIX, LE TITRE, LA DESCRIPTION
    function getProductById() {
      const img = document.createElement("img");

      titleH1.textContent = data.name;
      price.textContent = data.price;
      description.textContent = data.description;

      img.src = data.imageUrl;
      img.alt = data.altTxt;
      item.append(img);
    }
    getProductById();

    //FONCTION CHOIX DES COULEURS

    function getColors() {
      for (let color of data.colors) {
        const option = document.createElement("option");

        option.setAttribute("value", color);
        option.textContent = color;
        colorsSelect.appendChild(option);
      }
    }
    getColors();
  });
  // let ancienPanier = JSON.parse(localStorage.getItem("panier"));
card.addEventListener("click", () => {
  // Condition pour ajouter les elements dans le LS
  if (
    nbrOfQuantity.value <= 0 ||
    nbrOfQuantity.value > 100 ||
    colorsSelect.value === ""
  ) {
    return;
  }
  let items = {
    id: myID,
    color: colorsSelect.value,
    quantity: parseInt(nbrOfQuantity.value),
  };

  addPanier(items);

  function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier === null) {
      panier = [];
    } else {
      return JSON.parse(panier);
    }
    return panier;
  }

  function addPanier(items) {
    let panier = getPanier();
    let foundProduct = panier.find(
      (p) => p.id === items.id && p.color === items.color
    );

    if (foundProduct != undefined) {
      foundProduct.quantity +=items.quantity;
      console.log(typeof items.quantity);
    } else {
      panier.push(items);
    }
    savePanier(panier);
  }
});
