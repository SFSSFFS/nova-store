
// NOVA STORE - CHECKOUT SYSTEM

document.addEventListener("DOMContentLoaded", () => {

    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotals = document.getElementById("checkout-totals");
    const checkoutForm = document.getElementById("checkout-form");

    const deliveryCost = {
        standard: 0,
        express: 10
    };

    // DISPLAY ORDER ITEMS
    function renderCheckout() {

        const cart = getCart();

        if (cart.length === 0) {
            checkoutItems.innerHTML = `
                <p>Your cart is empty.</p>
                <a href="shop.html">Continue Shopping</a>
            `;

            checkoutTotals.innerHTML = "";
            checkoutForm.querySelector('button[type="submit"]').disabled = true;

            return;
        }

        checkoutForm.querySelector('button[type="submit"]').disabled = false;

        let itemsHTML = "";

        cart.forEach(item => {

            itemsHTML += `
                <div class="checkout-item">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="checkout-item-info">
                        <h3>${item.name}</h3>

                        <p>Quantity: ${item.quantity}</p>

                        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
                        ${item.color ? `<p>Color: ${item.color}</p>` : ""}
                    </div>

                    <div class="checkout-item-price">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>

                </div>
            `;
        });

        checkoutItems.innerHTML = itemsHTML;

        updateTotals();
    }

    // CALCULATE TOTALS
    function updateTotals() {

        const cart = getCart();

        const subtotal = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const selectedDelivery = document.querySelector(
            'input[name="delivery"]:checked'
        ).value;

        const shipping = deliveryCost[selectedDelivery];

        const grandTotal = subtotal + shipping;

        checkoutTotals.innerHTML = `
            <div class="checkout-total-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>

            <div class="checkout-total-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
            </div>

            <div class="checkout-grand-total">
                <span>Total</span>
                <strong>$${grandTotal.toFixed(2)}</strong>
            </div>
        `;
    }

    // UPDATE TOTAL WHEN DELIVERY CHANGES
    document.querySelectorAll('input[name="delivery"]').forEach(option => {

        option.addEventListener("change", updateTotals);

    });

    // SUBMIT ORDER
    checkoutForm.addEventListener("submit", event => {

        event.preventDefault();

        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;

        const selectedDelivery = document.querySelector(
            'input[name="delivery"]:checked'
        ).value;

        alert(
            "Thank you, " + customerName + "!\n\n" +
            "Your demo order has been placed successfully.\n" +
            "Confirmation email: " + customerEmail + "\n" +
            "Delivery: " + selectedDelivery.toUpperCase()
        );

        // CLEAR CART
        saveCart([]);
        updateCartCount();

        // RETURN TO SHOP
        window.location.href = "shop.html";

    });

    renderCheckout();

});
