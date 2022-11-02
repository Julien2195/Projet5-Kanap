// ON AFFICHE TOUS LES CANAPES DANS LA PAGE D'ACCUEIL
function fetchGetproducts() {


    fetch('http://localhost:3000/api/products').then(response => response.json()).then(data => {

        
const items = document.querySelector('.items')

        for (let i = 0; i < data.length; i++) {

            let newTitreCarte = document.createElement('h3')
            let newBodyCarte = document.createElement('p')
            let img = document.createElement("img");
            let article = document.createElement('article')
            let lien = document.createElement('a')


            newTitreCarte.innerText = data[i].name
            newBodyCarte.innerText = data[i].description

            img.src = data[i].imageUrl
            img.alt = data[i].altTxt
            lien.href = `./product.html?${data[i]._id}`

            article.append(img)
            article.append(newTitreCarte)
            article.append(newBodyCarte)

            items.append(lien)
            lien.append(article)

        }

    })
}   
 fetchGetproducts()


 





