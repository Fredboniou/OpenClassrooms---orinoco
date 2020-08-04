//Affichage du nombre d'articles en index
function cartIndex() {
    let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

    let cart = document.getElementById("cart");
    cart.textContent = panierShop.length;
}

//calcul du total d'un produit en fonction de la quantité
function calcul(price, quantity, total) {
    linePrice = (price / 100) * quantity;
    total.innerHTML = linePrice + " €";
}