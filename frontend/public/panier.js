//création des variables
let body = document.getElementById("body");
let section = document.getElementById("info_panier");
let tableOrder = document.getElementById("panier-recap");
let totalCart = document.getElementById("totalCart");
let orderPrice = null;
let totalNumber = 0;
let number = document.getElementById("number");
let priceToPay = document.getElementById("totalOrder");
let products = [];

//récuperation du panier
let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

//info selon qu'il y ai quelque chose dans le panier ou non
cartInfo();


/***********************Tableau des articles du panier***********************/

//récupération des données et création du panier
for (let i = 0; i < panierShop.length; i++) {
  let id = panierShop[i].id;
  let productInCart = panierShop[i];
  console.log(id);
  fetch("http://localhost:3000/api/teddies/" + id)
    .then(response => response.json()
      .then(function (productInCart) {
        if (response.ok) {
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
          pictureSrc.setAttribute("alt", "ours en peluche fabriqué à la main");
          pictureSrc.src = productInCart.imageUrl;
          picture.appendChild(pictureSrc);

          let nameColor = productLine.insertCell(2);
          nameColor.setAttribute("class", "product-name");
          let productName = document.createElement("h3");
          productName.innerHTML = productInCart.name;
          nameColor.appendChild(productName);
          let productColor = document.createElement("h3");
          productColor.innerHTML = panierShop[i].colors;
          nameColor.appendChild(productColor);

          let productPrice = productLine.insertCell(3);
          productPrice.setAttribute("class", "price");
          productPrice.innerHTML = productInCart.price / 100 + " €";

          let productQuantity = productLine.insertCell(4);
          productQuantity.setAttribute("class", "quantity");
          let divQuantity = document.createElement("div");
          divQuantity.setAttribute("class", "input-group mb-3");
          productQuantity.appendChild(divQuantity);
          let quantityChoice = document.createElement("p");
          quantityChoice.setAttribute("id", "product_quantity");
          quantityChoice.textContent = panierShop[i].productQuantity;
          quantityChoice.style.margin = "auto";
          quantityChoice.style.color = "black";
          divQuantity.appendChild(quantityChoice);

          let totalLine = productLine.insertCell(5);
          totalLine.setAttribute("id", "totalLine");
          totalLine.textContent = panierShop[i].totalProduct / 100 + " €";

          //suppression d'un produit
          buttonRemove.addEventListener("click", () => {
            $("#cell" + i).remove();
            alert("L'article à bien été supprimé");
            panierShop.splice([i], 1);
            localStorage.setItem("panier", JSON.stringify(panierShop));
            console.log(panierShop);
            window.location.reload();
            cartInfo();
          })
        }
      }))
}
for (let j = 0; j < panierShop.length; j++) {
  let total = panierShop[j].totalProduct;
  orderPrice += total;
  let numberOfArticle = parseInt(panierShop[j].productQuantity);
  totalNumber += numberOfArticle;
  products.push(panierShop[j].id); //Envoi de l'id des produits au localStorage
}

number.textContent = totalNumber;
number.style.fontWeight = "bold";
number.style.fontSize = "20px";
number.style.textAlign = "center";
number.style.color = "black";
priceToPay.textContent = orderPrice / 100 + " €";
priceToPay.style.fontWeight = "bold";
priceToPay.style.textAlign = "center";
priceToPay.style.fontSize = "20px";


//Validation formulaire avec coloration des champs incorrects
let lastname = document.getElementById("nom");
let firstname = document.getElementById("prenom");
let email = document.getElementById("email");
let address = document.getElementById("adresse");
let city = document.getElementById("ville");


/*******************Formulaire*******************/

//Création des regex
let regex = /^[a-zA-Z\é\è\ê\ï\ë\ç\s\'-]+$/;
//la regex accepte les caractères alphabétiques minuscules et majuscules , 
//les espaces et les tirets
let regexMail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4})$/;


//appel des fonctions de vérification sur la perte du focus des input (fonctions sur page functions.js)
lastname.addEventListener("blur", verifName);
firstname.addEventListener("blur", verifFirstName);
email.addEventListener("blur", verifMail);
address.addEventListener("blur", verifAddress);
city.addEventListener("blur", verifCity);


//Envoi du formulaire

const urlApi = "http://localhost:3000/api/teddies/order"

//Variables pour envoi a l'API
let contact; //formulaire
let orderToSend; //formulaire + produits commandés



document.getElementById("commander").addEventListener("click", (e) => {
  e.preventDefault(); //la méthode preventDefault empêche la soumission du formulaire si un des input n'est pas correct
  if (!nom || !prenom || !mail || !address.value || !ville) {
    alert("Veuillez remplir tous les champs correctement");
  } else {
    //Création de l'objet contact pour envoi formulaire
    contact = {
      lastName: lastname.value,
      firstName: firstname.value,
      email: email.value,
      address: address.value,
      city: city.value
    }
    console.log(contact);
    console.log(products);

    orderToSend = { contact, products } //formulaire + produits commandés
    console.log(orderToSend);

    //paramètres pour requête fetch avec methode POST
    let fetchParams = {
      method: "POST", //plus sécurisée que GET
      body: JSON.stringify(orderToSend),//converti les données en chaine JSON
      headers: { "Content-type": "application/json" }//l'objet est en format JSON
    };
    alert("Vous allez être redirigé(e) vers la page de confirmation.\nVeuillez noter votre numéro de commande,\nil vous sera demandé pour toute demande de sav.")
    //requête fetch pour récupération des paramètres de commande
    fetch(urlApi, fetchParams)
      .then(response => response.json())
      .then(function (order) { //On crée l'objet confirmation en renvoyant l'objet JSON sous forme d'une chaine de caractère
        let confirmation = {
          completeName: contact.lastName + " " + contact.firstName,
          price: orderPrice,
          orderId: order.orderId
        }
        localStorage.setItem("order", JSON.stringify(confirmation));
        window.location = "./confirmation.html"
      })
  }
})