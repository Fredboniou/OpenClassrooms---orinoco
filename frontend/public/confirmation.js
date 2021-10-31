//recupération élément html 
let textConfirm = document.getElementById("textConfirm");

//récupération du localStorage avec la commande converti en objet js
let confirmation = JSON.parse(localStorage.getItem("order"));

confirmOrder(confirmation.price, confirmation.orderId)

let returnHome = document.getElementById("home");

returnHome.addEventListener("click", () => {
    localStorage.clear();
    window.location = "./index.html"
});



