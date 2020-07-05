/* balises parentes */
let divImage = document.getElementById('divImage');
let divDescription = document.getElementById('divDescription');
let choiceColors = document.getElementById('choiceColors');
let addToCart = document.getElementById('addToCart');

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

//Ajout au panier
//On défini le panier et on le converti en objet JS avec JSON.parse
let panier = JSON.parse(localStorage.getItem('panier'));

//Affichage du nombre d'articles en index
function cartIndex(){
    let cart = document.getElementById('cart');
    cart.textContent = panier.length;
}

//On vérifie si l'objet de stockage que l'on veut créer existe déjà ou non
if(localStorage.getItem('panier')){
    console.log(panier);
}else{
    console.log('panier prêt !');
    let cartInit = [];
    localStorage.setItem('panier', JSON.stringify(cartInit));
}

//Ajout au panier
addToCart.addEventListener('click', () => {
    //choix de la couleur obligatoire
    if(choiceColors.value == "" ){
        alert('Veuillez choisir une couleur')
        return false;
    }else{
    panier.push(idBears);
    localStorage.setItem('panier', JSON.stringify(panier));
    console.log('article ajouté au panier');
    alert('Cet article vient d\'être ajouté à votre panier');
    cartIndex();
    }
})

//balises parentes
let body = document.getElementById('body');
let panierVide = document.getElementById('panierVide');

//panier
      createCart = () => {
        if (panier.length > 0){
          panierVide.remove();

          panier.forEach((bearData) => {
            //création de la structure HTML
            let productLine = document.createElement('tr');
            let productRemove = document.createElement('td');
            let spanRemove = document.createElement('span');
            let picture = document.createElement('td');
            let pictureSrc = document.createElement('img');
            let nameColor = document.createElement('td');
            let productName = document.createElement('h3');
            let productColor = document.createElement('h3');
            let productPrice = document.createElement('td');
            let productQuantity = document.createElement('td');
            let divQuantity = document.createElement('div');
            let quantityChoice = document.createElement('input');
            let totalLine = document.createElement('td');

            //structure HTML
            body.appendChild(productLine);
            productLine.appendChild(productRemove);
            productRemove.appendChild(spanRemove);
            productLine.appendChild(picture);
            picture.appendChild(pictureSrc);
            productLine.appendChild(nameColor);
            nameColor.appendChild(productName);
            nameColor.appendChild(productColor);
            productLine.appendChild(productPrice);
            productLine.appendChild(productQuantity);
            productQuantity.appendChild(divQuantity);
            divQuantity.appendChild(quantityChoice);
            productLine.appendChild(totalLine);

            //ajout des attributs
            productLine.setAttribute('class', 'text-center');
            productRemove.setAttribute('class', 'product-remove');
            spanRemove.setAttribute('class', 'ion-ion-close');
            picture.setAttribute('class', 'image-product');
            pictureSrc.setAttribute('src', bearData.imageUrl);
            nameColor.setAttribute('class', 'product-name');
            productName.setAttribute('class', 'productName');
            productColor.setAttribute('class', 'productColor');
            productPrice.setAttribute('class', 'productPrice');
            productQuantity.setAttribute('class', 'quantity');
            divQuantity.setAttribute('class', 'input-group mb-3');
            quantityChoice.setAttribute('type', 'text');
            quantityChoice.setAttribute('name', 'quantity');
            quantityChoice.setAttribute('class', 'quantity form-control input-number');
            quantityChoice.setAttribute('value', '1');
            quantityChoice.setAttribute('min', '1');
            quantityChoice.setAttribute('max', '100');
            totalLine.setAttribute('class', 'total');

            //contenu
            productName.textContent = bearData.name;
            productColor.textContent = bearData.color;
            productPrice.textContent = bearData.price / 100 + ' €';
            totalLine.textContent = productPrice * quantityChoice.value + ' €';

        })
    }
}
    




    