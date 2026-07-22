/**
 * Shopping Cart Management for QuickBite
 * Uses localStorage to persist the cart state across different pages.
 */

// Key used in localStorage
const CART_STORAGE_KEY = 'quickbite_cart';

/**
 * Retrieves the current cart from localStorage.
 * If no cart exists, returns a default empty cart structure.
 */
function getCart() {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (cartData) {
    try {
      return JSON.parse(cartData);
    } catch (e) {
      console.error("Error parsing cart data, resetting cart", e);
      return { restaurantId: null, restaurantName: "", items: [] };
    }
  }
  return { restaurantId: null, restaurantName: "", items: [] };
}

/**
 * Saves the given cart object to localStorage and updates the badge.
 */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
  // Trigger a custom event to notify other scripts of cart changes
  window.dispatchEvent(new Event('cartUpdated'));
}

/**
 * Adds a food item from a specific restaurant to the cart.
 * If the cart contains items from a different restaurant, prompts the user.
 * 
 * @param {number} restaurantId - ID of the restaurant the item belongs to
 * @param {string} restaurantName - Name of the restaurant
 * @param {object} item - Item object containing id, name, price, and image
 */
function addToCart(restaurantId, restaurantName, item) {
  let cart = getCart();

  // Check if cart has items from another restaurant
  if (cart.restaurantId !== null && cart.restaurantId !== restaurantId) {
    const confirmClear = confirm(
      `Your cart contains items from "${cart.restaurantName}".\nWould you like to clear your cart and start a new order at "${restaurantName}"?`
    );
    if (confirmClear) {
      cart = { restaurantId: restaurantId, restaurantName: restaurantName, items: [] };
    } else {
      return false; // User cancelled
    }
  }

  // Set restaurant details if cart was empty
  if (cart.restaurantId === null) {
    cart.restaurantId = restaurantId;
    cart.restaurantName = restaurantName;
  }

  // Check if item already exists in the cart
  const existingItemIndex = cart.items.findIndex(i => i.id === item.id);
  if (existingItemIndex > -1) {
    // Increment quantity
    cart.items[existingItemIndex].quantity += 1;
  } else {
    // Add new item with quantity 1
    cart.items.push({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.image,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`${item.name} added to cart!`);
  return true;
}

/**
 * Removes an item from the cart completely.
 */
function removeFromCart(itemId) {
  let cart = getCart();
  cart.items = cart.items.filter(item => item.id !== itemId);

  // If cart is empty, reset restaurant info
  if (cart.items.length === 0) {
    cart.restaurantId = null;
    cart.restaurantName = "";
  }

  saveCart(cart);
}

/**
 * Updates the quantity of a specific item in the cart.
 * If quantity drops to or below 0, removes the item.
 */
function updateQuantity(itemId, change) {
  let cart = getCart();
  const itemIndex = cart.items.findIndex(item => item.id === itemId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += change;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    if (cart.items.length === 0) {
      cart.restaurantId = null;
      cart.restaurantName = "";
    }

    saveCart(cart);
  }
}

/**
 * Clears the shopping cart completely.
 */
function clearCart() {
  const emptyCart = { restaurantId: null, restaurantName: "", items: [] };
  saveCart(emptyCart);
}

/**
 * Calculates total item count.
 */
function getCartCount() {
  const cart = getCart();
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculates pricing breakdown (subtotal, delivery, tax, total).
 * Customizes delivery fees based on restaurant data or defaults.
 */
function getCartTotal(deliveryFee = 2.00) {
  const cart = getCart();
  const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // If cart is empty, charges are 0
  if (subtotal === 0) {
    return { subtotal: 0, deliveryFee: 0, tax: 0, total: 0 };
  }

  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + deliveryFee + tax;

  return {
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  };
}

/**
 * Updates any element with class 'cart-badge' with the current item count.
 */
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    // Show/hide badge depending on items count
    if (count > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

/**
 * Displays a non-intrusive notification toast.
 */
function showToast(message) {
  // Check if toast container exists, if not create it
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.style.cssText = `
    background: #2d3436;
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    border-left: 4px solid #ff4757;
  `;
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger reflow for transition
  toast.offsetHeight;

  // Fade and slide in
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  // Fade out and remove after 2.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 2500);
}

// Update the badge when script runs
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Export functions to global scope
if (typeof window !== 'undefined') {
  window.getCart = getCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQuantity = updateQuantity;
  window.clearCart = clearCart;
  window.getCartCount = getCartCount;
  window.getCartTotal = getCartTotal;
  window.updateCartBadge = updateCartBadge;
  window.showToast = showToast;
}
