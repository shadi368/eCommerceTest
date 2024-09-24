// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items on the page
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items before rendering

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        document.getElementById('checkout-btn').disabled = true;
        updateTotal();
        return;
    }

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-details">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" class="item-quantity" min="1" data-name="${item.name}">
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Enable the checkout button if the cart has items
    document.getElementById('checkout-btn').disabled = false;
    updateTotal();
}

// Function to calculate and update the total price
function updateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    // Update the total in the DOM
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

// Event listener for quantity change
document.body.addEventListener('input', function (e) {
    if (e.target.classList.contains('item-quantity')) {
        const itemName = e.target.getAttribute('data-name');
        const newQuantity = parseInt(e.target.value);
        const item = cartItems.find(item => item.name === itemName);
        if (item) {
            item.quantity = newQuantity > 0 ? newQuantity : 1; // Ensure quantity is at least 1
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
            updateTotal(); // Update total whenever quantity changes
        }
    }
});

// Function to remove item from the cart
function removeFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
    renderCart(); // Re-render cart
}

// Initial render of cart items
renderCart();
