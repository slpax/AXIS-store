document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the elements from the HTML using their IDs
    const itemList = document.getElementById('checkout-item-list');
    const subtotalElement = document.getElementById('cart-subtotal'); // Fixed ID
    const grandTotalElement = document.getElementById('checkout-grand-total');
    const paymentForm = document.getElementById('payment-form');
    
    const SHIPPING_COST = 10.00;

    // 2. Load the cart data from the browser storage
    const loadCart = () => {
        const cartJson = localStorage.getItem('axisCart');
        return cartJson ? JSON.parse(cartJson) : [];
    };

    // 3. This function does the math for the total price
    const calculateTotals = (cart) => {
        // We use parseFloat to make sure the price is treated as a number
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + (price * item.quantity);
        }, 0);

        const grandTotal = subtotal + SHIPPING_COST;

        // Update the text on the screen
        if (subtotalElement) {
            subtotalElement.textContent = `EURO ${subtotal.toFixed(2)}`;
        }
        if (grandTotalElement) {
            grandTotalElement.textContent = `EURO ${grandTotal.toFixed(2)}`;
        }
    };

    // 4. This shows the items in the "Order Summary" box
    const renderSummary = () => {
        const cart = loadCart();
        if (!itemList) return;
        
        itemList.innerHTML = ''; 

        if (cart.length === 0) {
            itemList.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        // Loop through each item and add it to the list
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.marginBottom = '10px';
            
            const price = parseFloat(item.price) || 0;
            itemDiv.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>EURO ${(price * item.quantity).toFixed(2)}</span>
            `;
            itemList.appendChild(itemDiv);
        });

        calculateTotals(cart);
    };

    // 5. Handle the form when the user clicks "Complete Purchase"
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the page from reloading
            
            const payButton = document.getElementById('place-order-btn');
            payButton.textContent = "PROCESSING...";
            payButton.disabled = true;

            // Wait a little bit then go to the success page
            setTimeout(() => {
                localStorage.removeItem('axisCart'); // Empty the cart
                window.location.href = 'thankyou.html'; 
            }, 2000);
        });
    }

    renderSummary(); // Run the script
});