// Initialize cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} has been added to your cart.`);
}

// Function to remove item from cart
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh the cart display
    updateCartCount();
    alert(`${title} has been removed from your cart.`);
}

// Function to update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.menu .fa-shopping-cart');
    cartCountElement.textContent = cart.length; // Update cart icon count
}

// Function to handle cart icon click (redirect to cart.html)
document.querySelector('.menu li a i').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Example usage of the buy buttons on the product cards
const buyButtons = document.querySelectorAll('.btn');

buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = button.closest('.card');
        const item = {
            title: card.querySelector('.title').textContent,
            price: card.querySelector('.price').textContent.replace('$', ''), // Ensure price is a number
            image: card.querySelector('img').src
        };
        addToCart(item);
    });
});

// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Clear the container before adding items
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        totalPriceElement.textContent = '$0';
        checkoutBtn.disabled = true; // Disable button if cart is empty
        return;
    }

    let total = 0;

    cartItems.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h2>${item.title}</h2>
                    <div class="price">$${item.price}</div>
                    <button class="remove-btn" onclick="removeFromCart('${item.title}')">Remove</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;

        // Calculate the total price
        total += parseFloat(item.price);
    });

    // Update the total price display
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = total === 0; // Enable/disable checkout button based on total
}

// Call the function to update the cart count on page load
updateCartCount();

// If needed, call displayCartItems() when the cart page is loaded
// (this could be in cart.html script or a shared script)
document.addEventListener('DOMContentLoaded', displayCartItems);
