```javascript
/* =========================================
   ShopEase - Main JavaScript File
   ========================================= */


/* =========================================
   1. ADD PRODUCT TO CART
   ========================================= */

function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check whether product already exists
    let existingProduct = cart.find(function(product) {
        return product.name === name;
    });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");

}


/* =========================================
   2. DISPLAY CART
   ========================================= */

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    // If cart page is not open, stop
    if (!cartItems) {
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        updateCartTotal();

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function(product, index) {

        let item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${index}, -1)">-</button>

                <span> ${product.quantity} </span>

                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>

            <div>
                <p>
                    ₹${product.price * product.quantity}
                </p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;


        cartItems.appendChild(item);

    });


    updateCartTotal();

}


/* =========================================
   3. CHANGE PRODUCT QUANTITY
   ========================================= */

function changeQuantity(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index]) {

        cart[index].quantity += change;


        // Remove product if quantity becomes zero
        if (cart[index].quantity <= 0) {

            cart.splice(index, 1);

        }

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


/* =========================================
   4. REMOVE PRODUCT FROM CART
   ========================================= */

function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index]) {

        cart.splice(index, 1);

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


/* =========================================
   5. CALCULATE CART TOTAL
   ========================================= */

function updateCartTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;


    cart.forEach(function(product) {

        subtotal += product.price * product.quantity;

    });


    // Free delivery for orders above ₹1000
    let delivery = 0;

    if (subtotal > 0 && subtotal < 1000) {

        delivery = 50;

    }


    let total = subtotal + delivery;


    let subtotalElement = document.getElementById("subtotal");
    let deliveryElement = document.getElementById("delivery");
    let totalElement = document.getElementById("cartTotal");


    if (subtotalElement) {

        subtotalElement.textContent = "₹" + subtotal;

    }


    if (deliveryElement) {

        deliveryElement.textContent = "₹" + delivery;

    }


    if (totalElement) {

        totalElement.textContent = "₹" + total;

    }


    // Payment page total
    let paymentTotal = document.getElementById("paymentTotal");

    if (paymentTotal) {

        paymentTotal.textContent = "₹" + total;

    }

}


/* =========================================
   6. GO TO PAYMENT
   ========================================= */

function goToPayment() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty. Please add a product first.");

        return;

    }


    window.location.href = "payment.html";

}


/* =========================================
   7. PAYMENT METHOD
   ========================================= */

function showPaymentDetails() {

    let paymentMethod =
        document.getElementById("paymentMethod");

    let upiDetails =
        document.getElementById("upiDetails");

    let cardDetails =
        document.getElementById("cardDetails");


    if (!paymentMethod) {
        return;
    }


    // Hide both sections first
    if (upiDetails) {

        upiDetails.style.display = "none";

    }


    if (cardDetails) {

        cardDetails.style.display = "none";

    }


    // Show selected section
    if (paymentMethod.value === "UPI") {

        if (upiDetails) {

            upiDetails.style.display = "block";

        }

    }


    if (paymentMethod.value === "Card") {

        if (cardDetails) {

            cardDetails.style.display = "block";

        }

    }

}


/* =========================================
   8. MAKE PAYMENT
   ========================================= */

function makePayment(event) {

    event.preventDefault();


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let customerName =
        document.getElementById("customerName").value;

    let paymentMethod =
        document.getElementById("paymentMethod").value;


    if (customerName.trim() === "") {

        alert("Please enter your name.");

        return;

    }


    if (paymentMethod === "") {

        alert("Please select a payment method.");

        return;

    }


    alert(
        "Order placed successfully!\n\n" +
        "Thank you, " + customerName + "!\n" +
        "Payment Method: " + paymentMethod
    );


    // Clear cart after successful order
    localStorage.removeItem("cart");


    window.location.href = "index.html";

}


/* =========================================
   9. SEARCH PRODUCT
   ========================================= */

function searchProduct() {

    let searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    let searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText === "") {

        alert("Please enter a product name.");

        return;

    }


    // Product page for common searches
    let products = [
        "laptop",
        "phone",
        "headphones",
        "watch",
        "monitor",
        "speaker",
        "t-shirt",
        "shirt",
        "jeans",
        "dress",
        "jacket",
        "shoes",
        "sandals",
        "boots",
        "bag",
        "wallet",
        "sunglasses",
        "backpack",
        "cap"
    ];


    let found = products.some(function(product) {

        return product.includes(searchText) ||
               searchText.includes(product);

    });


    if (found) {

        window.location.href = "product.html";

    } else {

        alert("Product not found. Please try another product.");

    }

}


/* =========================================
   10. REGISTER USER
   ========================================= */

function registerUser(event) {

    event.preventDefault();


    let fullName =
        document.getElementById("fullName").value.trim();

    let email =
        document.getElementById("registerEmail").value.trim();

    let phone =
        document.getElementById("registerPhone").value.trim();

    let address =
        document.getElementById("registerAddress").value.trim();

    let password =
        document.getElementById("registerPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check password
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }


    // Save user information
    let user = {

        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        password: password

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    alert(
        "Registration successful!\n\n" +
        "You can now login."
    );


    window.location.href = "login.html";

}


/* =========================================
   11. LOGIN USER
   ========================================= */

function loginUser(event) {

    event.preventDefault();


    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;


    let savedUser =
        JSON.parse(localStorage.getItem("registeredUser"));


    if (!savedUser) {

        alert("No registered user found. Please register first.");

        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem("loggedIn", "true");


        alert(
            "Login successful!\n\n" +
            "Welcome, " + savedUser.fullName + "!"
        );


        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");

    }

}


/* =========================================
   12. CONTACT FORM
   ========================================= */

function submitContactForm(event) {

    event.preventDefault();


    let name =
        document.getElementById("contactName").value.trim();

    alert(
        "Thank you, " + name +
        "!\n\nYour message has been submitted successfully."
    );


    event.target.reset();

}


/* =========================================
   13. RUN FUNCTIONS WHEN PAGE LOADS
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // Display cart
    displayCart();


    // Update totals
    updateCartTotal();


    // Payment method
    let paymentMethod =
        document.getElementById("paymentMethod");


    if (paymentMethod) {

        paymentMethod.addEventListener(
            "change",
            showPaymentDetails
        );

    }

});
```