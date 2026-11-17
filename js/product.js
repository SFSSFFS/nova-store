
// GET PRODUCT ID FROM URL
const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get("id"));

// FIND THE SELECTED PRODUCT
const selectedProduct = products.find(
    product => product.id === productId
);

// GET PRODUCT DETAILS CONTAINER
const productDetails = document.getElementById("product-details");

// DISPLAY PRODUCT
function displayProduct() {

    if (!selectedProduct) {
        productDetails.innerHTML = `
            <div class="product-not-found">
                <h2>Product Not Found</h2>
                <p>Sorry, this product does not exist.</p>
                <a href="shop.html">Return to Shop</a>
            </div>
        `;
        return;
    }

    productDetails.innerHTML = `
        <div class="product-gallery">
            <img 
                src="${selectedProduct.image}" 
                alt="${selectedProduct.name}"
                class="product-main-image"
            >
        </div>

        <div class="product-info">

            <p class="product-category">
                ${selectedProduct.category}
            </p>

            <h1>${selectedProduct.name}</h1>

            <p class="product-price">
                $${selectedProduct.price}
            </p>

            <p class="product-description">
                ${selectedProduct.description}
            </p>

           
${["women", "men"].includes(selectedProduct.category.toLowerCase()) ? `
   


    <div class="product-option">
        <label for="product-size">Select Size</label>

        <select id="product-size">
            <option value="">Choose a size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
        </select>
    </div>

` : ""}

${selectedProduct.category.toLowerCase() === "accessories" ? `
    <div class="product-option">
        <label for="product-color">Select Color</label>

        <select id="product-color">
            <option value="">Choose a color</option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
        </select>
    </div>
` : ""}

            <div class="product-option">
                <label for="product-quantity">Quantity</label>


                <select id="product-quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

          
<button class="add-to-cart-btn" id="add-to-cart-btn">
    Add to Cart
</button>


            <div class="product-extra">
                <p>Complimentary shipping on orders over $150.</p>
                <p>Designed for timeless elegance.</p>
            </div>

        </div>
    `;
}

// RUN FUNCTION
displayProduct();

// ADD PRODUCT TO CART BUTTON

const addToCartButton = document.getElementById("add-to-cart-btn");

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {

        const sizeElement = document.getElementById("product-size");
        const colorElement = document.getElementById("product-color");
        const quantityElement = document.getElementById("product-quantity");

        const size = sizeElement ? sizeElement.value : "";
        const color = colorElement ? colorElement.value : "";
        const quantity = Number(quantityElement.value);

        if (sizeElement && !size) {
            alert("Please select a size.");
            return;
        }

        if (colorElement && !color) {
            alert("Please select a color.");
            return;
        }

        addToCart(selectedProduct, size, color, quantity);

        updateCartCount();
    });
}
