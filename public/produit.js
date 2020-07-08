/* balises parentes */
let divImage = document.getElementById('divImage');
let divDescription = document.getElementById('divDescription');
let choiceColors = document.getElementById('choiceColors');
let addToCart = document.getElementById('addToCart');

/* obtention des paramètres URL */
const urlParams = new URLSearchParams(window.location.search);
let idBears = urlParams.get("id");
console.log(idBears);

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
                productColors.setAttribute('value', bearColors); 
                productColors.innerHTML = bearColors;
                choiceColors.appendChild(productColors);
            }
            addToCart.addEventListener('click', () => {
                //choix de la couleur obligatoire
                if(choiceColors.value == "" ){
                    alert('Veuillez choisir une couleur')
                    return false;
                }else{
                panier.push(bearData);
                localStorage.setItem('panier', JSON.stringify(panier));
                console.log('article ajouté au panier');
                alert('Cet article vient d\'être ajouté à votre panier');
                cartIndex();
                console.log(panier);
                }
            })}    
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
cartIndex();

//On vérifie si l'objet de stockage que l'on veut créer existe déjà ou non
if(localStorage.getItem('panier')){
    console.log(panier);
}else{
    console.log('panier prêt !');
    let cartInit = [];
    localStorage.setItem('panier', JSON.stringify(cartInit));
}





    




    