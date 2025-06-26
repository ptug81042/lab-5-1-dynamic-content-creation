# Lab 5.1: Dynamic Content Creation

## Reflection Questions:
1. How did you dynamically create and append new elements to the DOM?  
   I used JavaScript's `document.createElement` to make new elements like `<li>`, `<span>`, `<input>`, and `<button>`. After setting their properties and event listeners, I appended them to the cart using `appendChild`.

2. What steps did you take to ensure accurate updates to the total price?  
   I kept a running total in a variable and updated it whenever a product was added, removed, or its quantity changed. The `updateTotalPrice` function was called with the correct amount to add or subtract, and the displayed total was updated accordingly.

3. How did you handle invalid input for product name or price?  
   Before adding a product, I checked if the name was empty or if the price was not a valid, non-negative number. If the input was invalid, I showed an alert and did not add the product to the cart.

4. What challenges did you face when implementing the remove functionality?  
   The main challenge was making sure the total price updated correctly when removing a product, especially if the quantity was more than one. I solved this by storing the price and quantity as data attributes on each cart item and using them to adjust the total price in the `updateTotalPrice` function.