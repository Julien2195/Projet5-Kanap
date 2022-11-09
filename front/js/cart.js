fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    let panier = getPanier();

    for (let i = 0; i < panier.length; i++) {
      let foundID = data.find((p) => p._id === panier[i].id);
      if (foundID != undefined) {
        //QUERYSELECTOR
        const idClass = document.querySelector("#cart__items");
        //ARTICLE
        const article = document.createElement("article");
        const classCart_item = article.classList.add("cart__item");
        article.setAttribute("data-id", "product-ID");
        article.setAttribute("data-color", "product-color");
        //DIV
        const div1 =
          document.createElement("div"); /*<div class="cart__item__img">*/
        const div2 =
          document.createElement("div"); /*<div class="cart__item__content">*/
        const div3 =
          document.createElement(
            "div"
          ); /*<div class="cart__item__content__description">*/
        const div4 =
          document.createElement(
            "div"
          ); /*<div class="cart__item__content__settings">*/
        const div5 =
          document.createElement(
            "div"
          ); /*<div class="cart__item__content__settings__quantity">*/
        const div6 =
          document.createElement(
            "div"
          ); /*<div class="cart__item__content__settings__delete">*/
        //P,Hn

        const h2 = document.createElement("h2");
        const pColor = document.createElement("p");
        const pPrice = document.createElement("p");
        const pQuantity = document.createElement("p");
        const pDeleteItem = document.createElement("p");
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
        pPrice.textContent = `${data[i].price} €`;
        //CART ITEM SETTINGS
        div4.classList.add("cart__item__content__settings");
        //CART ITEM SETTINGS QUANTITY
        div5.classList.add("cart__item__content__settings__quantity");
        pQuantity.textContent = "Qté :";
        div5.innerHTML = `<input type="number" class="itemQuantity"  name="itemQuantity" min="1" max="100" value=${panier[i].quantity}>`;
        //CART ITEM SETTINGS DELETE
        div6.classList.add("cart__item__content__settings__delete");
        pDeleteItem.classList.add("deleteItem");
        pDeleteItem.textContent = "Supprimer";

        //SUUPRIMER ELEMENTS PANIER

        pDeleteItem.addEventListener("click", () => {
          panier = panier.filter(
            (p) => p.id != panier[i].id ||  p.color != panier[i].color
          );
          savePanier(panier);
          window.location.reload();
        });
        /////////////////////
        idClass.append(article);
        /////////////////////
        article.append(div1);
        div1.append(img);
        /////////////////////
        article.append(div2);
        div2.append(div3);
        /////////////////////
        div3.append(h2);
        div3.append(pColor);

        /////////////////////
        div2.append(div4);
        div5.append(pQuantity);
        div3.append(pPrice);
        div4.append(div5);
        ////////////////////
        div4.append(div6);
        div6.append(pDeleteItem);
      }
    }
  });

// A SUPPRIMER
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
