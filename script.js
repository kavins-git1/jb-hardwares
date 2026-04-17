// ---------------------------------------------------------
// FIREBASE CONFIGURATION (ACTION REQUIRED)
// Replace these placeholders with your actual Firebase config
// ---------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCUhueXbJ2FP8MnSMk0HWqleEySn07NWWg",
  authDomain: "jb-hardworks.firebaseapp.com",
  projectId: "jb-hardworks",
  storageBucket: "jb-hardworks.firebasestorage.app",
  messagingSenderId: "896499950840",
  appId: "1:896499950840:web:3efea517f0b93e5a07870d",
  measurementId: "G-VN2D55GWSV"
};

// Initialize Firebase only if the placeholder is changed, 
// or initialize dummy for UI demonstration purposes.
let auth, db, recaptchaVerifier;
try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
} catch (e) {
    console.warn("Firebase not initialized correctly. Using mock state.", e);
}

// ---------------------------------------------------------
// COMPREHENSIVE PRODUCT DATABASE
// ---------------------------------------------------------
const products = [
    { id: 1, name: "LG 24-inch Monitor", price: "₹12,500", category: "Monitor", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 2, name: "BENQ 27-inch Gaming Monitor", price: "₹18,000", category: "Monitor", image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 3, name: "Acer 21.5-inch Monitor", price: "₹8,500", category: "Monitor", image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=400", inStock: false },
    { id: 4, name: "ASUS ProArt Monitor", price: "₹35,000", category: "Monitor", image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&q=80&w=400", inStock: true },
    
    { id: 5, name: "DELL Wireless Mouse", price: "₹800", category: "Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 6, name: "Logitech G502 Wired Mouse", price: "₹4,500", category: "Mouse", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 7, name: "HP Wireless Mouse", price: "₹750", category: "Mouse", image: "pics/hp-wirelessmouse.jpg", inStock: true },
    { id: 8, name: "Lapcare Wired Mouse", price: "₹250", category: "Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400", inStock: true },

    { id: 9, name: "88A Toner (Printer Cartridge)", price: "₹1,200", category: "Other", image: "pics/88a -toner.webp", inStock: true },
    { id: 10, name: "12A Toner (Printer Cartridge)", price: "₹1,400", category: "Other", image: "pics/12a toner.jpg", inStock: true },
    
    { id: 11, name: "Rubber Stamp (Seal)", price: "₹350", category: "Other", image: "pics/rubber-stamp.jpg", inStock: true },

    { id: 12, name: "DELL USB Keyboard", price: "₹650", category: "Keyboard", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 13, name: "Logitech Wireless Keyboard", price: "₹1,200", category: "Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 14, name: "HP Wired Keyboard", price: "₹700", category: "Keyboard", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400", inStock: true },

    { id: 17, name: "HP 1005 Laser Printer", price: "₹18,500", category: "Printer", image: "assets/hp_1005_printer.jpg", inStock: false },
    { id: 18, name: "HP 1020 Plus Printer", price: "₹15,000", category: "Printer", image: "pics/hp 1020 plus printer.webp", inStock: true },
    
    


    { id: 25, name: "8GB DDR4 RAM", price: "₹1,800", category: "RAM", image: "pics/8gb ddr4 ram.webp", inStock: true },
    { id: 26, name: "16GB DDR5 RAM", price: "₹4,500", category: "RAM", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 27, name: "4GB DDR3 RAM", price: "₹1,200", category: "RAM", image: "pics/4gb ddr3 ram.webp", inStock: true },
    { id: 28, name: "2GB DDR2 RAM", price: "₹800", category: "RAM", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400", inStock: true },

    { id: 29, name: "Gigabyte B550 Motherboard", price: "₹11,500", category: "Motherboard", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 30, name: "Lapcare H61 Motherboard", price: "₹3,500", category: "Motherboard", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 31, name: "EVM H81 Motherboard", price: "₹2,800", category: "Motherboard", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400", inStock: true },

    { id: 32, name: "EVM 512GB SSD", price: "₹2,500", category: "Hard Disk", image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 34, name: "Crucial 500GB SSD", price: "₹3,200", category: "Hard Disk", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 35, name: "Seagate 1TB HDD", price: "₹3,800", category: "Hard Disk", image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=400", inStock: true },

    { id: 36, name: "Intel Core i3 12th Gen", price: "₹10,500", category: "Processor", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 37, name: "Intel Core i5 13th Gen", price: "₹22,000", category: "Processor", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 38, name: "Intel Core i7 13th Gen", price: "₹35,000", category: "Processor", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", inStock: true },
    { id: 39, name: "Intel Core i9 13th Gen", price: "₹54,000", category: "Processor", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400", inStock: false },
];

// ---------------------------------------------------------
// STATE MANAGEMENT
// ---------------------------------------------------------
let currentUser = null;
let currentCategory = 'All';
let wishlist = [];
let cart = [];
let userDocId = null;

// Convert localized price to number for math
function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
}

// ---------------------------------------------------------
// UI RENDERING
// ---------------------------------------------------------
function renderProducts(productsToRender) {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;
    
    productGrid.innerHTML = ""; 

    if (productsToRender.length === 0) {
        productGrid.innerHTML = "<p style='text-align:center; grid-column: 1 / -1; font-size: 18px; color: #666;'>No products found in this category.</p>";
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const stockClass = product.inStock ? "in-stock" : "out-of-stock";
        const stockText = product.inStock ? "In Stock" : "Out of Stock";
        const buttonState = product.inStock ? "" : "disabled";
        
        let inWishlist = wishlist.includes(product.id.toString());
        let wishClass = inWishlist ? "active" : "";
        let wishIcon = inWishlist ? "fa-solid" : "fa-regular";

        card.innerHTML = `
            <span class="stock-badge ${stockClass}">${stockText}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
            </div>
            
            <div class="card-actions">
                <button class="wishlist-btn ${wishClass}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                    <i class="${wishIcon} fa-heart"></i>
                </button>
                <button class="add-cart-btn" onclick="addToCart(${product.id})" ${buttonState}>
                    Add to Cart
                </button>
            </div>
            <button class="book-btn" style="margin-top:10px; width:100%" onclick="openProductModal(${product.id})" ${buttonState}>
                Buy Now
            </button>
        `;
        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    
    let filtered = products;
    if (currentCategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (searchInput) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchInput));
    }
    
    renderProducts(filtered);
}

function setCategory(cat) {
    currentCategory = cat;
    // Update active UI
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === cat) btn.classList.add('active');
    });
    filterProducts();
}

// ---------------------------------------------------------
// AUTHENTICATION (FIREBASE PHONE AUTH)
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Initial Render
    renderProducts(products);

    if (auth) {

        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                document.getElementById('loginBtn').style.display = 'none';
                document.getElementById('profileBtn').style.display = 'inline-block';
                // Delay closing modal until we check user profile existence
                loadUserData(user.uid);
            } else {
                currentUser = null;
                document.getElementById('loginBtn').style.display = 'inline-block';
                document.getElementById('profileBtn').style.display = 'none';
                wishlist = [];
                cart = [];
                updateCounts();
            }
        });
    } else {
        // Mock Auth State for UI viewing if Firebase is not configured
        console.warn("Using mock authentication mode.");
    }
});

