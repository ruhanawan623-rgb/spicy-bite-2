/* ==========================================================================
   SPICY BITE FAST FOOD - MISRIAL CHOWK
   Interactive Web Application JavaScript Logic
   ========================================================================== */

// Real Contact Information
const RESTAURANT_PHONE = "+92 312 5557890";
const RESTAURANT_WHATSAPP = "923125557890"; // Format for WhatsApp API
const RESTAURANT_LOCATION = "Main Misrial Chowk, Rawalpindi";

// Menu Data Store
const menuItems = [
  {
    id: "z1",
    title: "Mighty Zinger Burger",
    category: "burgers",
    price: 490,
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    badgeType: "bestseller",
    description: "Extra crisp jumbo deep-fried spicy zinger fillet, melted cheddar slice, iceberg lettuce & double garlic mayo sauce.",
    image: "assets/images/zinger.png"
  },
  {
    id: "z2",
    title: "Smash Double Beef Burger",
    category: "burgers",
    price: 680,
    rating: 4.8,
    reviews: 98,
    badge: "Chef Special",
    badgeType: "bestseller",
    description: "100% juicy dual beef smash patties, caramelized onions, smoked bacon mayo, double cheddar melt in toasted bun.",
    image: "assets/images/hero.png"
  },
  {
    id: "z3",
    title: "Crispy Broast (Quarter Leg)",
    category: "broast",
    price: 420,
    rating: 4.9,
    reviews: 210,
    badge: "Hot Broast",
    badgeType: "spicy",
    description: "Golden crunch Pakistani fried broast quarter piece with signature garlic mayo dip, fresh naan & crinkle fries.",
    image: "assets/images/broast.png"
  },
  {
    id: "p1",
    title: "Chicken Tikka Pizza (Large)",
    category: "pizzas",
    price: 1150,
    rating: 4.9,
    reviews: 185,
    badge: "Cheese Pull",
    badgeType: "bestseller",
    description: "Freshly hand-tossed thick crust loaded with smoked spicy chicken tikka cubes, extra mozzarella, onions & bell peppers.",
    image: "assets/images/pizza.png"
  },
  {
    id: "f1",
    title: "Misrial Loaded Cheese Fries",
    category: "fries",
    price: 390,
    rating: 5.0,
    reviews: 310,
    badge: "Misrial Special",
    badgeType: "spicy",
    description: "Crispy golden potato fries drenched in hot liquid cheddar cheese sauce, juicy Zinger bites & pickled jalapenos.",
    image: "assets/images/fries.png"
  },
  {
    id: "r1",
    title: "Smoky Malai Boti Paratha Roll",
    category: "rolls",
    price: 290,
    rating: 4.7,
    reviews: 160,
    badge: "Street Style",
    badgeType: "bestseller",
    description: "Charcoal grilled creamy chicken malai boti wrapped in crispy butter paratha with spicy green chutney & onions.",
    image: "assets/images/roll.png"
  },
  {
    id: "z4",
    title: "Spicy Jalapeno Zinger",
    category: "burgers",
    price: 520,
    rating: 4.8,
    reviews: 87,
    badge: "Super Spicy",
    badgeType: "spicy",
    description: "Spicy zinger crunch fillet topped with sliced fiery jalapenos, chili mayo, and spicy pepper jack cheese.",
    image: "assets/images/zinger.png"
  },
  {
    id: "p2",
    title: "Crown Crust Fajita Pizza (Medium)",
    category: "pizzas",
    price: 890,
    rating: 4.8,
    reviews: 114,
    badge: "Stuff Crust",
    badgeType: "bestseller",
    description: "Special crown crust stuffed with garlic cream cheese, mexican chicken fajita chunks, olives & sweet corn.",
    image: "assets/images/pizza.png"
  },
  {
    id: "d1",
    title: "Special Chocolate Shake",
    category: "drinks",
    price: 280,
    rating: 4.9,
    reviews: 95,
    badge: "Chilled",
    badgeType: "bestseller",
    description: "Rich chocolate ice cream blend topped with whipped cream swirl and Belgian chocolate syrup.",
    image: "assets/images/hero.png"
  }
];

// App State
let cart = [];
let currentCategory = "all";
let searchQuery = "";

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  setupEventListeners();
  updateCartUI();
});

