/* balises parentes */
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

/* Ajout au panier */
/* On défini le panier et on le converti en objet JS ave JSON.parse */
let panier = JSON.parse(localStorage.getItem('panier'));

/* Affichage du nombre d'article en index */
function cartIndex(){
    let cart = document.getElementById('cart');
    cart.textContent = panier.length;
}

/* on vérifie si l'objet de stockage que l'on souhaite créer existe déjà ou non */
if (localStorage.getItem('panier')){
    console.log(panier);
}else{
    console.log('initialisation du panier');
    let initCart = [];
    localStorage.setItem('panier', JSON.stringify(initCart)); /* On converti une valeur JS en chaîne JSON */
}

/* Ajout de l'article au panier */
addProduct = () => {
    let addToCart = document.getElementById('addToCart');
    addToCart = () => {
        let addProductToCart = {
            name : bearData.name,
            image : bearData.imageUrl,
            color : bearData.colors[0],
            price : bearData.price / 100 + ' €'
        }
        addToCart.addEventListener('click', () => {
        panier.push(addProductToCart);
        localStorage.setItem('panier', JSON.stringify(panier));
        console.log('article ajouté');
        alert('ajouté au panier');
        })    
    }
}



    