document.addEventListener('DOMContentLoaded', () => {
    // --- Cart Utility Functions ---

    // Function to load the cart from localStorage
    const loadCart = () => {
        const cartJson = localStorage.getItem('axisCart');
        return cartJson ? JSON.parse(cartJson) : [];
    };

    // Function to save the cart to localStorage
    const saveCart = (currentCart) => {
        localStorage.setItem('axisCart', JSON.stringify(currentCart));
    };

    // --- FIX 1: Use querySelector('.cart-count') because it's a CLASS in your HTML ---
    const updateHeaderCartCount = (currentCart) => {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
            // Luxury style: just the number, or (number) if you prefer
            cartCountElement.textContent = totalItems; 
        }
    };
    
    // Initialize
    let cart = loadCart(); 
    updateHeaderCartCount(cart); 

    // --- Add to Cart Button Logic ---
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            // --- FIX 2: Use button.closest('.product-item') to match your HTML class ---
            const productItem = button.closest('.product-item');
            
            // Get data from the product-item container
            const productId = productItem.getAttribute('data-product-id');
            const productName = productItem.getAttribute('data-product-name');
            const productPrice = productItem.getAttribute('data-product-price');
            const productImage = productItem.getAttribute('data-image');
            
            // Get size from the select menu
            const sizeSelect = productItem.querySelector('.product-size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : 'One Size';

            // Check if size is selected
            if (sizeSelect && selectedSize === "") {
                button.textContent = "SELECT SIZE";
                button.style.backgroundColor = "darkred";
                setTimeout(() => {
                    button.textContent = "ADD TO CART";
                    button.style.backgroundColor = "black";
                }, 800);
                return;
            }

            // Check if item already exists
            const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const newItem = {
                    id: productId,
                    name: productName,
                    size: selectedSize,
                    price: productPrice,
                    quantity: 1,
                    image: productImage 
                };
                cart.push(newItem);
            }

            // Save and Update
            saveCart(cart); 
            updateHeaderCartCount(cart); 

            // --- FIX 3: Visual Feedback ---
            button.textContent = `ADDED!`;
            button.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'ADD TO CART';
                button.style.backgroundColor = 'black';
            }, 1000);
        });
    });
});