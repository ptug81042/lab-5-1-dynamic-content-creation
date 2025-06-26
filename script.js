const nameOfProductItem = document.getElementById('product-name');
const priceOfProductItem = document.getElementById('product-price');
const addProductItemToCartButton = document.getElementById('add-product');
const productShoppingCart = document.getElementById('cart');
const totalPriceOfProducts = document.getElementById('total-price');

let totalPriceOfAllProducts = 0;

// Function to update the total price
function updateTotalPrice(amount) {
  totalPriceOfAllProducts += amount;
  totalPriceOfProducts.textContent = totalPriceOfAllProducts.toFixed(2);
}

// Function to remove an item
function removeProductFromShoppingCart(event) {
  const productItem = event.target.closest('li');
  const productPrice = parseFloat(productItem.dataset.price);
  updateTotalPrice(-productPrice);  // Subtract the product's price when removed
  productItem.remove();
}

// Task 1: Add Products to Shopping Cart
function addProductToShoppingCart() {
  const productName = nameOfProductItem.value.trim();
  const productPrice = parseFloat(priceOfProductItem.value);

  if (!productName || isNaN(productPrice) || productPrice < 0) return;  // Validation

  const listOfProductsInShoppingCart = document.createElement('li');
  listOfProductsInShoppingCart.className = 'cart-item';
  listOfProductsInShoppingCart.dataset.price = productPrice;

  const productDescription = document.createElement('span');
  productDescription.textContent = `${productName} - $${productPrice.toFixed(2)}`;

  const removeProductButton = document.createElement('button');
  removeProductButton.textContent = 'Remove';
  removeProductButton.addEventListener('click', removeProductFromShoppingCart);

  listOfProductsInShoppingCart.appendChild(productDescription);
  listOfProductsInShoppingCart.appendChild(removeProductButton);
  productShoppingCart.appendChild(listOfProductsInShoppingCart);

  updateTotalPrice(productPrice);  // Update total price after adding a product

  nameOfProductItem.value = '';  // Clear input fields
  priceOfProductItem.value = '';
}

addProductItemToCartButton.addEventListener('click', addProductToShoppingCart);