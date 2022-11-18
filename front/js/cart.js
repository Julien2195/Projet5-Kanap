fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    let panier = getPanier();
    const idItems = document.querySelector("#cart__items");
    const idPrice = document.querySelector(".cart__price");

    // Message si panier vide
    if (panier.length === 0) {
      idPrice.textContent = "Panier Vide";
      idPrice.style.textAlign = "center";
      idPrice.style.fontWeight = "600";
      idPrice.style.fontSize = "20px";
      idPrice.style.color = "red";
    }

    // Prix total (de base vaux 0)
    let totalPrice = 0;

    // On affiche tous les éléments stockés dans le LS dans le panier
    for (let i in panier) {
      //On recherche la correspondance entre l'ID de  l'API et l'ID stocké dans le panier (LS)
      const foundID = data.find((p) => p._id === panier[i].id);

      if (foundID != undefined) {
        //ARTICLE
        const article = document.createElement("article");
        const classCart_item = article.classList.add("cart__item");
        article.setAttribute("data-id", panier[i].id);
        article.setAttribute("data-color", panier[i].color);
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

        // On créer nos balises
        const h2 = document.createElement("h2");
        const pColor = document.createElement("p");
        const pPrice = document.createElement("p");
        const pQuantity = document.createElement("p");
        const pDeleteItem = document.createElement("p");
        const img = document.createElement("img");

        //Image
        div1.classList.add("cart__item__img");
        img.src = foundID.imageUrl;
        img.alt = foundID.altTxt;

        //CART ITEM CONTENT
        div2.classList.add("cart__item__content");
        div3.classList.add("cart__item__content__description");
        h2.textContent = data[i].description;
        pColor.textContent = panier[i].color;
        pPrice.textContent = `${foundID.price} €`;

        //CART ITEM SETTINGS
        div4.classList.add("cart__item__content__settings");

        //CART ITEM SETTINGS QUANTITY
        div5.classList.add("cart__item__content__settings__quantity");
        pQuantity.textContent = "Qté :";

        //CREATION DU INPUT
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", panier[i].quantity);

        //CART ITEM SETTINGS DELETE
        div6.classList.add("cart__item__content__settings__delete");
        pDeleteItem.classList.add("deleteItem");
        pDeleteItem.textContent = "Supprimer";

        //Si foundPanier=== true alors on change la quantité de l'input dans le LS
        function UpdateQuantity() {
          input.addEventListener("change", () => {
            const updateQuantity = parseInt(input.value);
            let foundPanier = panier.find(
              (p) => p.id === panier.id && p.color === panier.color
            );

            if (foundPanier != input.value) {
              panier[i].quantity = updateQuantity;
              savePanier(panier);
              window.location.reload();
            }

            // Condition si panier inférieur à 0 ou supperieur à 100
            if (panier[i].quantity > 100) {
              alert("Vous ne pouvez pas prendre plus de 100 articles !");
              panier[i].quantity = 100;
              savePanier(panier);
            }
            //Si panier inférieur à 0 on supprime l'article du panier 
            if (panier[i].quantity <= 0) {
              panier = panier.filter(
                (p) => p.id != panier[i].id || p.color != panier[i].color
              );
              savePanier(panier);
              window.location.reload();
            }
          });
        }

        UpdateQuantity();

        // Suppression élément panier 
        function deletePanier() {
          pDeleteItem.addEventListener("click", () => {
            panier = panier.filter(
              (p) => p.id != panier[i].id || p.color != panier[i].color
            );
            alert("Article supprimé");
            savePanier(panier);
            window.location.reload();
          });
        }
        deletePanier();

        // Total des quantités 
        totalPrice += foundID.price * panier[i].quantity;
        if (panier.length > 1) {
          idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${panier.length}</span> articles) : <span id="$totalPrice">${totalPrice}</span> €</p`;
        } else {
          idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${panier.length}</span> article) : <span id="totalPrice">${totalPrice}</span> €</p`;
        }

        // On ajoute nos élements à leurs parents 
        idItems.append(article);
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

        div5.append(input);
        ////////////////////
        div4.append(div6);
        div6.append(pDeleteItem);
      }
    }

    //*****************************************************FORMULAIRE************************************************************* */

    //On récupère nos class et ID 
    const form = document.querySelector(".cart__order__form");
    const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    const addressErrorMsg = document.querySelector("#addressErrorMsg");
    const cityErrorMsg = document.querySelector("#cityErrorMsg");
    const emailErrorMsg = document.querySelector("#emailErrorMsg");
    const itemQuestion = document.querySelectorAll(
      ".cart__order__form__question"
    );
    //Création de la balise si Regex === true
    const succes = document.createElement("p");
    succes.style.color = "green";

    //PRENOM
    form.firstName.addEventListener("change", function () {
      validationfirstName(form.firstName);
    });
    function validationfirstName(Name) {
      const nameRegex = new RegExp(/^[a-zA-Z\-]+$/);
      const testName = nameRegex.test(Name.value);
      if (testName === false) {
        firstNameErrorMsg.textContent = "Prenom non valide !";
        succes.remove(succes);
      } else {
        succes.textContent = "Le prenom est valide !";
        firstNameErrorMsg.remove(firstNameErrorMsg);
        itemQuestion[0].appendChild(succes);
      }
    }

    //NOM
    form.lastName.addEventListener("change", function () {
      validationlastName(form.lastName);
    });

    function validationlastName(Name) {
      const nameRegex = new RegExp(/^[a-zA-Z\-]+$/);
      const testName = nameRegex.test(Name.value);
      if (testName === false) {
        lastNameErrorMsg.textContent = "Le nom n'est pas valide !";
        succes.remove(succes);
      } else {
        succes.textContent = "Le nom est valide !";
        lastNameErrorMsg.remove(lastNameErrorMsg);
        itemQuestion[1].appendChild(succes);
      }
    }
    // ADRESSE
    form.address.addEventListener("change", function () {
      validationAddress(form.address);
    });

    function validationAddress(Name) {
      const nameRegex = new RegExp(
        /^[0-9]{1,4}\s[a-zA-Zé'-]{3,8}\s[a-zA-zé']{3,15}\s[a-zA-z]{4,15}\s[0-9]{5}/gm
      );
      const testName = nameRegex.test(Name.value);
      if (testName === false) {
        addressErrorMsg.textContent = "L'adresse n'est pas valide !";
        succes.remove(succes);
      } else {
        succes.textContent = "L'adresse est valide !";
        addressErrorMsg.remove(addressErrorMsg);
        itemQuestion[2].appendChild(succes);
      }
    }

    //VILLE
    form.city.addEventListener("change", function () {
      validationCity(form.city);
    });

    function validationCity(City) {
      const nameRegex = new RegExp(/^[a-zA-Z\-]+$/);
      const testName = nameRegex.test(City.value);
      if (testName === false) {
        cityErrorMsg.textContent = "Le ville n'est pas valide !";
        succes.remove(succes);
      } else {
        succes.textContent = "Le ville est valide !";
        cityErrorMsg.remove(cityErrorMsg);
        itemQuestion[3].appendChild(succes);
      }
    }

    //EMAIL
    form.email.addEventListener("change", function () {
      validationEmail(form.email);
    });
    function validationEmail(Email) {
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "g"
      );

      let testEmail = emailRegex.test(Email.value);

      if (testEmail === false) {
        emailErrorMsg.textContent = "Adresse email non valide !";
        succes.remove(succes);
      } else {
        succes.textContent = "Adresse email valide !";
        emailErrorMsg.remove(emailErrorMsg);
        itemQuestion[4].appendChild(succes);
      }
    }
    //ENVOYER 
    form.addEventListener("submit", (e) => {
      e.preventDefault(e);
      fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
          },
          products: panier.map((p) => p.id),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          ((response) => response.orderId).then(
            (window.location.href = "./confirmation.html?" + data.orderId)
          );
        });
    });
  });
