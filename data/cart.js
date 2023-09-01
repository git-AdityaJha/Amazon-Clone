import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// function to add selected products to cart :
export function addToCart(index) {
  let matchingIdItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === products[index].id) {
      matchingIdItem = cartItem;
    }
  });

  // Grabbing the <select> element from html with the help of product id
  // and here grabbing through add to cart index from products.js(array of objects)
  const jsQuantitySelector = `.js-quantity-selector-${products[index].id}`;
  const productQuantity = Number(
    document.querySelector(jsQuantitySelector).value
  );
    
  if (matchingIdItem) {
    matchingIdItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: products[index].id,
      quantity: productQuantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){
  let totalCartQuantity = 0;

  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });

  if(totalCartQuantity == 0){
    totalCartQuantity = '';
  }

  return totalCartQuantity;
}