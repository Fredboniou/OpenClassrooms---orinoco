/* Création du lien avec la page HTML (div class = "row" id="row")*/

let divRow = document.getElementById("row");

/* Récupération des données de l'API via fetch */

fetch("http://localhost:3000/api/teddies/")
  .then(response => response.json()
    .then(bear => {
      if (response.ok) {
        for (let bears of bear) {

          /* Création de la structure HTML */
          let divProduct = document.createElement("div"); /* div bootstrap */
          let product = document.createElement("div"); /* div contenant le global de chaque teddy */
          let productImage = document.createElement("img"); /* (image) */
          let productElement = document.createElement("div"); /* (div contenant le nom et le lien) */
          let productName = document.createElement("h3"); /* (nom du teddy) */
          let productText = document.createElement("p"); /* (emplacement du lien vers page produit) */
          let productDetail = document.createElement("a"); /* (lien vers page produit) */
          let seeProduct = document.createElement("span"); /* (texte "voir le produit") */

          /* Ajout des attributs aux balises HTML que l'on vient de créer */
          divProduct.setAttribute("class", "col-sm-6 col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated"); /* div bootstrap */
          product.setAttribute("class", "product"); /* div contenant le global de chaque teddy */
          productImage.setAttribute("class", "img-fluid"); /* (image) */
          productImage.setAttribute("src", bears.imageUrl); /* (image) */
          productImage.setAttribute("alt", "ours en peluche fabriqué à la main"); /* (image) */
          productElement.setAttribute("class", "text py-3 px-3"); /* (div contenant le nom et le lien) */
          productName.setAttribute("class", "productName"); /* (nom du teddy) */
          productText.setAttribute("class", "bottom-area d-flex px-3"); /* (emplacement du lien vers le produit) */
          productDetail.setAttribute("href", "produit.html?id=" + bears._id); /* (lien vers page produit) */
          productDetail.setAttribute("class", "add-to-cart text-center py-2 mr-1"); /* (lien vers page produit) */
          seeProduct.setAttribute("class", "see-product"); /* (texte 'voir le produit') */

          /* Hierarchisation des éléments HTML */
          divRow.appendChild(divProduct); /* div bootstrap */
          divProduct.appendChild(product); /* div contenant le global de chaque teddy */
          product.appendChild(productImage); /* (image) */
          product.appendChild(productElement); /* (div contenant le nom et le lien) */
          productElement.appendChild(productName); /* (nom du teddy) */
          productElement.appendChild(productText); /* (emplacement du lien vers page produit) */
          productText.appendChild(productDetail); /* (lien vers page produit) */
          productDetail.appendChild(seeProduct); /* (texte 'voir le produit) */

          /* Contenu des balises HTML */
          productName.textContent = bears.name;
          seeProduct.textContent = "voir le produit";
          }
      } else {
        console.error("retour du serveur : ", response.status);
      }
    }))



//On défini le panier et on le converti en objet JS avec JSON.parse
let panier = JSON.parse(localStorage.getItem("panier"));

//Affichage du nombre d'articles en index
function cartIndex() {
  let panierShop = [];

  //On vérifie si l'objet de stockage que l'on veut créer existe déjà ou non
  if (localStorage.getItem("panier")) {
    panierShop = localStorage.getItem("panier");
  } else {
    localStorage.setItem("panier", JSON.stringify(panierShop));
  }
  let cart = document.getElementById("cart");
  cart.textContent = panier.length;
}
cartIndex();