// Render Menu Items Grid
function renderMenu() {
  const container = document.getElementById("foodGrid");
  if (!container) return;

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
        <h3>No delicious items found matching "${searchQuery}"</h3>
        <p>Try searching for Zinger, Pizza, Broast, or Fries!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredItems.map(item => `
    <div class="food-card" data-id="${item.id}">
      <div class="food-img-container">
        <img src="${item.image}" alt="${item.title}" class="food-img" loading="lazy">
        <span class="food-tag ${item.badgeType}">${item.badge}</span>
      </div>
      <div class="food-details">
        <div class="food-header">
          <h3 class="food-title">${item.title}</h3>
          <div class="food-rating">
            <i class="fas fa-star"></i>
            <span>${item.rating}</span>
          </div>
        </div>
        <p class="food-desc">${item.description}</p>
        <div class="food-footer">
          <div class="food-price">
            Rs. ${item.price} <span>PKR</span>
          </div>
          <button class="btn-add-cart" onclick="addToCart('${item.id}')">
            <i class="fas fa-plus"></i> Add to Order
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Category Filter setup
function setupEventListeners() {
  // Category Pills
  const categoryPills = document.querySelectorAll(".category-pill");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderMenu();
    });
  });

  // Search Input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Cart Drawer toggles
  const cartTrigger = document.getElementById("cartTrigger");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCartBtn = document.getElementById("closeCartBtn");

  const openCart = () => {
    cartOverlay.classList.add("active");
    cartDrawer.classList.add("active");
  };

  const closeCart = () => {
    cartOverlay.classList.remove("active");
    cartDrawer.classList.remove("active");
  };

  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
}

// Shopping Cart Functions
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartUI();
  
  // Show quick notification feedback
  showToast(`Added ${item.title} to your order!`);
}

function updateQuantity(itemId, delta) {
  const index = cart.findIndex(c => c.id === itemId);
  if (index !== -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const cartBadge = document.getElementById("cartBadge");
  const cartContainer = document.getElementById("cartBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const deliveryEl = document.getElementById("cartDelivery");
  const totalEl = document.getElementById("cartTotal");

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 90; // Free delivery over Rs.1000 in Misrial Chowk
  const grandTotal = subtotal + deliveryFee;

  if (cartBadge) cartBadge.innerText = totalItems;

  if (cartContainer) {
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-basket cart-empty-icon"></i>
          <p>Your cart is empty!</p>
          <span style="font-size:0.85rem; color: var(--text-dim);">Select items from the Misrial Chowk menu above.</span>
        </div>
      `;
    } else {
      cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">Rs. ${item.price * item.quantity}</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join("");
    }
  }

  if (subtotalEl) subtotalEl.innerText = `Rs. ${subtotal}`;
  if (deliveryEl) deliveryEl.innerText = deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`;
  if (totalEl) totalEl.innerText = `Rs. ${grandTotal}`;
}

// WhatsApp Checkout Generator
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Please add food items to your cart before sending order!");
    return;
  }

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = subtotal > 1000 ? 0 : 90;
  const grandTotal = subtotal + deliveryFee;

  let message = `🍔 *NEW ORDER - SPICY BITE (MISRIAL CHOWK)* 🍔\n\n`;
  message += `📍 *Delivery Location:* Misrial Chowk & Surrounding Areas\n`;
  message += `--------------------------------------\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.title}* x ${item.quantity} = Rs. ${item.price * item.quantity}\n`;
  });

  message += `--------------------------------------\n`;
  message += `💵 *Subtotal:* Rs. ${subtotal}\n`;
  message += `🛵 *Delivery Charges:* ${deliveryFee === 0 ? 'FREE (Misrial Offer)' : 'Rs. ' + deliveryFee}\n`;
  message += `💰 *TOTAL AMOUNT:* Rs. ${grandTotal}\n\n`;
  message += `📞 *Customer Contact:* Please confirm delivery address in Misrial Chowk!\n`;
  message += `⚡ Thank you for ordering from Spicy Bite Fast Food!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: linear-gradient(135deg, var(--primary-orange), var(--accent-red));
      color: white;
      padding: 12px 24px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 10px 25px rgba(255, 87, 34, 0.4);
      z-index: 9999;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 2500);
}
