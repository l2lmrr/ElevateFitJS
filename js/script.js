// JS for Single Product Detail Image Update
const productImg = document.getElementById("product-img"); // Larger image
const smallImgs = document.getElementsByClassName("small-img"); // List of 4 smaller images

for (let i = 0; i < smallImgs.length; i++) {
    smallImgs[i].onclick = function() {
        productImg.src = smallImgs[i].src;
    };
}

// Initialize cart total and unique product count
let cartTotal = 0;
let uniqueProductCount = 0;

// Set to track unique products added
const addedProducts = new Set();

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

// Function to add an item to the cart
function addToCart(price, productId) {
    price = parseFloat(price);
    if (!isNaN(price)) {
        cartTotal += price;
    } else {
        console.error("Invalid price provided.");
        return;
    }

    if (!addedProducts.has(productId)) {
        addedProducts.add(productId);
        uniqueProductCount++;
    }

    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${cartTotal.toFixed(2)}`;
    } else {
        console.error("Error: Element with ID 'total-price' not found.");
    }

    const productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = uniqueProductCount;
    } else {
        console.error("Error: Element with ID 'product-count' not found.");
    }
}

// Function to view product details
function viewDetails(product) {
    const { name, price, mainImage, images, category } = product;
    const queryString = `?name=${encodeURIComponent(name)}&price=${price}&mainImage=${encodeURIComponent(mainImage)}&images=${encodeURIComponent(images.join(','))}&category=${encodeURIComponent(category)}`;
    window.location.href = `product-detail.html${queryString}`;
}
