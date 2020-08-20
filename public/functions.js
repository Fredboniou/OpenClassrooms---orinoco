/**************FONCTION COMMUNE A TOUTES LES PAGES*****************/

//Affichage du nombre d'articles en index
function cartIndex() {
    let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
    let totalNumber = 0;
    for(let i = 0; i < panierShop.length; i++){
        let numberOfArticle = parseInt(panierShop[i].productQuantity);
        totalNumber += numberOfArticle;
    }
    let cart = document.getElementById("cart");
    cart.textContent = totalNumber;
}

/**************FONCTION PANIER / FORMULAIRE**************/

/*              PANIER              */

//info selon qu'il y ai quelque chose dans le panier ou non
function cartInfo() {
    if (panierShop.length == 0 || panierShop.length === null) {
        let emptyCart = document.createElement("p");
        emptyCart.setAttribute("id", "infoEmpty");
        emptyCart.innerHTML = "Votre panier est vide";
        section.prepend(emptyCart)
        document.getElementById("panier-recap").setAttribute("hidden", "true");
        document.getElementById("form_1").setAttribute("hidden", "true");
        document.getElementById("totalPanier").setAttribute("hidden", "true");
        totalCart.setAttribute("hidden", "true");
    } else {
        let fullCart = document.createElement("p");
        fullCart.setAttribute("id", "infoFull");
        fullCart.innerHTML = "Votre panier : ";
        section.prepend(fullCart);
    }
}

//calcul du prix d'un produit en fonction de la quantité
/*function calcul(price, quantity) {
    let linePrice = (price / 100) * quantity;
    totalLine.innerHTML = linePrice + " €";
    return linePrice;
}

//calcul du nombre total d'article
function numberArticle(tNumber, quantity, total) {
    tNumber += quantity;
    total.innerHTML = tNumber;
    total.style.fontWeight = "bold";
    total.style.fontSize = "20px";
    total.style.textAlign = "center";
    total.style.color = "black";
}

//calcul du total de la commande
function totalOrder(tPrice) {
    let totalorder = document.getElementById("totalOrder");
    totalorder.innerHTML = tPrice + " €";
    totalorder.style.fontWeight = "bold";
    totalorder.style.textAlign = "center";
    totalorder.style.fontSize = "20px";
}*/

/*         FORMULAIRE         */

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