function openLoginModal() {
    document.getElementById("loginModal").classList.add("active");
    document.getElementById("googleInputStep").style.display = "block";
    document.getElementById("profileInputStep").style.display = "none";
}

function showProfileStep() {
    document.getElementById("loginModal").classList.add("active");
    document.getElementById("googleInputStep").style.display = "none";
    document.getElementById("profileInputStep").style.display = "block";
    document.getElementById("loginTitle").innerText = "Complete Profile";
}

function saveUserProfile() {
    const name = document.getElementById("profileName").value.trim();
    const phone = document.getElementById("profilePhone").value.trim();
    const address = document.getElementById("profileAddress").value.trim();
    
    if(!name || !address || !phone) {
        alert("Please enter Name, Phone Number, and Address.");
        return;
    }
    
    if(!db || !currentUser) return;
    
    db.collection("users").doc(currentUser.uid).update({
        name: name,
        phone: phone,
        address: address
    }).then(() => {
        alert("Profile Saved!");
        closeLoginModal();
    }).catch(e => {
        alert("Failed to save profile. Try again.");
    });
}

function closeLoginModal() {
    document.getElementById("loginModal").classList.remove("active");
}

function signInWithGoogle() {
    if(!auth){ alert("Firebase not configured. Setup API keys first."); return; }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Logged In via Google", result.user);
            // UI flow is handled by onAuthStateChanged -> loadUserData
        }).catch((error) => {
            console.error("Google login failed", error);
            alert("Firebase Error: " + error.message);
        });
}

