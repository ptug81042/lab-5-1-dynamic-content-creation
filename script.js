const nameOfProductItem = document.getElementById('product-name');
const priceOfProductItem = document.getElementById('product-price');
const addProductItemToCartButton = document.getElementById('add-product');
const productShoppingCart = document.getElementById('cart');
const totalPriceOfProducts = document.getElementById('total-price');

let totalPriceOfAllProducts = 0;

// Function to update the total price
function updateTotalPrice(amount) {
  totalPriceOfAllProducts += amount;  // Add or subtract the amount to/from the total
  totalPriceOfProducts.textContent = totalPriceOfAllProducts.toFixed(2);  // Update the displayed total price
}

// Function to remove an item from the shopping cart
function removeProductFromShoppingCart(event) {
  const productItem = event.target.closest('li');  // Get the list item containing the product
  const productPrice = parseFloat(productItem.dataset.price);  // Extract price from data attribute

  // Update the total price by subtracting the product's price
  updateTotalPrice(-productPrice);

  // Remove the product item from the cart
  productItem.remove();
}

// Task 1: Add Products to Shopping Cart (with basic validation)
function addProductToShoppingCart() {
  // Get the product name and price from the input fields
  const productName = nameOfProductItem.value.trim();  // Remove leading/trailing spaces from the name
  const productPrice = parseFloat(priceOfProductItem.value);  // Convert the price to a number

  // Edge Case Validation: Check if the name is empty or if the price is invalid (NaN or negative)
  if (!productName || isNaN(productPrice) || productPrice < 0) {
    alert('Please provide a valid product name and price.');
    return;  // Exit the function if validation fails
  }

  // Create a new list item for the cart
  const listOfProductsInShoppingCart = document.createElement('li');
  listOfProductsInShoppingCart.className = 'cart-item';  // Assign a class to the item for styling
  listOfProductsInShoppingCart.dataset.price = productPrice;  // Store the product price in the dataset for later use

  // Create a span element to display the product name and price
  const productDescription = document.createElement('span');
  productDescription.textContent = `${productName} - $${productPrice.toFixed(2)}`;  // Format the price to two decimal places

  // Create a button to remove the product from the cart
  const removeProductButton = document.createElement('button');
  removeProductButton.textContent = 'Remove Product';  // Button text
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

// Task 2: Edge Cases - Add Product with Validation
function addProductToShoppingCartWithValidation() {
  // Get the product name and price from the input fields
  const productName = nameOfProductItem.value.trim();  // Remove leading/trailing spaces from the name
  const productPrice = parseFloat(priceOfProductItem.value);  // Convert the price to a number

  // Edge Case Validation: Check if the name is empty
  if (!productName) {
    alert('Product name cannot be empty. Please enter a name.');
    return;  // Exit the function if name is empty
  }

  // Edge Case Validation: Check if the price is a valid number and non-negative
  if (isNaN(productPrice) || productPrice < 0) {
    alert('Please enter a valid, non-negative price.');
    return;  // Exit the function if price is invalid or negative
  }

  // If all validations pass, proceed to add the product to the cart

  const shoppingCartListOfProducts = document.createElement('li');
  shoppingCartListOfProducts.className = 'cart-item';
  shoppingCartListOfProducts.dataset.price = productPrice;  // Store the product price in the dataset

  // Create a span element to display the product name and price
  const productDescription = document.createElement('span');
  productDescription.textContent = `${productName} - $${productPrice.toFixed(2)}`;  // Format the price to two decimal places

  // Create a button to remove the product from the cart
  const removeProductButton = document.createElement('button');
  removeProductButton.textContent = 'Remove Product';
  removeProductButton.addEventListener('click', removeProductFromShoppingCart);

  // Append the product description and the remove button to the cart item
  shoppingCartListOfProducts.appendChild(productDescription);
  shoppingCartListOfProducts.appendChild(removeProductButton);

  // Append the list item to the shopping cart
  productShoppingCart.appendChild(shoppingCartListOfProducts);

  // Update the total price to include the new product
  updateTotalPrice(productPrice);

  // Clear the input fields for the next product
  nameOfProductItem.value = '';
  priceOfProductItem.value = '';
}

// Event listener for the "Add Product" button
addProductItemToCartButton.addEventListener('click', addProductToShoppingCart);
addProductItemToCartButton.addEventListener('click', addProductToShoppingCartWithValidation);