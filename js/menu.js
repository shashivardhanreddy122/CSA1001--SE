/**
 * Restaurant Menu Loading Logic for QuickBite
 * Parses query params to find the selected restaurant, displays details and menu items,
 * and manages the sidebar cart preview.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Extract restaurant ID from the URL parameters (e.g., menu.html?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = parseInt(urlParams.get('id'));

  // If no ID is provided, redirect back to index.html
  if (!restaurantId || isNaN(restaurantId)) {
    alert("Restaurant not found. Redirecting to home page...");
    window.location.href = "index.html";
    return;
  }

  // 2. Fetch the restaurant from mock data
  const restaurant = RESTAURANTS_DATA.find(r => r.id === restaurantId);

  // If restaurant doesn't exist in data, show error and redirect
  if (!restaurant) {
    alert("Restaurant not found. Redirecting to home page...");
    window.location.href = "index.html";
    return;
  }

  // 3. Render restaurant banner details
  const bannerSection = document.getElementById('restaurant-banner-section');
  const bannerInfo = document.getElementById('restaurant-banner-info');
  
  if (bannerSection && bannerInfo) {
    bannerSection.style.backgroundImage = `url('${restaurant.bannerImage}')`;
    
    bannerInfo.innerHTML = `
      <h1 class="banner-name">${restaurant.name}</h1>
      <p style="margin-top: -8px; font-weight: 500; font-size: 1.1rem; opacity: 0.9;">${restaurant.cuisine}</p>
      <div class="banner-meta" style="margin-top: 8px;">
        <span class="banner-rating">
          <i class="fa-solid fa-star"></i> ${restaurant.rating.toFixed(1)}
        </span>
        <span>•</span>
        <span><i class="fa-solid fa-clock"></i> ${restaurant.deliveryTime}</span>
        <span>•</span>
        <span><i class="fa-solid fa-truck"></i> Delivery: ${restaurant.deliveryFee === 0 ? 'Free' : '$' + restaurant.deliveryFee.toFixed(2)}</span>
      </div>
    `;
  }

  // 4. Render menu items
  const menuContainer = document.getElementById('menu-items-container');
  if (menuContainer) {
    menuContainer.innerHTML = '';

    restaurant.menu.forEach(item => {
      const popularBadge = item.popular ? `<span class="item-popular-badge"><i class="fa-solid fa-fire"></i> Popular</span>` : '';
      
      const itemCard = document.createElement('div');
      itemCard.className = 'menu-item-card';
      itemCard.innerHTML = `
        <div class="menu-item-info">
          ${popularBadge}
          <h3 class="menu-item-name">${item.name}</h3>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="menu-item-media">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <button class="add-to-cart-btn" title="Add to Basket" data-item-id="${item.id}">
          <i class="fa-solid fa-plus"></i>
        </button>
      `;

      // Set event listener for the Add to Basket button
      const addBtn = itemCard.querySelector('.add-to-cart-btn');
      addBtn.addEventListener('click', () => {
        // Use cart.js function to add item
        addToCart(restaurant.id, restaurant.name, item);
      });

      menuContainer.appendChild(itemCard);
    });
  }

  // 5. Render Sidebar Basket Preview
  function renderSidebarCart() {
    const cartItemsContainer = document.getElementById('sidebar-cart-items');
    const checkoutBtn = document.getElementById('sidebar-checkout-btn');
    const cart = getCart();

    // Elements for prices
    const subtotalEl = document.getElementById('sidebar-subtotal');
    const deliveryEl = document.getElementById('sidebar-delivery');
    const taxEl = document.getElementById('sidebar-tax');
    const totalEl = document.getElementById('sidebar-grand-total');

    if (!cartItemsContainer || !checkoutBtn) return;

    cartItemsContainer.innerHTML = '';

    // If cart is empty or holds items from another restaurant
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-state" style="padding: 30px 0;">
          <div class="empty-state-icon" style="font-size: 2.2rem; color: #ced6e0;">
            <i class="fa-solid fa-shopping-basket"></i>
          </div>
          <p style="font-size: 0.85rem; font-weight: 500;">Your basket is empty.<br>Choose dishes to start ordering!</p>
        </div>
      `;
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = "Go to Checkout";

      // Reset values
      subtotalEl.textContent = '$0.00';
      deliveryEl.textContent = '$0.00';
      taxEl.textContent = '$0.00';
      totalEl.textContent = '$0.00';
      return;
    }

    // Set Header label dynamically if shopping from a different restaurant
    const basketTitle = document.querySelector('.sidebar-cart-title span');
    if (basketTitle) {
      if (cart.restaurantId !== restaurant.id) {
        basketTitle.innerHTML = `Basket <small style="font-size: 0.7rem; color: var(--primary); display:block; font-weight:600;">(from ${cart.restaurantName})</small>`;
      } else {
        basketTitle.textContent = 'Your Basket';
      }
    }

    // Populate item rows
    cart.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'sidebar-item-row';
      row.innerHTML = `
        <div class="sidebar-item-details">
          <div class="sidebar-item-name">${item.name}</div>
          <div class="sidebar-item-qty">Qty: ${item.quantity}</div>
        </div>
        <div class="sidebar-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      `;
      cartItemsContainer.appendChild(row);
    });

    // We need to calculate delivery fee. If cart restaurant matches the current active restaurant,
    // we use active restaurant's delivery fee. Otherwise, we look up the delivery fee from RESTAURANTS_DATA.
    let cartDeliveryFee = 2.00;
    const cartRestaurant = RESTAURANTS_DATA.find(r => r.id === cart.restaurantId);
    if (cartRestaurant) {
      cartDeliveryFee = cartRestaurant.deliveryFee;
    }

    const totals = getCartTotal(cartDeliveryFee);
    subtotalEl.textContent = `$${totals.subtotal}`;
    deliveryEl.textContent = totals.deliveryFee === "0.00" ? 'Free' : `$${totals.deliveryFee}`;
    taxEl.textContent = `$${totals.tax}`;
    totalEl.textContent = `$${totals.total}`;

    // Enable button
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = `Checkout ($${totals.total})`;
  }

  // Initial render of sidebar
  renderSidebarCart();

  // Listen for the custom cartUpdated event dispatched from cart.js
  window.addEventListener('cartUpdated', renderSidebarCart);
});
