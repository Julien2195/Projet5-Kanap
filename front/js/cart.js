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

									// Prix et quantité total  (de base vaux 0)
									let prixTotal = 0;
									let quantiteTotal = 0;
	

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
									
										input.addEventListener("change", () => {
											const updateQuantity = parseInt(input.value);
											
											panier[i].quantity = updateQuantity			
											//Calculs des quantités dynamiquement				
											let  quantiteTotalDynamique =0;
											panier.forEach(e =>{												
												quantiteTotalDynamique += e.quantity
												})
												
											savePanier(panier);																	
											if (quantiteTotalDynamique > 1) {
												idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${quantiteTotalDynamique}</span> articles) : <span id="$totalPrice">${prixTotalDynamiquement}</span> €</p`;
											} else {
												idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${quantiteTotalDynamique}</span> article) : <span id="totalPrice">${prixTotalDynamiquement}</span> €</p`;
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
																
										// Prix Total
										prixTotal += foundID.price * panier[i].quantity;
										
										//On affiche par default les quantités et prix , si l'utilisateur change de quantité alors on se reférer au addEventListener('change')
										if (quantiteTotal > 1) {
											idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${quantiteTotal}</span> articles) : <span id="$totalPrice">${prixTotal}</span> €</p`;
										} else {
											idPrice.innerHTML = `<p>Total (<span id="totalQuantity">${quantiteTotal}</span> article) : <span id="totalPrice">${prixTotal}</span> €</p`;
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

									//PRENOM

									form.firstName.addEventListener("change", function () {
										validationfirstName(form.firstName);
									});

									//NOM
									form.lastName.addEventListener("change", function () {
										validationlastName(form.lastName);
									});

									// ADRESSE
									form.address.addEventListener("change", function () {
										validationAddress(form.address);
									});

									//VILLE
									form.city.addEventListener("change", function () {
										validationCity(form.city);
									});

									//EMAIL
									form.email.addEventListener("change", function () {
										validationEmail(form.email);
									});

									//ENVOYER
									
									form.addEventListener("submit", (e) => {
										e.preventDefault(e);
										if (
										//Condition si les Regex sont true envoie du fomulaire sinon message d'erreur
										validationfirstName(form.firstName) &&
										validationlastName(form.lastName) &&
										validationAddress(form.address) &&
										validationCity(form.city) &&
										validationEmail(form.email)
										) {
										//Envoi formulaire
										envoieFormulaire();
										} else {
										alert("Forumaire non valide !");
										}
									});
									});
