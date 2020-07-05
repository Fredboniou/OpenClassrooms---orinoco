//balises parentes
let body = document.getElementById('body');
let panierVide = document.getElementById('panierVide');

//panier
function cartDisplay(){
  let panier = JSON.parse(localStorage.getItem('panier'));

  //récupération des données du panier
  if(localStorage.getItem('panier')){
  console.log(panier);
  createCart = () => {
    if (panier.length > 0){
      panierVide.remove();

      panier.forEach((bear) => {
        //création de la structure HTML
        let productLine = document.createElement('tr');
        let productRemove = document.createElement('td');
        let buttonRemove = document.createElement('button');
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
        productRemove.appendChild(buttonRemove);
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
        buttonRemove.setAttribute('class', 'remove');
        buttonRemove.setAttribute('type', 'button');
        buttonRemove.setAttribute('title', 'supprimer cet article')
        picture.setAttribute('class', 'image-product');
        pictureSrc.setAttribute('src', bear.imageUrl);
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
        buttonRemove.textContent = 'X';
        productName.textContent = bear.name;
        productColor.textContent = bear.color;
        productPrice.textContent = bear.price / 100 + ' €';
        totalLine.textContent = productPrice * quantityChoice.value + ' €';
      })
    }else{
    console.log('panier prêt !');
    let cartInit = [];
    localStorage.setItem('panier', JSON.stringify(cartInit));
    panierVide.textContent = 'Votre panier est vide !';
    }
  }
}
createCart()
}
    
cartDisplay();
  
     