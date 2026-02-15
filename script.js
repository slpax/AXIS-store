document.addEventListener('DOMContentLoaded', () => {
    // --- Cart Utility Functions ---

    const loadCart = () => {
        const cartJson = localStorage.getItem('axisCart');
        return cartJson ? JSON.parse(cartJson) : [];
    };

    const saveCart = (currentCart) => {
        localStorage.setItem('axisCart', JSON.stringify(currentCart));
    };

    const updateHeaderCartCount = (currentCart) => {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems; 
        }
    };
    
    let cart = loadCart(); 
    updateHeaderCartCount(cart); 

    // --- Add to Cart Button Logic ---
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            
            const baseProductId = productItem.getAttribute('data-product-id');
            const productName = productItem.getAttribute('data-product-name');
            const productPrice = productItem.getAttribute('data-product-price');
            const productImage = productItem.getAttribute('data-image');
            
            const sizeSelect = productItem.querySelector('.product-size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : 'One Size';

            // Check if size is selected
            if (sizeSelect && (selectedSize === "" || selectedSize === "Select Size")) {
                button.textContent = "SELECT SIZE";
                button.style.backgroundColor = "darkred";
                setTimeout(() => {
                    button.textContent = "ADD TO CART";
                    button.style.backgroundColor = "black";
                }, 800);
                return;
            }

            // --- FIX: Generate a UNIQUE ID for this specific combination ---
            // This prevents different hoodies from merging into one cart row
            const uniqueCartId = `${baseProductId}-${selectedSize}`;

            const existingItem = cart.find(item => item.id === uniqueCartId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const newItem = {
                    id: uniqueCartId, // Use the new unique ID
                    name: productName,
                    size: selectedSize,
                    price: productPrice,
                    quantity: 1,
                    image: productImage 
                };
                cart.push(newItem);
            }

            saveCart(cart); 
            updateHeaderCartCount(cart); 

            // Visual Feedback
            button.textContent = `ADDED!`;
            button.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'ADD TO CART';
                button.style.backgroundColor = 'black';
            }, 1000);
        });
    });
});

const newItem = {
    id: uniqueCartId, // This MUST be the combined ID (e.g., 'black-mens-01-M')
    name: productName,
    size: selectedSize,
    price: productPrice,
    quantity: 1,
    image: productImage 
};