/* Web Application for an e-commerce cart system.

User must login and store name in Cookies so that it persists across sessions. Greet user if already logged in.
Notify user about cookie consent displaying a message showing that the page is using cached product images or styles to speed up loading.
Static resources must be cached and user notified
 */
//Let user login and store name in Cookies so that it persists across sessions
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
function checkLogin() {
  const user = getCookie("username");
  if (user != "") {
    alert("Welcome back, " + user + "!");
  } else {
    const username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 30);
    }
  }
}
//Notify user about cookie consent displaying a message showing that the page is using cached product images or styles to speed up loading
window.addEventListener("load", () => {
  alert(
    "This page uses cached product images and styles to speed up loading. Thank you for your understanding!"
  );
});

//Product catalog array
const products = [
  { id: 1, name: "Colour Pencils", Image: "colourpencils.png", price: 59.99 },
  { id: 2, name: "Eraser", Image: "eraser.png", price: 24.99 },
  { id: 3, name: "Pen", Image: "pen.png", price: 19.99 },
  { id: 4, name: "Pencil", Image: "pencil.png", price: 12.99 },
];
//Function to apply font preference from session storage
function applyFontPreference(fontValue) {
  document.documentElement.style.setProperty("--base-font", fontValue);
}

//Function to display products in the catalog with interactive "Add to Cart" buttons
function displayProducts() {
  const productList = document.getElementById("productCards");
  if (!productList) return; // guard if element not present
  productList.innerHTML = ""; // CLEAR existing products to avoid duplicates
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "productCards";
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: R${product.price.toFixed(2)}</p>
      <img src="Images/${product.Image}" alt="${
      product.name
    }" style="display: block; margin: 10px auto;" />
      <button onclick="addToCart(${
        product.id
      })" class="addToCart">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}
/*Function to add a product to the cart, checking localStorage for existing cart data. 
If the product is successfully added, an alert is displayed to the user.*/

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} has been added to your cart.`);
  displayCart();
  displayTotalPrice();
}
//Function to display cart items.
function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = ""; // Clear existing items
  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cartItems";
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: R${item.price.toFixed(2)}</p>
      <img src="Images/${item.Image}" alt="${
      item.name
    }" style="display: block; margin: 0 auto;" />
    <button class="removeFromCart" onclick="removeFromCart(${
      item.id
    })">Remove</button>
    `;
    cartList.appendChild(itemDiv);
  });
  if (cartItems.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  }
}
//Function to remove a single product from the cart.
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  displayTotalPrice();
}

//Function to clear all items from the cart.
function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
  displayTotalPrice();
}

//Event listener for the "Clear Cart" button (guarded)
const clearCartBtn = document.getElementById("clearCart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      clearCart();
    }
  });
}

//Function to calculate and display the total price of items in the cart dynamically
function displayTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //Ensure numeric price values for accurate calculation
  const totalPrice = cartItems
    .map((i) => parseFloat(i.price) || 0)
    .reduce((total, price) => total + price, 0);
  const totalEl = document.getElementById("totalPrice");
  if (!totalEl) return; // Exit if the element is not found
  //replace content with total price
  totalEl.textContent = `Total Price: R${totalPrice.toFixed(2)}`;
}
//Add service worker for caching effectively
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/doodleDepot.html",
        "/doodleDepot.js",
        "/doodleDepot.css",
        "/Images/colourpencils.png",
        "/Images/eraser.png",
        "/Images/pen.png",
        "/Images/pencil.png",
      ]);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

//Event listener to display products and cart on page load
document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  displayProducts();
  displayCart();
  displayTotalPrice();
  //Apply font preference from session storage if available
  const fontSelect = document.getElementById("fontSelect");
  if (fontSelect) {
    const savedFont = sessionStorage.getItem("preferredFont");
    //Apply saved font preference or default to the selected value
    const initialFont = savedFont || fontSelect.value;
    fontSelect.value = initialFont;
    //Apply the selected font preference
    applyFontPreference(initialFont);
    //Event listener for font selection change
    fontSelect.addEventListener("change", () => {
      const selectedFont = fontSelect.value;
      sessionStorage.setItem("preferredFont", selectedFont);
      applyFontPreference(selectedFont);
    });
  }
});
