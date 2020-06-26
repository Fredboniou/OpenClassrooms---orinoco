let divImage = document.getElementById('divImage');
let divDescription = document.getElementById('divDescription');
let choiceColors = document.getElementById('choiceColors');

/* obtention des paramètres URL */
const urlParams = new URLSearchParams(window.location.search);
let idBears = urlParams.get("id");


/* Récupération des données pour chaque produit */
fetch('http://localhost:3000/api/teddies/' + idBears)
    .then(response => response.json()
    .then(function(bearData) {
        if(response.ok){
            console.log(bearData);
            
            /* création de la structure HTML */
            let productImage =  document.createElement('img');
            let productName = document.createElement('h3');
            let price = document.createElement('p');
            let productPrice = document.createElement('span');
            let productDescription = document.createElement('p');

            /* Ajout des attributs aux balises que l'on vient de créer */
            productImage.setAttribute('src', bearData.imageUrl);
            productImage.setAttribute('class', 'img-fluid');
            productImage.setAttribute('alt', 'Colorlib Template');
            productName.setAttribute('class', 'productName');
            price.setAttribute('class', 'price');
            productPrice.setAttribute('class', 'productPrice');
            productDescription.setAttribute('class', 'productDescription');

            /* Hierarchisation des balises HTML */
            divImage.appendChild(productImage);
            divDescription.appendChild(productName);
            divDescription.appendChild(price);
            price.appendChild(productPrice);
            divDescription.appendChild(productDescription);

            /* Contenu des balises */
            productName.textContent = bearData.name;
            productPrice.textContent =  bearData.price / 100 + ' €';
            productDescription.textContent = bearData.description;

            for (let i = 0; i < bearData.colors.length; i++) {
                let productColors = document.createElement('option')
                let bearColors = bearData.colors[i];
                productColors.setAttribute('value', bearColors ); 
                productColors.innerHTML = bearColors;
                choiceColors.appendChild(productColors);
            }}    
        }
    ))


    