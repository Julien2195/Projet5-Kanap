fetch(`http://localhost:3000/api/products`)
    .then((response) => response.json())
    .then((data) => {

        console.log(data);
        for (let product of data) {
            console.log(product.price);
        }
     })