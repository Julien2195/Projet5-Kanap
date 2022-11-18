// Récupère et affiche l'image, le prix, le titre et la description et appelle cet fonction dans la page product.js
function getProductById(data) {
  //Créer la balise img
  const img = document.createElement("img");

  //Affiche les informations de l'API
  titleH1.textContent = data.name;
  price.textContent = data.price;
  description.textContent = data.description;

  // Récupère l'url de l'image dans l'API
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  item.append(img);
}
// Récupère le choix des couleurs et appelle cet fonction dans la page product.js
function getColors(data) {
  for (let color of data.colors) {
    const option = document.createElement("option");

    option.setAttribute("value", color);
    option.textContent = color;
    colorsSelect.append(option);
  }
}
// *************************************************************************************************************************************

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
