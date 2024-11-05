// Existing code from your JavaScript
// JS for Single Product Detail Image Update
const productImg = document.getElementById("product-img"); // Larger image
const smallImgs = document.getElementsByClassName("small-img"); // List of 4 smaller images

for (let i = 0; i < smallImgs.length; i++) {
    smallImgs[i].onclick = function() {
        productImg.src = smallImgs[i].src;
    };
}

// Initialize cart total and unique product count from sessionStorage
let cartTotal = parseFloat(sessionStorage.getItem('cartTotal')) || 0;
let uniqueProductCount = parseInt(sessionStorage.getItem('uniqueProductCount')) || 0;

// Set to track unique products added
const addedProducts = new Set(JSON.parse(sessionStorage.getItem('addedProducts')) || []);

// Update the cart display on page load
updateCartDisplay();

// Function to show overlay on hover
function showOverlay(element) {
    const overlay = element.querySelector(".overlay");
    if (overlay) {
        overlay.style.display = "flex";
    }
}

// Function to hide overlay on mouse leave
function hideOverlay(element) {
    const overlay = element.querySelector(".overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}

// Function to add an item to the cart with all details, including image URL
function addToCart(price, productId, quantity = 1, size = "", imageUrl = "", productName = "") {
    price = parseFloat(price);
    quantity = parseInt(quantity);

    if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
        const totalPrice = price * quantity;
        cartTotal += totalPrice;

        // Define the product object to store in sessionStorage
        const product = {
            id: productId,
            name: productName,
            image: imageUrl,
            unitPrice: price,
            quantity: quantity,
            size: size
        };

        sessionStorage.setItem(`cart_${productId}`, JSON.stringify(product));

        if (!addedProducts.has(productId)) {
            addedProducts.add(productId);
            uniqueProductCount++;
        }

        sessionStorage.setItem('cartTotal', cartTotal);
        sessionStorage.setItem('uniqueProductCount', uniqueProductCount);
        sessionStorage.setItem('addedProducts', JSON.stringify(Array.from(addedProducts)));

        updateCartDisplay();
    } else {
        console.error("Invalid price or quantity provided.");
    }
}

// Function to update the cart display in the header
function updateCartDisplay() {
    const totalPriceElement = document.getElementById("total-price");
    const cartTotal = parseFloat(sessionStorage.getItem('cartTotal')) || 0;
    const uniqueProductCount = JSON.parse(sessionStorage.getItem('addedProducts') || '[]').length;

    if (totalPriceElement) {
        totalPriceElement.textContent = `$${cartTotal.toFixed(2)}`;
    }

    const productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = uniqueProductCount;
    }
}

// Function to view product details
function viewDetails(product) {
    const { name, price, mainImage, images, category } = product;
    const queryString = `?name=${encodeURIComponent(name)}&price=${price}&mainImage=${encodeURIComponent(mainImage)}&images=${encodeURIComponent(images.join(','))}&category=${encodeURIComponent(category)}`;
    window.location.href = `product-detail.html${queryString}`;
}

// Parse URL parameters and update product details
document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();

    if (params.name) {
        document.getElementById('product-name').textContent = params.name;
        document.getElementById('product-price').textContent = `$${params.price}`;
        document.getElementById('product-img').src = params.mainImage;
        document.getElementById('product-category').textContent = `Home / ${params.category}`;

        const images = params.images.split(',');
        const smallImgElements = document.getElementsByClassName('small-img');
        for (let i = 0; i < smallImgElements.length; i++) {
            if (images[i]) {
                smallImgElements[i].src = images[i];
            }
        }

        document.getElementById('add-to-cart-btn').onclick = function() {
            const sizeSelect = document.getElementById('product-size');
            const selectedSize = sizeSelect.value;
            const quantity = parseInt(document.getElementById('product-quantity').value, 10);

            if (!selectedSize) {
                alert("Please select a size before adding to cart.");
                return;
            }

            addToCart(params.price, params.name, quantity, selectedSize, params.mainImage, params.name);
        };
    }

    const cartIcon = document.querySelector(".fa-shopping-cart");
    if (cartIcon) {
        cartIcon.onclick = function() {
            window.location.href = "Test1.html";
        };
    }

    if (window.location.pathname.endsWith('Test1.html')) {
        populateCartItems();
    }
});

