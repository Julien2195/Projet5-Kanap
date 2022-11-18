//Recherche de l'URL via window.location
const queryString = window.location.search;
//On coupe le ? avec la methode slice pour recuperer seulement l'id
let myNumberOfOrder = queryString.slice(1);

const myOrder = document.querySelector("#orderId");

myOrder.append(myNumberOfOrder);
