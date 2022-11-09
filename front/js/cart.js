

fetch(`http://localhost:3000/api/products`)
  .then((response) => response.json())
  .then((data) => {
    
 let panier = getPanier()
 console.log(panier[0].color);
 for(let i =0; i<panier.length; i++){
  let item = panier[i]
  let foundID = data.find((p)=> p._id === item.id)
  console.log(data);
  if(foundID != undefined){
    const idClass = document.querySelector("#cart__items");
    //ARTICLE
    const article = document.createElement("article");
    const classCart_item = article.classList.add("cart__item");
    article.setAttribute("data-id", "product-ID");
    article.setAttribute("data-color", "product-color");
  //DIV 
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 =  document.createElement('div')
    const img = document.createElement('img')
    // H,P ...
    const h2 = document.createElement('h2')
  //CART  IMAGE
    div1.classList.add("cart__item__img");

   //CART ITEM CONTENT
  div2.classList.add("cart__item__content")
    div3.classList.add("cart__item__content__description")

    img.src=foundID.imageUrl

    idClass.append(article);
    article.append(div1);
    div1.append(img)
    article.append(div2);
    article.append(div3)
    div3.append(h2) 
  }
 }
  // h2.innerHTML= `${}`
    //////////////////////////////////////////////////////////////////////////////:
    
 });

// A SUPPRIMER
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
