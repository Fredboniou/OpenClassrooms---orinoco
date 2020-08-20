let panierShop = JSON.parse(localStorage.getItem("panier"));
let infoPanier = document.getElementById("infoPanier");
let tableOrder = document.getElementById("panier-recap");
console.log(panierShop);

cart = () => {
    //On vérifie si le panier contient un article ou non
    if (panierShop.length > 0){
        //Si le panier contient un article, on commence par supprimer le message html
        infoPanier.remove();

        //Puis on crée le tableau avec attribution des class et id pour le css
        let table = document.createElement("table");
        table.setAttribute("class", "table");
        let thead = document.createElement("thead");
        thead.setAttribute("class", "thead-primary");
        let tableLine = document.createElement("tr");
        tableLine.setAttribute("class", "text-center");
        let removeProduct = document.createElement("th");
        let imageProduct = document.createElement("th");
        let nameProduct = document.createElement("th");
        let priceProduct = document.createElement("th");
        let quantityProduct = document.createElement("th");
        let totalProduct = document.createElement("th");
        let totalLine = document.createElement("tr");
        let totalPay = document.createElement("th");
        let priceToPay = document.createElement("td");

        //On structure et on place le tableau
        tableOrder.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tableLine);
        tableLine.appendChild(removeProduct);
        tableLine.appendChild(imageProduct);
        imageProduct.textContent = "Product";
        tableLine.appendChild(nameProduct);
        nameProduct.textContent = "Name / Color";
        tableLine.appendChild(priceProduct);
        priceProduct.textContent = "Price";
        tableLine.appendChild(quantityProduct);
        quantityProduct.textContent = "Quantity";
        tableLine.appendChild(totalProduct);
        totalProduct.textContent = "Total";

        //Puis on va créer une ligne pour chaque produit du panier
        
        //Initialisation de l'incrémentation de l'id des lignes pour chaque produit
        let i = 0;

        panierShop.forEach((product) => {
            let id = panierShop[i].id;
            fetch("http://localhost:3000/api/teddies/" + id)
                .then(response => response.json()
                .then(function (productInCart) {
                    if (response.ok) {
                        //Création de la ligne produit
                        let productLine = document.createElement("tr");
                        let productRemove = document.createElement("td");
                        let picture = document.createElement("td");                
                        let nameColor = document.createElement("td");
                        let productPrice = document.createElement("td");
                        let productQuantity = document.createElement("td");
                        let totalLine = document.createElement("td");

                        //Création des sous catégories html
                        let buttonRemove = document.createElement("button");
                        let pictureSrc = document.createElement("img");
                        let productName = document.createElement("h3");
                        let productColor = document.createElement("h3");
                        let divQuantity = document.createElement("div");
                        let quantityChoice = document.createElement("input");

                        //Class et id pour bootstrap
                        productLine.setAttribute("class", "text-center");
                        productLine.setAttribute("id", "produit" + i);
                        productRemove.setAttribute("class", "product-remove");
                        picture.setAttribute("class", "image-product");
                        nameColor.setAttribute("class", "product-name");
                        productPrice.setAttribute("class", "price");
                        productQuantity.setAttribute("class", "quantity");
                        totalLine.setAttribute("id", "totalLine");
                        pictureSrc.setAttribute("width", "150");
                        pictureSrc.setAttribute("height", "150");
                        divQuantity.setAttribute("class", "input-group mb-3");
                        quantityChoice.setAttribute("type", "number");
                        quantityChoice.setAttribute("name", "quantity");
                        quantityChoice.setAttribute("class", "quantity form-control input-number");
                        quantityChoice.setAttribute("id", "total")
                        quantityChoice.setAttribute("value", "1");
                        quantityChoice.setAttribute("min", "1");
                        quantityChoice.setAttribute("max", "100");
                        console.log(quantityChoice.value);

                        //Structure du html
                        table.appendChild(productLine);
                        productLine.appendChild(productRemove);
                        productRemove.appendChild(buttonRemove);
                        productLine.appendChild(picture);
                        picture.appendChild(pictureSrc);
                        productLine.appendChild(nameColor);
                        nameColor.appendChild(productName);
                        nameColor.appendChild(productColor);
                        productLine.appendChild(productPrice);
                        productLine.appendChild(productQuantity);
                        productQuantity.appendChild(divQuantity);
                        divQuantity.appendChild(quantityChoice);
                        productLine.appendChild(totalLine);

                        //Contenu et style des lignes
                        //Bouton supprimer
                        buttonRemove.innerHTML = "X";
                        buttonRemove.style.width = "14px";
                        buttonRemove.style.height = "20px";
                        //Image produit
                        pictureSrc.src = productInCart.imageUrl;
                        //Nom et couleur
                        productName.innerHTML = productInCart.name;
                        productColor.innerHTML = panierShop[i].colors;
                        //Prix unitaire
                        productPrice.innerHTML = productInCart.price / 100 + " €";
                        //Prix total de la ligne
                        totalLine.innerHTML = ((productInCart.price / 100) * quantityChoice.value) + " €";

                        //Suppression d'un produit
                        //bind permet de garder l'incrémentation de i
                        buttonRemove.addEventListener("click", supprimerProduit.bind(i));
                        i++;
                    }}))
        })
        
        //Total de la commande
        table.appendChild(totalLine);
        totalLine.appendChild(totalPay);
        totalLine.appendChild(priceToPay);
        totalPay.innerHTML = "Total de votre commande";
        priceToPay.setAttribute("id", "priceToPay");

        //calcul du total
        let sumOrder = 0;
        panierShop.forEach((product) =>{
            sumOrder += (productInCart.price / 100) * quantityChoice.value;
        });
        priceToPay.innerHTML = sumOrder;
    }
}

 //Modification du prix en fonction de la quantité
 let modifyQuantity = document.getElementById("total");
 modifyQuantity.addEventListener("change", () => {
 alert("Vous avez modifié la quantité d'un article");
 totalLine.innerHTML = ((productInCart.price / 100) * quantityChoice.value) + " €";

 })

//Suppression d'un produit
supprimerProduit = (i) =>{
    panierShop.splice(i, 1);
    //On vide le localStorage
    localStorage.clear();
    //On met a jour le localStorage
    localStorage.setItem("panier", JSON.stringify(panierShop));
    //On recalcul le total de la commande en rechargeant la page
    window.location.reload();
}