// Function to get query parameters from the URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let match;
    while (match = regex.exec(queryString)) {
        params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    }
    return params;
}

// Function to populate cart items in Test1.html and calculate totals
function populateCartItems() {
    const cartItemsContainer = document.querySelector('tbody');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ''; // Clear any placeholder items
    const addedProductsArray = JSON.parse(sessionStorage.getItem('addedProducts')) || [];
    let subtotal = 0;

    addedProductsArray.forEach(productId => {
        const product = JSON.parse(sessionStorage.getItem(`cart_${productId}`));
        if (product) {
            const productRow = document.createElement('tr');

            const productCell = document.createElement('td');
            productCell.innerHTML = `
                <div class="product-details">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <span>${product.name}</span>
                        <span>Price: $${product.unitPrice.toFixed(2)}</span>
                        <button class="remove-btn" onclick="removeFromCart('${product.id}')">Remove</button>
                    </div>
                </div>
            `;

            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = 'quantity-input';
            quantityInput.value = product.quantity;
            quantityInput.min = '1';
            quantityInput.onchange = () => updateQuantity(product.id, quantityInput.value);
            quantityCell.appendChild(quantityInput);

            const subtotalCell = document.createElement('td');
            const itemSubtotal = product.unitPrice * product.quantity;
            subtotalCell.textContent = `$${itemSubtotal.toFixed(2)}`;

            subtotal += itemSubtotal;

            productRow.appendChild(productCell);
            productRow.appendChild(quantityCell);
            productRow.appendChild(subtotalCell);

            cartItemsContainer.appendChild(productRow);
        }
    });

    updateTotals(subtotal);
}

// Function to update item quantity and recalculate totals and cart display
function updateQuantity(productId, newQuantity) {
    const product = JSON.parse(sessionStorage.getItem(`cart_${productId}`));
    if (product && newQuantity > 0) {
        product.quantity = parseInt(newQuantity);
        sessionStorage.setItem(`cart_${productId}`, JSON.stringify(product));

        // Recalculate totals and update display
        populateCartItems();
        updateCartDisplay();
    }
}

