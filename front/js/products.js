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
const nbrOfQuantity = document.querySelector('#quantity')

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




card.addEventListener("click", () => {

   let user ={
    monID: myID,
    colors: colorsSelect.value,
    quantity: nbrOfQuantity.value
}
  localStorage.setItem("nom",JSON.stringify(user));




})

//A SUPPRIMER
fetch(`http://localhost:3000/api/products/`)
  .then((response) => response.json())
  .then((data) => console.log(data));
