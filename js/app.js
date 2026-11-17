
// NOVA STORE - CART SYSTEM

// GET CART FROM LOCAL STORAGE
function getCart() {
    return JSON.parse(localStorage.getItem("novaCart")) || [];
}

// SAVE CART TO LOCAL STORAGE
function saveCart(cart) {
    localStorage.setItem("novaCart", JSON.stringify(cart));
}

// ADD PRODUCT TO CART
function addToCart(product, size = "", color = "", quantity = 1) {

    const cart = getCart();

    const existingItem = cart.find(item =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            quantity: quantity
        });
    }

    saveCart(cart);

    alert("Product added to your cart!");
}

// UPDATE CART COUNT
function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll(".cart-link").forEach(link => {
        link.textContent = `Cart (${totalItems})`;
    });
}

// UPDATE CART COUNT WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", updateCartCount);
