fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    let panier = getPanier();

    for (let i = 0; i < panier.length; i++) {
      let item = panier[i];
      let foundID = data.find((p) => p._id === item.id);
      if (foundID != undefined) {

        //QUERYSELECTOR
        const idClass = document.querySelector("#cart__items");
        //ARTICLE
        const article = document.createElement("article");
        const classCart_item = article.classList.add("cart__item");
        article.setAttribute("data-id", "product-ID");
        article.setAttribute("data-color", "product-color");
        //DIV,Hn
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
       
        const h2 = document.createElement("h2");
        const pColor =document.createElement("p")
        const pPrice =document.createElement("p")

        //CART  IMAGE
         const img = document.createElement("img");
        div1.classList.add("cart__item__img");
        img.src = foundID.imageUrl;
        img.alt = foundID.altTxt;
        //CART ITEM CONTENT
        div2.classList.add("cart__item__content");
        div3.classList.add("cart__item__content__description");
        h2.textContent = data[i].description;
       pColor.textContent = panier[i].color;
       pPrice.textContent = `${data[i].price} €`

        /////////////////////////////////
        idClass.append(article);
        article.append(div1);
        div1.append(img);
        article.append(div2);
        article.append(div3);
        div3.append(h2);
        div3.append(pColor)
        div3.append(pPrice)
      }
    }
    
  });

// A SUPPRIMER
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
