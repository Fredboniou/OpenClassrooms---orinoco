//balises parentes
let body = document.getElementById("body");
let section = document.getElementById("info_panier");
let tableOrder = document.getElementById("panier-recap");
let totalCart = document.getElementById("totalCart");
let totalProduct = 0;
let i = 0;
let quantityChoice = 0;
let panierShop = [];
let linePrice;

//récuperation du panier
let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
/*const urlParams = new URLSearchParams(window.location.search);
let idBears = urlParams.get("panier[i].id");
console.log(idBears);*/



//info selon qu'il y ai quelque chose dans le panier ou non
function cartInfo() {
  if (panier.length == 0 || panier.length == null){
    let emptyCart = document.createElement("p");
    emptyCart.setAttribute("id", "infoEmpty");
    emptyCart.innerHTML = "Votre panier est vide";
    section.prepend(emptyCart)
    document.getElementById("form_1").setAttribute("hidden", "true");
    totalCart.setAttribute("hidden", "true");
  } else {
    let fullCart = document.createElement("p");
    fullCart.setAttribute("id", "infoFull");
    fullCart.innerHTML = "Votre panier : ";
    section.prepend(fullCart);
  }
}
cartInfo();


//récupération des données et création du panier
for (let i = 0; i < panier.length; i++) {
  fetch("http://localhost:3000/api/teddies")
    .then(response => response.json()
      .then(function (productInCart) {
        if (response.ok) {
          let productInCart = panier[i];
          console.log(productInCart)
          let productLine = body.insertRow(-1);
          productLine.setAttribute("class", "text-center");
          productLine.setAttribute("id", "cell" + i);

          let productRemove = productLine.insertCell(0);
          productRemove.setAttribute("class", "product-remove");
          let buttonRemove = document.createElement("button");
          buttonRemove.innerHTML = "X";
          buttonRemove.style.width = "14px";
          buttonRemove.style.height = "20px";
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
          divQuantity.appendChild(quantityChoice);

          let totalLine = productLine.insertCell(5);
          totalLine.setAttribute("id", "totalLine");

          let modifyQuantity = document.getElementById("total");
          modifyQuantity.addEventListener("change", () => {
            alert("Vous avez modifié la quantité d'un article");
            calcul();
            numberArticle();
            totalOrder();
          })


          function calcul() {
            linePrice = (productInCart.price / 100) * quantityChoice.value;
            totalLine.innerHTML = linePrice + " €";
          }
          calcul();

          function numberArticle() {
            let totalNumber = [];
            let number = document.getElementById("number");
            totalNumber += quantityChoice.value;
            number.innerHTML = totalNumber;
            number.style.fontWeight = "bold";
            number.style.fontSize = "20px";
            number.style.textAlign = "center";
            number.style.color = "black";
          }
          numberArticle();

          function totalOrder() {
            let orderPrice = [];
            let totalorder = document.getElementById("totalOrder");
            orderPrice += linePrice;
            totalorder.innerHTML = orderPrice + " €";
            totalorder.style.fontWeight = "bold";
            totalorder.style.textAlign = "center";
            totalorder.style.fontSize = "20px";
          }
          calcul();
          totalOrder();

          //suppression d'un produit
          buttonRemove.addEventListener("click", () => {
            $("#cell" + i).remove();
            alert("L'article à bien été supprimé");
            panier.splice([i], 1);
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log(panier);

            cartInfo();
          })
        }
      }))
}


//Validation formulaire
//Coloration du champ incorrect
function highlight(field, error) {
  if (error) {
    field.style.backgroundColor = "red";
  } else {
    field.style.backgroundColor = "";
  }
}

//Validation formulaire

