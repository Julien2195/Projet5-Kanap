
//Recherche de l'URL via window.location
const queryString = window.location.search;

//On coupe le ? avec la methode slice pour recuperer seulement l'id 
let myID = queryString.slice(1)


fetch(`http://localhost:3000/api/products/${myID}`).then(response => response.json()).then(data => {


// RECUPERE L'IMG, LE PRIX, LE TITRE, LA DESCRIPTION
    function getProductById() {

        const img = document.createElement('img')

        const item = document.querySelector('.item__img')
        const titleH1 = document.querySelector('#title')
        const price = document.querySelector('#price')

        const description = document.querySelector('#description')

        titleH1.innerText = data.name
        price.innerText = data.price
        description.innerText = data.description

        img.src = data.imageUrl
        img.alt = data.altTxt
        item.append(img)

    }
    getProductById()



    //FONCTION CHOIX DES COULEURS 
    function getColors() {

        for (let i = 0; i < data.colors.length; i++) {
            const colors = document.querySelector('#colors')
            const option = document.createElement('option')
            option.innerHTML = `<option value="${data.colors[i]}">${data.colors[i]}</option>`

            colors.append(option)
        }
    }
    getColors()

})



fetch(`http://localhost:3000/api/products/`).then(response => response.json()).then(data => (console.log(data)))