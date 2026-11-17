
// =================================
// NOVA STORE — SHOP FUNCTIONALITY
// =================================

const productGrid = document.getElementById("shop-product-grid");
const searchInput = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-products");
const resultsText = document.querySelector(".shop-results");

// Display products
function displayProducts(items) {

    if (items.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        resultsText.textContent = "No products found";
        return;
    }

    resultsText.textContent = `Showing ${items.length} products`;

    productGrid.innerHTML = items.map(product => `
        <article class="product-card">

            <a href="product.html?id=${product.id}">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </a>

            <div class="product-info">
                <h3>
                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>

                <p>${product.category}</p>

                <span>$${product.price.toFixed(2)}</span>
            </div>

        </article>
    `).join("");
}


// Search, filter and sort
function updateProducts() {

    let filteredProducts = [...products];

    // Search
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }

    // Category filter
    const selectedCategory = categoryFilter.value;

    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    // Sorting
    const sortValue = sortSelect.value;

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    else if (sortValue === "name") {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    displayProducts(filteredProducts);
}


// Event listeners
searchInput.addEventListener("input", updateProducts);

categoryFilter.addEventListener("change", updateProducts);

sortSelect.addEventListener("change", updateProducts);


// Initial display
displayProducts(products);
