//recupération élément html 
let textConfirm = document.getElementById("textConfirm");

//récupération du localStorage avec la commande converti en objet js
let order = JSON.parse(localStorage.getItem("order"));

//construction de la page de confirmation
let confirmOrder = createElement("p");
confirmOrder.innerHTML = "Merci pour votre commande. Cette dernière a bien été prise en compte.";

let totalorder = createElement("p");
totalorder.innerHTML = "Le total de votre commande s'élève à :" + order.price + " €.";

let identification = createElement("p");
identification.innerHTML = "Votre numéro de commande est le suivant :" + order.orderID + " .";

let returnHome = createElement("button");
returnHome.innerHtml = "Retour à la page d'accueil";
returnHome.setAttribute("id", "home");
returnHome.setAttribute("href", "index.html")

returnHome.addEventListener("click", () => {
    localStorage.clear();
})

textConfirm.appendChild(confirmOrder);
textConfirm.appendChild(totalorder);
textConfirm.appendChild(identification);
textConfirm.appendChild(returnHome);

