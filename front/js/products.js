
   

function getProductById(){

    //Recherche de l'URL via window.location
    const queryString = window.location.search;
    
    //On coupe le ? avec la methode slice pour recuperer seulement l'id 
    let myID = queryString.slice(1)
       // ON APPELLE LA FONCTION 
    
        fetch(`http://localhost:3000/api/products/${myID}`).then(response => response.json()).then(data => {
    
            const item = document.querySelector('.item__img')
    
    
            let img = document.createElement('img')
    
    
    
            img.src = data.imageUrl
            img.alt = data.altTxt
    
    
            item.append(img)
    
    
    
        }
        )
    }
        getProductById()