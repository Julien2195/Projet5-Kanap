// On recupère l'API

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    let items = document.querySelector(".items");

    // Affichage de tous les articles grâce à la boucle FOR
    for (let i in data) {
      //Création des balises
      let newTitreCarte = document.createElement("h3");
      let newBodyCarte = document.createElement("p");
      let img = document.createElement("img");
      let article = document.createElement("article");
      let lien = document.createElement("a");

      //On récupere les informations dans l'API
      newTitreCarte.textContent = data[i].name;
      newBodyCarte.textContent = data[i].description;

      //On récupère l'url des images dans l'API
      img.src = data[i].imageUrl;
      img.alt = data[i].altTxt;

      // On récuère l'ID dans l'API et on l'joute à l'url pour rediriger vers la page Product.js
      lien.href = `./product.html?${data[i]._id}`;

      //On ajoute nos élements à leurs parents
      article.append(img);
      article.append(newTitreCarte);
      article.append(newBodyCarte);
      items.append(lien);
      lien.append(article);
    }
  });
