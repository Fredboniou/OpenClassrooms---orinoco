//recupération élément html 
let textConfirm = document.getElementById("textConfirm");

//récupération du localStorage avec la commande converti en objet js
let confirmation = JSON.parse(localStorage.getItem("order"));

//construction de la page de confirmation
let confirmOrder = document.createElement("p");
confirmOrder.innerHTML = "Merci pour votre commande. Cette dernière a bien été prise en compte.";
confirmOrder.style.fontSize = "20px";
confirmOrder.style.color = "black";

let totalorder = document.createElement("p");
totalorder.innerHTML = "Le total de votre commande s'élève à : " + confirmation.price / 100 + " €.";
totalorder.style.fontSize = "20px";
totalorder.style.color = "black";

let identification = document.createElement("p");
identification.innerHTML = "Votre numéro de commande est le suivant : " + confirmation.orderId + ".";
identification.style.fontSize = "20px";
identification.style.color = "black";

let returnHome = document.createElement("input");
returnHome.setAttribute("type", "button")
returnHome.setAttribute("value", "Retour à la page d'accueil");
returnHome.setAttribute("id", "home");

returnHome.addEventListener("click", () => {
    localStorage.clear();
    window.location = "./index.html"
})

textConfirm.appendChild(confirmOrder);
textConfirm.appendChild(totalorder);
textConfirm.appendChild(identification);
textConfirm.appendChild(returnHome);

