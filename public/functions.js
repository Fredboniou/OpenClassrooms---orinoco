/**************FONCTION COMMUNE A TOUTES LES PAGES*****************/

//Affichage du nombre d'articles en index
function cartIndex() {
    let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
    let cart = document.getElementById("cart");
    cart.textContent = panierShop.length;
}

/**************FONCTION PANIER / FORMULAIRE**************/

/*              PANIER              */

//info selon qu'il y ai quelque chose dans le panier ou non
function cartInfo() {
    if (panierShop.length == 0 || panierShop.length == null) {
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

/*         FORMULAIRE         */

//Coloration du champ incorrect
function highlight(field, error) {
    if (error) {
        field.style.backgroundColor = "red";
    } else {
        field.style.backgroundColor = "";
    }
}

//Création des variables pour vérification des input formulaire
let nom;
let prenom;
let mail;
let adresse;
let ville;

//Vérification du nom, prenom et ville
function verifName(event) {
    let field = document.getElementById(event.srcElement.id);
    nom = regex.test(field.value);

    if (!nom || nom == "") {
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
    prenom = regex.test(field.value);

    if (!prenom || prenom == "") {
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
    mail = regexMail.test(field.value);

    if (!mail || mail == "") {
        highlight(field, true);
        return false;
    } else {
        highlight(field, false);
        return true;
    }
}

//Vérification de l'adresse
function verifAddress(event) {
    if(document.getElementById("adresse").value !== ""){
        return true;
    }else{
        document.getElementById("adresse").style.backgroundColor = "red";
    }
}

//Vérification de la ville
function verifCity(event) {
    let field = document.getElementById(event.srcElement.id);
    ville = regex.test(field.value);

    if (!ville || ville == "") {
        highlight(field, true);
        return false;
    } else {
        highlight(field, false);
        return true;
    }
}

