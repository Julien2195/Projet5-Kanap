//Recherche de l'URL via window.location
const getID = window.location.search;
//On coupe le ? avec la methode slice pour recuperer seulement l'id
let myID = getID.slice(1);

//On récupère nos classes et ID dans le HTML
const item = document.querySelector(".item__img");
const titleH1 = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const colorsSelect = document.querySelector("#colors");
const card = document.querySelector("#addToCart");
const nbrOfQuantity = document.querySelector("#quantity");

fetch(`http://localhost:3000/api/products/${myID}`)
  .then((response) => response.json())
  .then((data) => {
    // Affiche l'image, le prix, le titre et la description
    getProductById(data);

    //Affiche choix des couleurs
    getColors(data);
  });

//*****************************************************************************************************

card.addEventListener("click", () => {
  // Condition pour ajouter les elements dans le LS
  if (
    nbrOfQuantity.value <= 0 ||
    nbrOfQuantity.value > 100 ||
    colorsSelect.value === ""
  ) {
    alert("Vous devez choisir une quantité ou une couleur valide !");
    return;
  }
  // Elements ID, couleur et quantités qui seront dans le LS
  let items = {
    id: myID,
    color: colorsSelect.value,
    quantity: parseInt(nbrOfQuantity.value),
  };
  alert("Votre produit à été ajouté au panier");
  addPanier(items); // Si condition OK alors on ajoute et sauvegarde les données  dans le LS
});