function logout() {
    if(auth) auth.signOut();
    closeProfileDrawer();
    alert("Logged out successfully");
}

// ---------------------------------------------------------
// DATABASE OPERATIONS
// ---------------------------------------------------------
function loadUserData(uid) {
    if (!db) return;
    const userRef = db.collection("users").doc(uid);
    userRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            wishlist = data.wishlist || [];
            cart = data.cart || [];
            updateCounts();
            filterProducts();
            
            if(!data.name || !data.address || !data.phone) {
                if(data.name) document.getElementById("profileName").value = data.name;
                if(data.phone) document.getElementById("profilePhone").value = data.phone;
                showProfileStep();
            } else {
                closeLoginModal();
            }
        } else {
            // Create user
            userRef.set({ 
                email: currentUser.email || '', 
                phone: currentUser.phoneNumber || '', 
                wishlist: [], 
                cart: [], 
                lastViewed: null 
            }).then(() => {
                if(currentUser.displayName) document.getElementById("profileName").value = currentUser.displayName;
                if(currentUser.phoneNumber) document.getElementById("profilePhone").value = currentUser.phoneNumber;
                showProfileStep();
            }).catch(e => {
                console.error("Error creating user:", e);
                alert("Database Permission Error. Please configure Firestore rules to allow read/write access.");
                closeLoginModal();
            });
        }
    }).catch(e => {
        console.error("Error fetching user data:", e);
        alert("Database Permission Error: Please update your Firestore Rules to allow reads and writes (e.g. allow read, write: if request.auth != null).");
        closeLoginModal(); // Close modal so user isn't stuck forever
    });
}

function syncUserData(field, data) {
    if (!db || !currentUser) return;
    db.collection("users").doc(currentUser.uid).update({
        [field]: data
    });
}

// ---------------------------------------------------------
// E-COMMERCE LOGIC
// ---------------------------------------------------------
function toggleWishlist(productId) {
    if (!currentUser) { openLoginModal(); return; }
    
    let strId = productId.toString();
    if (wishlist.includes(strId)) {
        wishlist = wishlist.filter(id => id !== strId);
    } else {
        wishlist.push(strId);
    }
    
    syncUserData('wishlist', wishlist);
    updateCounts();
    filterProducts(); // re-render heart icons
}

function addToCart(productId) {
    if (!currentUser) { openLoginModal(); return; }
    
    cart.push(productId.toString());
    syncUserData('cart', cart);
    updateCounts();
    alert("Added to cart!");
}

function updateCounts() {
    document.getElementById("cartCount").innerText = cart.length;
    document.getElementById("cartItemCount").innerText = cart.length;
    document.getElementById("wishlistCount").innerText = wishlist.length;
}

let activeCheckoutItem = null; // Can hold a single product or 'cart'

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (currentUser && db) {
        syncUserData('lastViewed', productId);
    }

    activeCheckoutItem = product;
    document.getElementById("modalTitle").innerText = `Buy ${product.name}`;
    document.getElementById("modalDesc").innerText = `Price: ${product.price}`;
    
    if (document.getElementById("gpaySection")) document.getElementById("gpaySection").style.display = "none";
    if (document.getElementById("paymentStatusSection")) document.getElementById("paymentStatusSection").style.display = "none";
    if (document.getElementById("modalActionButtons")) document.getElementById("modalActionButtons").style.display = "flex";
    
    document.getElementById("bookingModal").classList.add("active");
}

