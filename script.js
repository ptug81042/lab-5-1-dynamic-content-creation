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
  const productItem = event.target.closest('li');  // Get the list item containing the product
  const productPrice = parseFloat(productItem.dataset.price);  // Extract price from data attribute

  // Update the total price by subtracting the product's price
  updateTotalPrice(productPrice);

  // Remove the product item from the cart
  productItem.remove();
}

// Task 1: Add Products to Shopping Cart
function addProductToShoppingCart() {
 // Get the product name and price from the input fields
  const productName = nameOfProductItem.value.trim();  // Remove leading/trailing spaces from the name
  const productPrice = parseFloat(priceOfProductItem.value);  // Convert the price to a number

  // Validation: Check if the name is empty or if the price is invalid (NaN or negative)
  if (!productName || isNaN(productPrice) || productPrice < 0) return;  // If invalid, exit the function

  // Create a new list item for the cart
  const listOfProductsInShoppingCart = document.createElement('li');
  listOfProductsInShoppingCart.className = 'cart-item';  // Assign a class to the item for styling
  listOfProductsInShoppingCart.dataset.price = productPrice;  // Store the product price in the dataset for later use

  // Create a span element to display the product name and price
  const productDescription = document.createElement('span');
  productDescription.textContent = `${productName} - $${productPrice.toFixed(2)}`;  // Format the price to two decimal places

  // Create a button to remove the product from the cart
  const removeProductButton = document.createElement('button');
  removeProductButton.textContent = 'Remove';  // Button text
  removeProductButton.addEventListener('click', removeProductFromShoppingCart);  // Attach the event listener to remove the product

  // Append the description and remove button to the list item
  listOfProductsInShoppingCart.appendChild(productDescription);
  listOfProductsInShoppingCart.appendChild(removeProductButton);

  // Append the list item to the shopping cart
  productShoppingCart.appendChild(listOfProductsInShoppingCart);

  // Update the total price to include the new product
  updateTotalPrice(productPrice);

  // Clear the input fields for the next product
  nameOfProductItem.value = '';  
  priceOfProductItem.value = ''; 
}

// Event listener for the "Add Product" button
addProductItemToCartButton.addEventListener('click', addProductToShoppingCart);