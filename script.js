const itemNameInput = document.getElementById('product-name');
const itemPriceInput = document.getElementById('product-price');
const addToCartBtn = document.getElementById('add-product');
const shoppingCartList = document.getElementById('cart');
const grandTotalDisplay = document.getElementById('total-price');

let grandTotal = 0;

// Update the displayed grand total
function refreshGrandTotal(amount) {
  grandTotal += amount;
  grandTotalDisplay.textContent = grandTotal.toFixed(2);
}

// Remove an item from the cart
function handleRemoveFromCart(event) {
  const cartEntry = event.target.closest('li');
  const entryPrice = parseFloat(cartEntry.dataset.price);
  const entryQty = parseInt(cartEntry.dataset.qty || 1);
  refreshGrandTotal(-entryPrice * entryQty);
  cartEntry.remove();
}

// Add a new item to the cart with timestamp and quantity
function handleAddToCart() {
  const itemName = itemNameInput.value.trim();
  const itemPrice = parseFloat(itemPriceInput.value);

  if (!itemName) {
    alert('Item name cannot be blank. Please enter a name.');
    return;
  }
  if (isNaN(itemPrice) || itemPrice < 0) {
    alert('Enter a valid, non-negative price.');
    return;
  }

  const cartEntry = document.createElement('li');
  cartEntry.className = 'cart-item';
  cartEntry.dataset.price = itemPrice;
  cartEntry.dataset.qty = 1;

  const desc = document.createElement('span');
  desc.textContent = `${itemName} | $${itemPrice.toFixed(2)}`;

  // Timestamp
  const timestamp = document.createElement('span');
  timestamp.className = 'cart-timestamp';
  const now = new Date();
  timestamp.textContent = `Added: ${now.toLocaleTimeString()}`;

  // Quantity input
  const qtyInput = document.createElement('input');
  qtyInput.type = 'number';
  qtyInput.value = 1;
  qtyInput.min = 1;
  qtyInput.style.width = '40px';
  qtyInput.style.marginLeft = '10px';
  qtyInput.addEventListener('input', function () {
    const prevQty = parseInt(cartEntry.dataset.qty || 1);
    const newQty = parseInt(qtyInput.value) || 1;
    cartEntry.dataset.qty = newQty;
    refreshGrandTotal((newQty - prevQty) * itemPrice);
    itemTotal.textContent = `Subtotal: $${(itemPrice * newQty).toFixed(2)}`;
  });

  // Subtotal display
  const itemTotal = document.createElement('span');
  itemTotal.className = 'product-total-price';
  itemTotal.textContent = `Subtotal: $${(itemPrice * 1).toFixed(2)}`;
  itemTotal.style.marginLeft = '10px';

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete Item';
  removeBtn.addEventListener('click', handleRemoveFromCart);

  cartEntry.appendChild(desc);
  cartEntry.appendChild(timestamp);
  cartEntry.appendChild(qtyInput);
  cartEntry.appendChild(itemTotal);
  cartEntry.appendChild(removeBtn);

  shoppingCartList.appendChild(cartEntry);

  refreshGrandTotal(itemPrice);

  itemNameInput.value = '';
  itemPriceInput.value = '';
}

addToCartBtn.addEventListener('click', handleAddToCart);
