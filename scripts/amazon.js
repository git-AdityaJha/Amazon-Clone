import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import {formatCurrency} from "./utils/money.js"

// array of products is in product.js file from where all the object of product data are loaded and here in this file an html is created for each one of them.
let productsHtml = "";

products.forEach((product) => {
  productsHtml += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart">
      Add to Cart
    </button>
  </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;


//------- Updating the cart quantity on the cart icon -------------
document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity();



document.querySelectorAll(".js-add-to-cart").forEach((button, index) => {
  let timeOutId; // This is called closure property. Which states that
  // if a function has access to a value/variable, it will always
  // have access to that value/variable.
  // So, here a copy of timeOutId is created and kept inside the
  // function forever.
  button.addEventListener("click", () => {
    addToCart(index);


    //------- Updating the cart quantity on the cart icon -------------
    document.querySelector(".js-cart-quantity").innerHTML = calculateCartQuantity();


    // Adding the message "Added" above add to cart button :
    const addedSelector = `.js-added-to-cart-${products[index].id}`;
    const addedElement = document.querySelector(addedSelector);
    addedElement.classList.add("added-to-cart-message");


    // to erase the message "added" after 1 second :
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      addedElement.classList.remove("added-to-cart-message");
    }, 1500);
  });
});
