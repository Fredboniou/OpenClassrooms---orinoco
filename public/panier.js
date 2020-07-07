//balises parentes
let body = document.getElementById('body');
let totalLine = null;
let products = [];


//récuperation du panier
let panier = JSON.parse(localStorage.getItem('panier'));

//info selon qu'il y ai quelque chose dans le panier ou non
if(panier === null){
  let emptyCart = document.createElement('p');
  emptyCart.innerHTML = 'Votre panier set vide';
  body.appendChild(emptyCart)
}else{
  let fullCart = document.createElement('p');
  fullCart.innerHTML = 'Votre panier : ';
  body.appendChild(fullCart);
}

//Création du panier
for(let i = 0; i < panier.length; i++){
  let productInCart = panier[i];
  let productLine = body.insertRow(-1);
  productLine.setAttribute("class", "text-center");
  productLine.setAttribute("id", "cell" + i);

  let productRemove = productLine.insertCell(0);
  productRemove.setAttribute("class", "product-remove");
  let buttonRemove = document.createElement("button");
  buttonRemove.innerHTML = "X";
  productRemove.appendChild(buttonRemove);

  let picture = productLine.insertCell(1);
  picture.setAttribute("class", "image-product");
  let pictureSrc = document.createElement("img");
  pictureSrc.src = productInCart.imageUrl;
  picture.appendChild(pictureSrc);
  
  let nameColor = productLine.insertCell(2);
  nameColor.setAttribute("class", "product-name");
  let productName = document.createElement("h3");
  productName.innerHTML = productInCart.name;
  nameColor.appendChild(productName);
  let productColor = document.createElement("h3");
  productColor.innerHTML = productInCart.color;
  nameColor.appendChild(productColor);

  let productPrice = productLine.insertCell(3);
  productPrice.setAttribute("class", "price");
  productPrice.innerHTML = productInCart.price / 100 + " €";

  let productQuantity = productLine.insertCell(4);
  productQuantity.setAttribute("class", "quantity");
  let divQuantity = document.createElement("div");
  divQuantity.setAttribute("class", "input-group mb-3");
  productQuantity.appendChild(divQuantity);
  let quantityChoice = document.createElement("input");
  quantityChoice.setAttribute("type", "text");
  quantityChoice.setAttribute("name", "quantity");
  quantityChoice.setAttribute("class", "quantity form-control input-number");
  quantityChoice.setAttribute("value", "1");
  quantityChoice.setAttribute("min", "1");

  let totalLine = productLine.insertCell(5);
  totalLine.setAttribute("class", "total");
  totalLine = (productInCart.price / 100) * quantityChoice.value;


  //Dans products, on envoie les id des produits qui sont dans le panier et on les stock
  //dans le storage
  products = [...products, productInCart.id];
  let productStored = localStorage.setItem("products", JSON.stringify(productInCart));
  console.log(products);

  //suppression d'un produit
  buttonRemove.addEventListener("click", () =>{
    $("#cell" + i).remove();
    alert("L'article à bien été supprimé");
    
    //suppression du produit dans [products] 
    products.splice([i], 1);
    
    //mise à jour du storage
    productStored = JSON.stringify(localStorage.setItem("products"))
  })
}

//Affichage du nombre d'articles en index
function cartIndex(){
    let cart = document.getElementById('cart');
    cart.textContent = panier.length;
}
cartIndex();



  
     