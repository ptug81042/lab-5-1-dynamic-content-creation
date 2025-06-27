# Lab 5.1: Dynamic Content Creation

## Reflection Questions:
1. How did you dynamically create and append new elements to the DOM?  
   I used `document.createElement` to build each cart entry, including a timestamp, quantity input, subtotal, and a custom remove button. Each element was configured with its own properties and event listeners, then added to the cart list using `appendChild`. This modular approach made it easy to expand the cart's features.

2. What steps did you take to ensure accurate updates to the total price?  
   I maintained a `grandTotal` variable and updated it whenever an item's quantity changed, was added, or removed. The subtotal for each item is also recalculated live. The `refreshGrandTotal` function ensures the displayed total always matches the cart's state.

3. How did you handle invalid input for product name or price?  
   Before adding an item, I checked if the name was blank or if the price was not a valid, non-negative number. If either check failed, an alert was shown and the item was not added. This prevents accidental or bad data from entering the cart.

4. What challenges did you face when implementing the remove functionality?  
   The biggest challenge was ensuring the total updated correctly when removing items with different quantities. By storing both price and quantity as data attributes on each cart entry, I could always calculate the correct amount to subtract from the total. Adding a timestamp for each entry also helped me debug and verify the cart's behavior.