// Function to update subtotal, tax, and total, and refresh the cart total display
function updateTotals(subtotal) {
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    document.querySelector('.cart-totals p:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.cart-totals p:nth-child(2) span:last-child').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.cart-totals p:nth-child(3) span:last-child').textContent = `$${total.toFixed(2)}`;

    sessionStorage.setItem('cartTotal', total);

    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Function to remove a product from the cart and update totals
function removeFromCart(productId) {
    sessionStorage.removeItem(`cart_${productId}`);
    const addedProductsArray = JSON.parse(sessionStorage.getItem('addedProducts')) || [];
    const index = addedProductsArray.indexOf(productId);
    if (index > -1) addedProductsArray.splice(index, 1);

    sessionStorage.setItem('addedProducts', JSON.stringify(addedProductsArray));
    populateCartItems();
    updateCartDisplay();
}

// testing 
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on Test1.html
    if (window.location.pathname.endsWith('Test1.html')) {
        const placeOrderButton = document.querySelector('.place-order-btn');
        
        placeOrderButton.addEventListener('click', () => {
            const cartItems = JSON.parse(sessionStorage.getItem('addedProducts')) || [];
            const productData = cartItems.map(productId => {
                const product = JSON.parse(sessionStorage.getItem(`cart_${productId}`));
                return {
                    name: product.name,
                    quantity: product.quantity,
                    unitPrice: product.unitPrice,
                    totalPrice: product.unitPrice * product.quantity
                };
            });

            // Calculate total for all items (subtotal) and set in sessionStorage
            const subtotal = productData.reduce((sum, item) => sum + item.totalPrice, 0);
            const tax = subtotal * 0.1; // Assuming 10% tax rate
            const total = subtotal + tax;

            // Store data in sessionStorage for test.html to access
            sessionStorage.setItem('orderSummary', JSON.stringify({
                products: productData,
                subtotal: subtotal.toFixed(2),
                total: total.toFixed(2)
            }));

            // Redirect to test.html
            window.location.href = 'test.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on test.html
    if (window.location.pathname.endsWith('test.html')) {
        const orderSummary = JSON.parse(sessionStorage.getItem('orderSummary'));

        if (orderSummary) {
            const productContainer = document.querySelector('.order-item span');
            const priceElement = document.querySelector('.price');
            const subtotalElement = document.querySelector('.subtotal-price');

            // Assuming single product for this example, adjust if multiple
            const firstProduct = orderSummary.products[0];
            productContainer.textContent = `${firstProduct.name} x ${firstProduct.quantity} (Qty)`;
            priceElement.textContent = `$${firstProduct.totalPrice.toFixed(2)}`;
            subtotalElement.textContent = `$${orderSummary.total}`;
        }
    }
});


//filter 

// Assuming products array exists and has objects with price and category fields
const products = [
    { id: 'product-1', name: 'Red Printed T-shirt', price: 60.00, category: 'T-shirt', image: 'images/product-1.jpg', images: ['images/gallery-1.jpg'] },
    { id: 'product-2', name: 'HRX Running Shoes', price: 41.00, category: 'Shoes', image: 'images/product-2.jpg', images: ['images/gallery-2.jpg'] },
    { id: 'product-3', name: 'WEWOK Joggers', price: 18.00, category: 'Pants', image: 'images/product-3.jpg', images: ['images/gallery-3.jpg'] },
    // Add more products as needed...
];

const categoryFilter = document.getElementById("category-filter");
const priceRangeFilter = document.getElementById("price-range-filter");
const priceRangeValue = document.getElementById("price-range-value");

// Display initial price
priceRangeFilter.addEventListener("input", function() {
    priceRangeValue.textContent = `$${priceRangeFilter.value}`;
});

// Function to filter products by category and price
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const maxPrice = parseFloat(priceRangeFilter.value); // Convert price to number

    return products.filter(product => {
        const isCategoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
        const isPriceMatch = parseFloat(product.price) <= maxPrice; // Ensure product price is a number
        return isCategoryMatch && isPriceMatch;
    });
}

// Event listeners for filter updates
categoryFilter.addEventListener("change", updateDisplay);
priceRangeFilter.addEventListener("input", updateDisplay);

function updateDisplay() {
    const filteredProducts = filterProducts();
    console.log("Filtered products:", filteredProducts); // Check filtered output
    displayProducts(filteredProducts);
}

// Function to display filtered products
function displayProducts(filteredProducts) {
    const productsContainer = document.querySelector(".row.row1");
    productsContainer.innerHTML = ''; // Clear current display

    filteredProducts.forEach(product => {
        productsContainer.innerHTML += `
            <div class="col-4">
                <div class="image-container" onmouseover="showOverlay(this)" onmouseout="hideOverlay(this)">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="overlay">
                        <button class="icon-btn" onclick="addToCart(${product.price}, '${product.id}', 1, '', '${product.image}', '${product.name}')">
                            <i class="fa fa-shopping-cart"></i>
                        </button>
                        <button class="icon-btn" onclick="viewDetails({
                            name: '${product.name}', 
                            price: ${product.price}, 
                            mainImage: '${product.image}', 
                            images: ${JSON.stringify(product.images)},
                            category: '${product.category}'
                        })">
                            <i class="fa fa-info-circle"></i>
                        </button>
                    </div>
                </div>
                <h4>${product.name}</h4>
                <div class="rating">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;
    });
}

// Initial display
displayProducts(products);
