//balises parentes
let body = document.getElementById('body');
let totalProduct = 0;
let i = 0;
let quantityChoice = 0;


//récuperation du panier
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);

//info selon qu'il y ai quelque chose dans le panier ou non
if(panier === null){
  let emptyCart = document.createElement('p');
  emptyCart.innerHTML = 'Votre panier est vide';
  body.appendChild(emptyCart)
}else{
  let fullCart = document.createElement('p');
  fullCart.innerHTML = 'Votre panier : ';
  body.appendChild(fullCart);
}
console.log(body);

//récupération des données et création du panier
for(let i = 0; i < panier.length; i++){
fetch('http://localhost:3000/api/teddies/')
    .then(response => response.json()
    .then(function(productInCart) {
        if(response.ok){
            console.log(panier);
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
  quantityChoice.setAttribute("type", "number");
  quantityChoice.setAttribute("name", "quantity");
  quantityChoice.setAttribute("class", "quantity form-control input-number");
  quantityChoice.setAttribute("placeholder", "1");
  quantityChoice.setAttribute("min", "1");
  quantityChoice.setAttribute("max", "100");
  quantityChoice.setAttribute("onkeyup", "calcul(totalLine)");
  divQuantity.appendChild(quantityChoice);

  

  function calcul(totalLine){  
  totalProduct = (parseInt(productInCart.price) * parseInt(quantityChoice.value)) / 100 + " €";
  console.log (totalLine);
  }
  let totalLine = productLine.insertCell(5);
  totalLine.setAttribute("class", "total");
  totalLine.innerHTML = totalProduct;
  calcul(totalLine);
  console.log(totalLine);


  

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
      field.backgroundColor = "red";
    }else{
      field.backgroundColor = "";
    }
  }

  //Vérification du nom, prénom et de la ville
  function verifField(field){
    let regex = /^[a-zA-Z\s-]$/;
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
  document.getElementById("nom").onblur = verifField(this);
  console.log();
  document.getElementById("prenom").onblur = verifField(this);
  document.getElementById("ville").onblur = verifField(this);

  //Vérification de l'email
  function verifMail(field){
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    if(!regex.test(field.value)){
      highlight(field, true);
      return false;
    }else{
      highlight(field, false);
      return true;
    }
  }
  document.getElementById("email").onblur = verifMail(this);

  //Vérification de l'adresse
  function verifAdress(field){
    let regex = /^[0-9]* ?[a-zA-Z\s,\.]*$/;
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
  document.getElementById("adresse").onblur = verifAdress(this);

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
  document.getElementById("form_1").onsubmit = verifForm(this);
  console.log();


  
     