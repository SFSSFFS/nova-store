
// NOVA STORE - CART PAGE

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");

    // GET CART ITEMS
    function renderCart() {
        const cart = getCart();

        // CHECK IF CART IS EMPTY
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything yet.</p>
                    <a href="shop.html" class="checkout-btn">
                        Continue Shopping
                    </a>
                </div>
            `;
            return;
        }

        // DISPLAY CART ITEMS
        let cartHTML = `
            <div class="cart-items">
        `;

        cart.forEach((item, index) => {
            cartHTML += `
                <div class="cart-item">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="cart-item-image"
                    >

                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>

                        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
                        ${item.color ? `<p>Color: ${item.color}</p>` : ""}

                        <div class="cart-item-actions">
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    min="1"
                                    value="${item.quantity}"
                                    class="cart-quantity"
                                    data-index="${index}"
                                >
                            </label>

                            <button
                                class="remove-item"
                                data-index="${index}"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                    <div class="cart-item-total">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            `;
        });

        cartHTML += `</div>`;

        // CALCULATE TOTAL
        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        cartHTML += `
            <div class="cart-summary">
                <h3>Order Summary</h3>

                <div class="cart-total">
                    <span>Total</span>
                    <strong>$${total.toFixed(2)}</strong>
                </div>

                <a href="checkout.html" class="checkout-btn">
                    Proceed to Checkout
                </a>
            </div>
        `;

        cartContainer.innerHTML = cartHTML;

        // REMOVE ITEMS
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);
                const updatedCart = getCart();

                updatedCart.splice(index, 1);
                saveCart(updatedCart);

                renderCart();
                updateCartCount();
            });
        });

        // UPDATE QUANTITIES
        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("change", () => {
                const index = Number(input.dataset.index);
                const updatedCart = getCart();
                const quantity = Math.max(1, Number(input.value) || 1);

                updatedCart[index].quantity = quantity;
                saveCart(updatedCart);

                renderCart();
                updateCartCount();
            });
        });
    }

    renderCart();
});
