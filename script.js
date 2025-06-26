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
  const productQuantity = parseInt(productItem.dataset.quantity || 1);  // Extract quantity from data attribute

  // Update the total price by subtracting the product's price * quantity
  updateTotalPrice(-productPrice * productQuantity);

  // Remove the product item from the cart
  productItem.remove();
}

// Function to add a product to the shopping cart with quantity support
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
  listOfProductsInShoppingCart.dataset.quantity = 1;  // Set initial quantity to 1

  // Create a span element to display the product name and price
  const productDescription = document.createElement('span');
  productDescription.textContent = `${productName} - $${productPrice.toFixed(2)}`;  // Format the price to two decimal places

  // Create a span element to display the total price for this product (price * quantity)
  const productTotalPrice = document.createElement('span');
  productTotalPrice.className = 'product-total-price';
  productTotalPrice.textContent = `Total: $${(productPrice * 1).toFixed(2)}`;  // Initially set total as price * 1

  // Create an input field for quantity selection
  const quantityInputField = document.createElement('input');
  quantityInputField.type = 'number';
  quantityInputField.value = 1;  // Default quantity is 1
  quantityInputField.min = 1;  // Minimum quantity is 1
  quantityInputField.style.width = '40px';  // Set the width of the input field
  quantityInputField.style.marginLeft = '10px';  // Add space between the price and quantity input

  // Event listener for changing the quantity (triggered without pressing Enter)
  quantityInputField.addEventListener('input', function () {
    const updatedQuantity = parseInt(quantityInputField.value) || 1; // Get the updated quantity (default to 1 if invalid)
    const previousQuantity = parseInt(listOfProductsInShoppingCart.dataset.quantity || 1); // Get the previous quantity (default to 1 if not set)

    // Update the quantity in the data attribute
    listOfProductsInShoppingCart.dataset.quantity = updatedQuantity;

    // Update the total price for this product (product price * updated quantity)
    const updatedTotalPrice = updatedQuantity * productPrice;
    productTotalPrice.textContent = `Total: $${updatedTotalPrice.toFixed(2)}`;

    // Update the total price in the shopping cart
    updateTotalPrice((updatedQuantity - previousQuantity) * productPrice);
  });

  // Create a button to remove the product from the cart
  const removeProductButton = document.createElement('button');
  removeProductButton.textContent = 'Remove Product';  // Button text
  removeProductButton.addEventListener('click', removeProductFromShoppingCart);  // Attach the event listener to remove the product

  // Append the description, quantity input, total price, and remove button to the list item
  listOfProductsInShoppingCart.appendChild(productDescription);
  listOfProductsInShoppingCart.appendChild(quantityInputField);
  listOfProductsInShoppingCart.appendChild(productTotalPrice);
  listOfProductsInShoppingCart.appendChild(removeProductButton);

  // Append the list item to the shopping cart
  productShoppingCart.appendChild(listOfProductsInShoppingCart);

  // Update the total price to include the new product
  updateTotalPrice(productPrice);

  // Clear the input fields for the next product
  nameOfProductItem.value = '';
  priceOfProductItem.value = '';
}

// Event listener for adding a product to the cart
addProductItemToCartButton.addEventListener('click', addProductToShoppingCart);
