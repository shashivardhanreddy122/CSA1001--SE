/**
 * Order Tracking Logic for QuickBite
 * Displays live progress of the active order and simulates automatic progression
 * every 5 seconds, syncing updates to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tracking-container');
  const emptyState = document.getElementById('tracking-empty-state');
  
  // DOM Elements for details
  const orderIdEl = document.getElementById('track-order-id');
  const restaurantEl = document.getElementById('track-restaurant');
  const deliveryTimeEl = document.getElementById('track-delivery-time');
  const totalEl = document.getElementById('track-total-price');
  const statusMessageEl = document.getElementById('status-message');
  const animationGraphicEl = document.getElementById('animation-graphic');
  const itemsSummaryEl = document.getElementById('track-items-summary');

  // Stepper Elements
  const progressBar = document.getElementById('stepper-progress-bar');
  const stepPlaced = document.getElementById('step-placed');
  const stepPreparing = document.getElementById('step-preparing');
  const stepOut = document.getElementById('step-out-for-delivery');
  const stepDelivered = document.getElementById('step-delivered');

  let trackingInterval = null;
  let activeOrder = null;

  // Status mapping and details
  const STATUSES = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
  
  const STATUS_DETAILS = {
    'Placed': {
      message: 'We have received your order. The restaurant will accept it shortly!',
      graphic: `<div style="font-size: 4rem; animation: pulse 2s infinite;"><i class="fa-solid fa-receipt" style="color: var(--info);"></i></div>
                <p style="margin-top: 12px; font-weight:600; color:var(--text-muted);">Waiting for restaurant acceptance...</p>`,
      progressWidth: '0%'
    },
    'Preparing': {
      message: 'Your food is being hand-crafted by the chefs right now!',
      graphic: `<div style="font-size: 4rem; animation: spin 4s infinite linear;"><i class="fa-solid fa-fire-burner" style="color: var(--warning);"></i></div>
                <p style="margin-top: 12px; font-weight:600; color:var(--text-muted);">Kitchen is preparing your meal...</p>`,
      progressWidth: '33%'
    },
    'Out for Delivery': {
      message: 'Your courier has picked up the food and is riding to your address!',
      graphic: `<div style="font-size: 4rem; animation: bounce 1.5s infinite;"><i class="fa-solid fa-motorcycle" style="color: var(--primary);"></i></div>
                <p style="margin-top: 12px; font-weight:600; color:var(--text-muted);">Rider is on the way...</p>`,
      progressWidth: '66%'
    },
    'Delivered': {
      message: 'Order delivered! Thank you for ordering from QuickBite.',
      graphic: `<div style="font-size: 4.5rem; animation: popBadge 0.5s ease-out;"><i class="fa-solid fa-face-smile" style="color: var(--success);"></i></div>
                <p style="margin-top: 12px; font-weight:700; color:var(--success);">Enjoy your food!</p>`,
      progressWidth: '100%'
    }
  };

  // Add styles dynamically for animations
  const animStyles = document.createElement('style');
  animStyles.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
  `;
  document.head.appendChild(animStyles);

  /**
   * Fetches active order from localStorage using the saved tracking ID
   * or falls back to the absolute latest order.
   */
  function fetchActiveOrder() {
    const ordersData = localStorage.getItem('quickbite_orders');
    if (!ordersData) return null;

    try {
      const orders = JSON.parse(ordersData);
      if (orders.length === 0) return null;

      const activeId = localStorage.getItem('quickbite_active_tracking_id');
      if (activeId) {
        const found = orders.find(o => o.id === activeId);
        if (found) return found;
      }

      // Fallback: return latest order
      return orders[orders.length - 1];
    } catch (e) {
      console.error("Error parsing orders data", e);
      return null;
    }
  }

  /**
   * Updates status of the active order in the orders array inside localStorage
   */
  function updateOrderStatusInStore(orderId, newStatus) {
    const ordersData = localStorage.getItem('quickbite_orders');
    if (!ordersData) return;

    try {
      const orders = JSON.parse(ordersData);
      const index = orders.findIndex(o => o.id === orderId);
      if (index > -1) {
        orders[index].status = newStatus;
        localStorage.setItem('quickbite_orders', JSON.stringify(orders));
      }
    } catch (e) {
      console.error("Error updating order status in store", e);
    }
  }

  /**
   * Redraws the stepper indicators based on status
   */
  function renderStepper(status) {
    const details = STATUS_DETAILS[status] || STATUS_DETAILS['Placed'];

    // Reset all steps
    [stepPlaced, stepPreparing, stepOut, stepDelivered].forEach(step => {
      step.classList.remove('active', 'completed');
    });

    statusMessageEl.textContent = details.message;
    animationGraphicEl.innerHTML = details.graphic;
    
    // Set widths (handling vertical checklist sizing in mobile media queries if needed)
    if (window.innerWidth <= 768) {
      progressBar.style.width = '4px'; // width holds constraint, height grows
      progressBar.style.height = details.progressWidth;
    } else {
      progressBar.style.height = '4px';
      progressBar.style.width = details.progressWidth;
    }

    // Progression CSS states mapping
    if (status === 'Placed') {
      stepPlaced.classList.add('active');
    } else if (status === 'Preparing') {
      stepPlaced.classList.add('completed');
      stepPreparing.classList.add('active');
    } else if (status === 'Out for Delivery') {
      stepPlaced.classList.add('completed');
      stepPreparing.classList.add('completed');
      stepOut.classList.add('active');
    } else if (status === 'Delivered') {
      stepPlaced.classList.add('completed');
      stepPreparing.classList.add('completed');
      stepOut.classList.add('completed');
      stepDelivered.classList.add('completed', 'active');
    }
  }

  /**
   * Initializes the view with details of the active order
   */
  function initTracking() {
    activeOrder = fetchActiveOrder();

    if (!activeOrder) {
      container.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    container.style.display = 'block';
    emptyState.style.display = 'none';

    // Populate static data
    orderIdEl.textContent = activeOrder.id;
    restaurantEl.textContent = activeOrder.restaurantName;
    totalEl.textContent = `$${activeOrder.total}`;
    
    // Estimated delivery time defaults or looks up restaurant estimation
    const restObj = RESTAURANTS_DATA.find(r => r.id === activeOrder.restaurantId);
    if (restObj) {
      deliveryTimeEl.textContent = restObj.deliveryTime;
    }

    // Populate items list
    itemsSummaryEl.innerHTML = '';
    activeOrder.items.forEach(item => {
      const li = document.createElement('li');
      li.style.cssText = `
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-main);
      `;
      li.innerHTML = `
        <span>${item.name} <strong style="color: var(--text-muted);">x${item.quantity}</strong></span>
        <span style="font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      itemsSummaryEl.appendChild(li);
    });

    // Populate initial stepper status
    renderStepper(activeOrder.status);

    // Setup timer to simulate progression
    startProgressionTimer();
  }

  /**
   * Simulated timer which runs every 5 seconds to advance the order status
   */
  function startProgressionTimer() {
    if (trackingInterval) clearInterval(trackingInterval);

    // If order is already delivered, do not start progression
    if (activeOrder.status === 'Delivered') return;

    trackingInterval = setInterval(() => {
      // 1. Reload the order from storage to check for external updates from dashboard
      const reloadedOrder = fetchActiveOrder();
      if (!reloadedOrder) {
        clearInterval(trackingInterval);
        return;
      }

      // If status was changed to Delivered externally, stop timer
      if (reloadedOrder.status === 'Delivered') {
        activeOrder = reloadedOrder;
        renderStepper(activeOrder.status);
        clearInterval(trackingInterval);
        return;
      }

      // If status changed externally, update our current local object
      if (reloadedOrder.status !== activeOrder.status) {
        activeOrder = reloadedOrder;
        renderStepper(activeOrder.status);
        // Continue from the new status
      }

      // 2. Find next status
      const currentIdx = STATUSES.indexOf(activeOrder.status);
      if (currentIdx > -1 && currentIdx < STATUSES.length - 1) {
        const nextStatus = STATUSES[currentIdx + 1];
        
        // Update local object status
        activeOrder.status = nextStatus;
        
        // Update localStorage
        updateOrderStatusInStore(activeOrder.id, nextStatus);
        
        // Re-render stepper
        renderStepper(nextStatus);

        // If newly reached Delivered, clear interval
        if (nextStatus === 'Delivered') {
          clearInterval(trackingInterval);
        }
      }
    }, 5000); // 5000ms = 5 seconds
  }

  // Handle window resizing to redraw stepper line correctly (vertical vs horizontal)
  window.addEventListener('resize', () => {
    if (activeOrder) {
      renderStepper(activeOrder.status);
    }
  });

  // Start tracking lifecycle
  initTracking();
});
