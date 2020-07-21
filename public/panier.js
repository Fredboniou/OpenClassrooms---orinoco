//balises parentes
let body = document.getElementById('body');
let section = document.getElementById('info_panier');
let totalProduct = 0;
let i = 0;
let quantityChoice = 0;




//récuperation du panier
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);
//récupération de l'id(pour un seul produit)
//let product = panier[i].id;
//console.log(product);
//info selon qu'il y ai quelque chose dans le panier ou non
if(panier.length == 0){
  let emptyCart = document.createElement('p');
  emptyCart.setAttribute("id", "info");
  emptyCart.innerHTML = 'Votre panier est vide';
  section.prepend(emptyCart)
  document.getElementById("form_1").setAttribute("hidden","true");
}else{
  let fullCart = document.createElement('p');
  fullCart.setAttribute("id", "info");
  fullCart.innerHTML = 'Votre panier : ';
  section.prepend(fullCart);
}

//récupération des données et création du panier
for(let i = 0; i < panier.length; i++){
fetch('http://localhost:3000/api/teddies/')
    .then(response => response.json()
    .then(function(productInCart) {
        if(response.ok){
            console.log(panier);
  let productInCart = panier[i];
  console.log(productInCart)
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
  pictureSrc.setAttribute("width", "150");
  pictureSrc.setAttribute("height", "150");
  pictureSrc.src = productInCart.img;
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
  quantityChoice.setAttribute("type", "number");
  quantityChoice.setAttribute("name", "quantity");
  quantityChoice.setAttribute("class", "quantity form-control input-number");
  quantityChoice.setAttribute("id", "total")
  quantityChoice.setAttribute("value", "1");
  quantityChoice.setAttribute("min", "1");
  quantityChoice.setAttribute("max", "100");
  //quantityChoice.setAttribute("onkeyup", "calcul(totalLine)");
  divQuantity.appendChild(quantityChoice);
  console.log(quantityChoice.value)
  
  /*function calcul(totalProduct){  
  let totalLine = productInCart.price// * (quantityChoice.value) / 100 + " €";
  }
  calcul(totalProduct);
  console.log(totalProduct)
  
  let totalLine = productLine.insertCell(5);
  totalLine.setAttribute("class", "total");
  totalLine.innerHTML = (productInCart.price / 100) * quantityChoice.value;
  //calcul(totalLine);
  console.log(totalLine);*/

  let totalLine = productLine.insertcell(5);
  totalLine.setAttribute("id", "totalLine");

  function calcul(){
    alert(linePrice);
    let linePrice = (producInCart.price / 100) * quantityChoice.value;  
    totalLine.innerHTML = linePrice + " €";
  }
  calcul();

  let modifyQuantity = document.getElementById("total");
  modifyQuantity.addEventListener("change", () => { 
    alert("Vous avez modifié la quantité d'un article");
    calcul();
  })
  
  //suppression d'un produit
  buttonRemove.addEventListener("click", () => {
    $("#cell" + i).remove();
    alert("L'article à bien été supprimé");
    panier.splice([i], 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log(panier);
    
    
    cartIndex();
  })
}}))}

//Affichage du nombre d'articles en index
function cartIndex(){
    let cart = document.getElementById('cart');
    cart.textContent = panier.length;
}
cartIndex();

//Validation formulaire
  //Coloration du champ incorrect
  function highlight(field, error){
    if(error){
      field.style.backgroundColor = "red";
    }else{
      field.style.backgroundColor = "";
    }
  }

  //Vérification du nom, prénom et de la ville
  function verifField(event){
    let regex = /^[a-zA-Z\s-]$/; 
    let field = document.getElementById(event.srcElement.id); 
    //la regex accepte les caractères alphabétiques minuscules et majuscules , 
    //les espaces et les tirets
    if(!regex.test(field.value)){
      highlight(field, true);
      return false;
    }else{
      highlight(field, false);
      return true;
    }
  }
  document.getElementById("nom").addEventListener("blur", verifField) //= verifField(document.getElementById("nom"));
  document.getElementById("prenom").addEventListener("blur", verifField);
  document.getElementById("ville").addEventListener("blur", verifField);

  //Vérification de l'email
  function verifMail(event){
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    let field = document.getElementById(event.srcElement.id);
    if(!regex.test(field.value)){
      highlight(field, true);
      return false;
    }else{
      highlight(field, false);
      return true;
    }
  }
  document.getElementById("email").addEventListener("blur", verifMail);

  //Vérification de l'adresse
  function verifAdress(event){
    let regex = /^[0-9]* ?[a-zA-Z\s,\.]*$/;
    let field = document.getElementById(event.srcElement.id);
    //[0-9]* ? => ensemble quelconque de chiffres répété n'importe quel nombre de fois suivi ou non d'un espace
    //[a-zA-Z ,\.]* => ensemble quelconque de lettres, espaces, virgules ou points 
    if(!regex.test(field.value)){
      highlight(field, true);
      return false;
    }else{
      highlight(field, false);
      return true;
    }
  }
  document.getElementById("adresse").addEventListener("blur", verifAdress);

  //Tout vérifier avant envoi
  function verifForm(f){
    let nameOk = verifField(f.nom);
    let firstnameOk = verifField(f.prenom);
    let mailOk = verifMail(f.email);
    let adressOk = verifAdress(f.adresse)
    let cityOk = verifField(f.ville);

    if(nameOk && firstnameOk && mailOk && adressOk && cityOk){
      return true;
    }else{
      alert("Veuillez remplir tous les champs correctement");
      return false;
    }
  }
  document.getElementById("form_1").addEventListener("submit", verifForm);
  console.log();


  
     