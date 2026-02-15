document.addEventListener('DOMContentLoaded', () => {
    // Getting the items from our HTML page
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const checkoutButton = document.querySelector('.checkout-btn');

    // Helper function to get the cart data from the browser storage
    const loadCart = () => {
        const cartJson = localStorage.getItem('axisCart');
        return cartJson ? JSON.parse(cartJson) : [];
    };

    // Helper function to save any changes back to storage
    const saveCart = (currentCart) => {
        localStorage.setItem('axisCart', JSON.stringify(currentCart));
    };

    // This part calculates all the money
    const calculateTotal = (cart) => {
        // We use parseFloat to make sure the price is a number with decimals
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + (price * item.quantity);
        }, 0);
        
        // Show the total next to "Subtotal:"
        cartSubtotalElement.textContent = `EURO ${subtotal.toFixed(2)}`;
        return subtotal;
    };

    // This function draws the items on the screen
    const renderCart = () => {
        const cart = loadCart(); 
        cartItemsContainer.innerHTML = ''; // Clear the container first

        // If the cart is empty, show a message and hide the checkout button
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Your bag is empty.</p>';
            checkoutButton.style.display = 'none'; // Hide checkout if empty
            cartSubtotalElement.textContent = 'EURO 0.00';
            return;
        }

        checkoutButton.style.display = 'inline-block'; // Show checkout if there are items

        // Loop through the cart and create the HTML for each item
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            // Calculating price for just this row
            const price = parseFloat(item.price) || 0;
            const itemTotal = (price * item.quantity).toFixed(2);

            // Inside your cart.forEach(item => { ... }) loop:
itemElement.innerHTML = `
    <div class="item-info">
        <img src="${item.image}" alt="${item.name}" style="width: 80px;">
        <div>
            <p><strong>${item.name}</strong></p>
            <p>Size: ${item.size}</p>
            <p>Price: EURO ${price.toFixed(2)}</p>
        </div>
    </div>
    <div class="item-controls">
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
        <p>Total: EURO ${itemTotal}</p>
    </div>
`;
            cartItemsContainer.appendChild(itemElement);
        });

        calculateTotal(cart);
        setupButtons(); // Set up the plus/minus buttons after drawing them
    };

    // This handles the plus and minus button clicks
    // This handles the plus and minus button clicks
    const setupButtons = () => {
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // IMPORTANT: We only need the ID now because it already contains the size
                const uniqueId = e.target.dataset.id;
                let cart = loadCart();
                
                // Find the item using ONLY the unique ID
                const item = cart.find(i => i.id === uniqueId);

                if (item) {
                    if (e.target.classList.contains('plus')) {
                        item.quantity++; 
                    } else {
                        item.quantity--; 
                        if (item.quantity < 1) {
                            // Filter out the item by its unique ID
                            cart = cart.filter(i => i.id !== uniqueId);
                        }
                    }
                }

                saveCart(cart); 
                renderCart(); // Refresh the numbers
            });
        });
    };
    
        // Initial render
        renderCart();
    });