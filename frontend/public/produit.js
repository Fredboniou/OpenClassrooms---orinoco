/* Création des variables */
let divRow = document.getElementById("row");
let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

/* obtention des paramètres URL */
const urlParams = new URLSearchParams(window.location.search);//renvoie un objet contenant des infos concernant l'url en récupérant la partie qui suit le '?'
let idBears = urlParams.get("id");
console.log(idBears);

//Affichage du nombre d'articles en index
cartIndex();

/* Récupération des données pour chaque produit */
fetch("http://localhost:3000/api/teddies/" + idBears)
    .then(response => response.json()
        .then(function (bearData) {
            if (response.ok) {
                console.log(bearData);

                productDisplay(bearData.imageUrl, bearData.name, bearData.price, bearData.description);

                for (let i = 0; i < bearData.colors.length; i++) {
                    let choiceColors = document.getElementById("choiceColors");
                    let productColors = document.createElement("option")
                    let bearColors = bearData.colors[i];
                    productColors.setAttribute("value", bearColors);
                    productColors.innerHTML = bearColors;
                    choiceColors.appendChild(productColors);
                }

                let quantityChoice = document.getElementById("total");
                
                let productPrice = document.getElementById("productPrice");
                

                quantityChoice.addEventListener("change", () => {
                    if (confirm("Vous avez modifié la quantité d'un article")) {
                        productPrice.textContent = bearData.price / 100 * quantityChoice.value + " €";
                    } else {
                        productPrice.textContent = bearData.price / 100 + " €";
                        quantityChoice.value = 1;
                    }
                })

                //Ajout au panier

                let addToCart = document.getElementById("addToCart");

                addToCart.addEventListener("click", () => {
                    //choix de la couleur obligatoire
                    if (choiceColors.value == "") {
                        alert("Veuillez choisir une couleur")
                        return false;
                    } else {
                        panierShop.push({
                            id: idBears, productQuantity: quantityChoice.value, colors: choiceColors.value,
                            totalProduct: bearData.price * quantityChoice.value
                        })
                        localStorage.setItem("panier", JSON.stringify(panierShop));
                        alert("Cet(ces) article(s) vient(viennent) d\'être ajouté(s) à votre panier");
                        cartIndex();
                        console.log(panierShop);
                    }
                })
            }
        }
        ))

cartIndex();