function closeModal() {
    document.getElementById("bookingModal").classList.remove("active");
}

function checkoutCart() {
    if(cart.length === 0) { alert("Cart is empty"); return; }
    closeProfileDrawer();
    
    let total = 0;
    cart.forEach(id => {
        let p = products.find(pr => pr.id.toString() === id);
        if(p) total += parsePrice(p.price);
    });
    
    activeCheckoutItem = 'cart';
    document.getElementById("modalTitle").innerText = `Checkout Cart`;
    document.getElementById("modalDesc").innerText = `Total items: ${cart.length} | Total Price: ₹${total.toLocaleString()}`;
    
    if (document.getElementById("gpaySection")) document.getElementById("gpaySection").style.display = "none";
    if (document.getElementById("paymentStatusSection")) document.getElementById("paymentStatusSection").style.display = "none";
    if (document.getElementById("modalActionButtons")) document.getElementById("modalActionButtons").style.display = "flex";
    
    document.getElementById("bookingModal").classList.add("active");
}

// ---------------------------------------------------------
// GPAY & PAYMENT
// ---------------------------------------------------------
function payWithGPay() {
    if (!currentUser) {
        closeModal();
        openLoginModal();
        return;
    }
    
    // Switch UI to show GPay QR
    document.getElementById("modalActionButtons").style.display = "none";
    document.getElementById("gpaySection").style.display = "block";
}

function confirmGPayment() {
    let amountInPaise = 0;
    let description = "";
    
    if (activeCheckoutItem === 'cart') {
        let total = 0;
        cart.forEach(id => {
            let p = products.find(pr => pr.id.toString() === id);
            if(p) total += parsePrice(p.price);
        });
        amountInPaise = total * 100;
        description = "Cart Checkout";
    } else if (activeCheckoutItem) {
        amountInPaise = parsePrice(activeCheckoutItem.price) * 100;
        description = activeCheckoutItem.name;
    }

    let paymentId = "GPAY_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Switch UI to waiting state
    document.getElementById("gpaySection").style.display = "none";
    document.getElementById("paymentStatusSection").style.display = "block";
    document.getElementById("paymentStatusSection").innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 40px; color: #2B4E38; margin-bottom: 15px;"></i>
            <h3 style="color: #2B4E38;">Waiting for Payment Confirmation...</h3>
            <p style="font-size: 14px; color: #666; margin-top: 10px;">Please do not close this window. Our team is verifying your transaction in the database.</p>
        </div>
    `;

    if (!db || !currentUser) return;

    let orderRef = db.collection("orders").doc();
    
    orderRef.set({
        uid: currentUser.uid,
        payment_id: paymentId,
        description: description,
        amount: amountInPaise / 100,
        status: "Pending Verification",
        date: new Date().toISOString()
    }).then(() => {
        syncUserData('lastOrdered', description);
        
        let unsubscribe = orderRef.onSnapshot((doc) => {
            let data = doc.data();
            if (data && (data.status === "Payment Successful" || data.status === "Approved" || data.status === "Success")) {
                unsubscribe(); // Stop listening
                document.getElementById("paymentStatusSection").innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fa-solid fa-check-circle" style="font-size: 50px; color: #4CAF50; margin-bottom: 15px;"></i>
                        <h3 style="color: #4CAF50;">Order Success!</h3>
                        <p style="font-size: 14px; color: #666; margin-top: 10px;">Your payment has been successfully verified.</p>
                        <button class="btn primary-btn full-width" style="margin-top:20px;" onclick="closeModal()">Done</button>
                    </div>
                `;

                if (activeCheckoutItem === 'cart') {
                    cart = [];
                    syncUserData('cart', cart);
                    updateCounts();
                }
            } else if (data && (data.status === "Rejected" || data.status === "Failed")) {
                unsubscribe();
                document.getElementById("paymentStatusSection").innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fa-solid fa-times-circle" style="font-size: 50px; color: red; margin-bottom: 15px;"></i>
                        <h3 style="color: red;">Payment Failed</h3>
                        <p style="font-size: 14px; color: #666; margin-top: 10px;">We couldn't verify your payment. Please try again or contact support.</p>
                        <button class="btn secondary-btn full-width" style="margin-top:20px;" onclick="closeModal()">Close</button>
                    </div>
                `;
            }
        });
    }).catch(e => {
        console.error("Error setting order doc:", e);
        document.getElementById("paymentStatusSection").innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="color: red;">Failed to create order. Please check your connection and try again.</p>
                <button class="btn primary-btn full-width" onclick="closeModal()">Close</button>
            </div>
        `;
    });
}

