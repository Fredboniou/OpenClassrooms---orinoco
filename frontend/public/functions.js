/**************FONCTION COMMUNE A TOUTES LES PAGES*****************/

//Affichage du nombre d'articles en index
function cartIndex() {
    let panierShop = (localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
    let cart = document.getElementById("cart");
    cart.textContent = panierShop.length;
}

/*************FONCTION D'AFFICHAGE DES PRODUITS EN PREMIERE PAGE***************/
function indexDisplay(image, name, id) {
    divRow.innerHTML += 
          `<div class='col-sm-6 col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated'>
            <div class='product'>
              <img src='${image}' alt='ours en peluche' class='img-fluid'>
              <div class='text py-3 px-3'>
                <h3 class='productName'>${name}</h3>
                <p class='bottom-area d-flex px-3'>
                  <a href='produit.html?id=${id}' class='add-to-cart text-center py-2 mr-1'>
                    <span class='see-product'>Voir le produit</span>
                  </a>
                </p>
              </div>
            </div>
          </div>`
};

/************FONCTION D'AFFICHAGE DU PRODUIT CHOISI*************************/
function productDisplay(image, name, price, description) {
    divRow.innerHTML = `
                <div class="col-lg-6 mb-5 ftco-animate fadeInUp ftco-animated" id="divImage">
    			        <img src="${image}" class="img-fluid" alt="Colorlib Template">
                </div>
                <div class="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated" id="divDescription">
					        <div class="row mt-4">
						        <div class="col-md-6">
							        <div class="input-group mb-3">
								        <h4 id="quantity-text">Quantité</h4>
								        <input type="number" name="quantity" class="quantity form-control input-number" id="total" value="1" min="1" max="100">
							        </div>
						        </div> 
						        <div class="col-md-6">
							        <div class="form-group d-flex">
		              			<div class="select-wrap">
	                  			<div class="icon">
                            <span class="ion-ios-arrow-down"></span>
                          </div>
	                  			<select name="selection_couleur" id="choiceColors" class="form-control">
										        <option selected value="">Choisissez votre couleur</option>
	                  			</select>
	                			</div>
		            		  </div>
						        </div>
						        <button id="addToCart" class="btn btn-black py-3 px-5">Ajouter au panier</button>
					        </div>
    			        <h3 class="productName">${name}</h3>
                    <p class="price"><span class="productPrice" id="productPrice">${price / 100} €</span></p>
                    <p class="productDescription">${description}</p>
                </div>
                `
}

/*************FONCTION D'AFFICHAGE DU PANIER***************/
function cartDisplay(product, image, name, colors, price, quantity, total) {
  
    body.innerHTML += 
          `
          <tr class="text-center" id="cell${product}">
            <td class="product-remove">
              <button id="removeBtn${product}" style="width: 14px; height: 20px;">X</button>
            </td>
            <td class="image-product">
              <img width="150" height="150" alt="ours en peluche fabriqué à la main" src="${image}">
            </td>
            <td class="product-name">
              <h3>${name}</h3>
              <h3>${colors}</h3>
            </td>
            <td class="price">${price / 100} €</td>
            <td class="quantity">
              <div class="input-group mb-3">
                <p id="product_quantity" style="margin: auto; color: black;">${quantity}</p>
              </div>
            </td>
            <td id="totalLine">${total / 100} €</td>
          </tr>
          `

          document.body.addEventListener("click", (e) => {
            if(e.target.id == "removeBtn" + product) {
              $("#cell" + product).remove();
              alert("L'article à bien été supprimé");
              panierShop.splice(+ [product], 1);
              localStorage.setItem("panier", JSON.stringify(panierShop));
              console.log(panierShop);
              window.location.reload();
              cartInfo();
            }
          })
        
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
        document.getElementById("adresse").style.backgroundColor = "";
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

