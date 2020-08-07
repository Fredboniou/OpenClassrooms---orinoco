//création des variables
let body = document.getElementById("body");
let section = document.getElementById("info_panier");
let tableOrder = document.getElementById("panier-recap");
let totalCart = document.getElementById("totalCart");
let totalProduct = 0;
let i;
let quantityChoice = 0;
//let panierShop = [];
let linePrice;
let orderPrice = [];
let totalorder = document.getElementById("totalOrder");
let totalNumber = [];
let number = document.getElementById("number");

//récuperation du panier
let panierShop = JSON.parse(localStorage.getItem("panier"));
console.log(panierShop);

//info selon qu'il y ai quelque chose dans le panier ou non
cartInfo();

//récupération des données et création du panier
for (let i = 0; i < panierShop.length; i++) {
  //const urlParams = new URLSearchParams(window.location.search);
  //let id = urlParams.get(panierShop[i].id);
  
  let id = panierShop[i].id;
  console.log(id)
  fetch("http://localhost:3000/api/teddies/" /*, id*/ /*+ id*/)
    .then(response => response.json()
      .then(function (productInCart) {
        if (response.ok) {
          let productInCart = panierShop[i];
          console.log(productInCart.id)
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
          //pictureSrc.src = productInCart.img;
          pictureSrc.src = id.imageUrl;
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
            calcul(productInCart.price, quantityChoice.value, totalLine);
            numberArticle(totalNumber, quantityChoice.value, number);
            totalOrder(orderPrice, linePrice, totalorder);
          })

          numberArticle(totalNumber, quantityChoice.value, number);
          calcul(productInCart.price, quantityChoice.value, totalLine);
          totalOrder(orderPrice, linePrice, totalorder);

          //suppression d'un produit
          buttonRemove.addEventListener("click", () => {
            $("#cell" + i).remove();
            alert("L'article à bien été supprimé");
            panier.splice([i], 1);
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log(panier);

            cartInfo();
            numberArticle(totalNumber, quantityChoice.value, number);
            totalOrder(orderPrice, linePrice, totalorder);
          })
        }
      }))
}


//Validation formulaire avec coloration des champs incorrects

//Création des regex
let regex = /^[a-zA-Z\é\è\ê\ï\ë\ç\s\'-]+$/;
//la regex accepte les caractères alphabétiques minuscules et majuscules , 
//les espaces et les tirets
let regexMail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4})$/;
let regexAddress = /^[0-9]* ?[a-zA-Z\s,\.]*$/;
//[a-zA-Z\s,\.]* => ensemble quelconque de lettres, espaces, virgules ou points 
//[0-9]* ? => ensemble quelconque de chiffres répété n'importe quel nombre de fois suivi ou non d'un espace

//Création des variables pour vérification des input formulaire
let Name;
let Firstname;
let Mail;
let Address;
let City;

//Variables qui seront utilisés pour appel des event
let form = document.getElementById("form_1");

//appel des fonctions de vérification sur la perte du focus des input
document.getElementById("nom").addEventListener("blur", verifName); //= verifField(document.getElementById("nom"));
document.getElementById("prenom").addEventListener("blur", verifFirstName);
document.getElementById("email").addEventListener("blur", verifMail);
document.getElementById("adresse").addEventListener("blur", verifAddress);
document.getElementById("ville").addEventListener("blur", verifCity);


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