// ---------------------------------------------------------
// DRAWER / PROFILE LOGIC
// ---------------------------------------------------------
function openProfileDrawer(initTab = '') {
    if (!currentUser) { openLoginModal(); return; }
    
    document.getElementById("profileDrawer").classList.add("active");
    
    // Populate Data
    if (db) {
        // Fetch User Data for Last Viewed & Profile Details
        db.collection("users").doc(currentUser.uid).get().then(doc => {
            if(doc.exists) {
                let data = doc.data();
                
                // Populate Profile Details
                document.getElementById("displayUserName").innerText = data.name || "Add Your Name";
                document.getElementById("displayUserPhone").innerText = data.phone || currentUser.phoneNumber || "No Phone";
                document.getElementById("displayUserAddress").innerText = data.address || "Add Shipping Address";
                
                if(data.lastViewed) {
                    let p = products.find(pr => pr.id === data.lastViewed);
                    if(p) {
                        document.getElementById("lastViewedContainer").innerHTML = `
                            <img src="${p.image}" alt="">
                            <div class="drawer-item-info">
                                <div class="drawer-item-title">${p.name}</div>
                                <div class="drawer-item-price">${p.price}</div>
                            </div>
                        `;
                    }
                }
            }
        });
        
        // Fetch recent orders
        db.collection("orders").where("uid", "==", currentUser.uid).get().then(snapshot => {
            let html = "";
            snapshot.forEach(doc => {
                let order = doc.data();
                html += `
                    <div class="drawer-item">
                        <div class="drawer-item-info">
                            <div class="drawer-item-title">${order.description}</div>
                            <div class="drawer-item-price">Status: <span style="color:var(--secondary-color)">${order.status}</span></div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("ordersContainer").innerHTML = html || "No recent orders.";
        });
    }

    // Populate Wishlist
    let wishHtml = "";
    wishlist.forEach(id => {
        let p = products.find(pr => pr.id.toString() === id);
        if(p) {
            wishHtml += `
            <div class="drawer-item">
                <img src="${p.image}" alt="">
                <div class="drawer-item-info">
                    <div class="drawer-item-title">${p.name}</div>
                    <div class="drawer-item-price">${p.price}</div>
                </div>
            </div>`;
        }
    });
    document.getElementById("wishlistContainer").innerHTML = wishHtml || "Wishlist is empty.";

    // Populate Cart
    let cartHtml = "";
    cart.forEach(id => {
        let p = products.find(pr => pr.id.toString() === id);
        if(p) {
            cartHtml += `
            <div class="drawer-item">
                <img src="${p.image}" alt="">
                <div class="drawer-item-info">
                    <div class="drawer-item-title">${p.name}</div>
                    <div class="drawer-item-price">${p.price}</div>
                </div>
            </div>`;
        }
    });
    document.getElementById("cartContainer").innerHTML = cartHtml || "Cart is empty.";
}

function closeProfileDrawer() {
    document.getElementById("profileDrawer").classList.remove("active");
}

window.addEventListener("click", (event) => {
    const loginMod = document.getElementById("loginModal");
    const bookMod = document.getElementById("bookingModal");
    if (event.target === loginMod) closeLoginModal();
    if (event.target === bookMod) closeModal();
});
