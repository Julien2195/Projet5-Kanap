// PAGE PRODUCTS.JS 


//// RECUPERE L'IMG, LE PRIX, LE TITRE, LA DESCRIPTION
function getProductById(data) {
    const img = document.createElement("img");

    titleH1.textContent = data.name;
    price.textContent = data.price;
    description.textContent = data.description;

    img.src = data.imageUrl;
    img.alt = data.altTxt;
    item.append(img);
  }
// RECUPERE LE CHOIX DES COULEURS 
  function getColors(data) {
    for (let color of data.colors) {
      const option = document.createElement("option");

      option.setAttribute("value", color);
      option.textContent = color;
      colorsSelect.appendChild(option);
    }
  }

// ON SAUVEGARDE LE PANIER DANS LE  LOCALSTORAGE  + CONVERTI LES VALEURS EN CHAINE (JSON)

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  // ON RECUPERE LE PANIER | SI PANIER VAUT  NULL ALORS ON CREER LE TABLEAU(PANIER) SINON ON PARSE LE PANIER
  function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier === null) {
      panier = [];
    } else {
      return JSON.parse(panier);
    }
    return panier;
  }

  //ON AJOUTE LE PANIER EN RECUPERANT LE getPanier() ET ON LE SAUVEGARDE avec savePanier(panier)
  function addPanier(items) {
    let panier = getPanier();
    //ON CHERCHE DANS LE TABLEAU,SI l'ID & COLOR SIMILAIRE ALORS ON INCREMENTE LA QUANTITE
    let foundProduct = panier.find((p) => p.id === items.id && p.color === items.color
    );

    if (foundProduct != undefined) {
      foundProduct.quantity += items.quantity;
    } else {
      panier.push(items);
    }
    savePanier(panier);
  }