//Création des regex
let regex = /^[a-zA-Z\é\è\ê\ï\ë\ç\s\'-]+$/;
//la regex accepte les caractères alphabétiques minuscules et majuscules , 
//les espaces et les tirets
let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
let regexAddress = /^[0-9]* ?[a-zA-Z\s,\.]*$/;
//[a-zA-Z\s,\.]* => ensemble quelconque de lettres, espaces, virgules ou points 
//[0-9]* ? => ensemble quelconque de chiffres répété n'importe quel nombre de fois suivi ou non d'un espace

//Création des variables pour vérification des input formulaire
let Name;
let Firstname;
let Mail;
let Address;
let City;

//Coloration du champ incorrect
function highlight(field, error) {
  if (error) {
    field.style.backgroundColor = "red";
  } else {
    field.style.backgroundColor = "";
  }
}

//Vérification du nom
function verifName(event) {
  let field = document.getElementById(event.srcElement.id);
  Name = regex.test(field.value);

  if (!Name) {
    highlight(field, true);
    return false;
  } else {
    highlight(field, false);
    return true;
  }
}

//Vérification du prénom
function verifFirstName(event) {
  let field = document.getElementById(event.srcElement.id);
  Firstname = regex.test(field.value);

  if (!Firstname) {
    highlight(field, true);
    return false;
  } else {
    highlight(field, false);
    return true;
  }
}

//Vérification de l'email
function verifMail(event) {
  let field = document.getElementById(event.srcElement.id);
  Mail = regexMail.test(field.value);

  if (!Mail) {
    highlight(field, true);
    return false;
  } else {
    highlight(field, false);
    return true;
  }
}

//Vérification de l'adresse
function verifAddress(event) {
  let field = document.getElementById(event.srcElement.id);
  Address = regexAddress.test(field.value);

  if (!Address) {
    highlight(field, true);
    return false;
  } else {
    highlight(field, false);
    return true;
  }
}

//Vérification de la ville
function verifCity(event) {
  let field = document.getElementById(event.srcElement.id);
  City = regex.test(field.value);

  if (!City) {
    highlight(field, true);
    return false;
  } else {
    highlight(field, false);
    return true;
  }
}
//Variables qui seront utilisés pour appel des event
let form = document.getElementById("form_1");

//appel des fonctions de vérification sur la perte du focus des input
document.getElementById("nom").addEventListener("blur", verifName); //= verifField(document.getElementById("nom"));
document.getElementById("prenom").addEventListener("blur", verifFirstName);
document.getElementById("email").addEventListener("blur", verifMail);
document.getElementById("adresse").addEventListener("blur", verifAddress);
document.getElementById("ville").addEventListener("blur", verifCity);

//Tout vérifier avant envoi
/*function verifForm(event){
  let nameOk = verifName();
  let firstnameOk = verifFirstName();
  let mailOk = verifMail();
  let addressOk = verifAdress()
  let cityOk = verifCity();

  if(nameOk && firstnameOk && mailOk && adressOk && cityOk){
    return true;
  }else{
    alert("Veuillez remplir tous les champs correctement");
    return false;
  }
}
document.getElementById("commander").addEventListener("click", verifForm);*/


//Envoi du formulaire

const urlApi = "http://localhost:3000/api/teddies/order"

//Variables pour envoi a l'API
let contact; //formulaire
let orderToSend; //formulaire + produits commandés



form.addEventListener("submit", () => {
  preventDefault();

  if (!Name || !Firstname || !Mail || !Address || !City) {
    preventDefault();
    alert("Veuillez remplir tous les champs correctement");
  }
  else if (contact = "") {
    preventDefault();
  }
  else {
    //Création de l'objet contact pour envoi formulaire
    contact = {
      name: Name.value,
      firstName: Firstname.value,
      email: Mail.value,
      address: Address.value,
      city: City.value
    }
    orderToSend = { contact, products } //formulaire + produits commandés

    //paramètres pour requête fetch avec methode POST
    let fetchParams = {
      method: "POST", //plus sécurisée que GET
      body: JSON.stringify(orderToSend),//converti les données en chaine JSON
      headers: { "Content-type": "application/json" }//l'objet est en format JSON
    };
    //requête fetch pour récupération des paramètres de commande
    fetch(urlApi, fetchParams)
      .then(response => response.json())
      .then(function (order) {
        let confirm = {
          completeName: contact.name + " " + contact.firstName,
          price: orderPrice,
          orderId: order.orderId
        }
      })
    //Envoi de la commande au localStorage
    let orderStorage = localStorage.setItem("order", JSON.stringify(confirm));
    window.location = "confirmation.html";
  }
})