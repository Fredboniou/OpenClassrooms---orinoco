/* Création du lien avec la page HTML (div class = "row" id="row")*/

let divRow = document.getElementById("row");

/* Récupération des données de l'API via fetch */

fetch("http://localhost:3000/api/teddies/")
  .then(response => response.json()
    .then(bear => {
      if (response.ok) {
        for (let bears of bear) {
          indexDisplay(bears.imageUrl, bears.name, bears._id);
        }
      } else {
        console.error("retour du serveur : ", response.status);
      }
    }))



//On défini le panier et on le converti en objet JS avec JSON.parse
let panierShop = JSON.parse(localStorage.getItem("panier"));

//Affichage du nombre d'articles en index
cartIndex();
