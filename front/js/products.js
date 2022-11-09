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

    getProductById(data);

    //FONCTION CHOIX DES COULEURS

    getColors(data);
  });



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
});
