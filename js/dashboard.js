/**
 * Restaurant Manager Dashboard Logic for QuickBite
 * Populates operational statistics and displays order tables with actions
 * to manually progress statuses, syncing changes back to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('dashboard-orders-tbody');
  const emptyState = document.getElementById('dashboard-empty-state');
  const refreshBtn = document.getElementById('refresh-dashboard-btn');

  // Stats Elements
  const revenueEl = document.getElementById('stats-revenue');
  const ordersEl = document.getElementById('stats-orders');
  const activeEl = document.getElementById('stats-active');
  const averageEl = document.getElementById('stats-average');

  /**
   * Retrieves all orders from localStorage
   */
  function getOrders() {
    const ordersData = localStorage.getItem('quickbite_orders');
    if (ordersData) {
      try {
        return JSON.parse(ordersData);
      } catch (e) {
        console.error("Error parsing orders data", e);
        return [];
      }
    }
    return [];
  }

  /**
   * Updates an order's status in localStorage and refreshes the view
   */
  function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index > -1) {
      orders[index].status = newStatus;
      localStorage.setItem('quickbite_orders', JSON.stringify(orders));
      showToast(`Order ${orderId} updated to: ${newStatus}`);
      renderDashboard();
    }
  }

  /**
   * Formats status label to a clean human-readable text
   */
  function formatStatusClass(status) {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Calculates metrics and renders the orders table
   */
  function renderDashboard() {
    const orders = getOrders();

    // 1. Calculate & Render Stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total), 0);
    const activeOrders = orders.filter(o => o.status !== 'Delivered').length;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    revenueEl.textContent = `$${totalRevenue.toFixed(2)}`;
    ordersEl.textContent = totalOrders;
    activeEl.textContent = activeOrders;
    averageEl.textContent = `$${avgTicket.toFixed(2)}`;

    // 2. Clear table body
    tbody.innerHTML = '';

    if (totalOrders === 0) {
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';

    // Sort orders by timestamp descending (newest first)
    const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

    // 3. Populate Table Rows
    sortedOrders.forEach(order => {
      const tr = document.createElement('tr');
      
      // Format date/time
      const dateStr = new Date(order.timestamp).toLocaleDateString();
      const timeStr = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Generate items HTML
      let itemsHtml = '<ul class="order-items-list">';
      order.items.forEach(item => {
        itemsHtml += `<li>${item.name} <strong>x${item.quantity}</strong></li>`;
      });
      itemsHtml += '</ul>';

      // Build Action buttons cell
      let actionButtons = '';
      if (order.status === 'Placed') {
        actionButtons = `<button class="action-btn btn-prep" data-id="${order.id}">Accept & Prepare</button>`;
      } else if (order.status === 'Preparing') {
        actionButtons = `<button class="action-btn btn-out" data-id="${order.id}">Dispatch Rider</button>`;
      } else if (order.status === 'Out for Delivery') {
        actionButtons = `<button class="action-btn btn-del" data-id="${order.id}">Mark Delivered</button>`;
      } else if (order.status === 'Delivered') {
        actionButtons = `<span style="color: var(--success); font-weight:700;"><i class="fa-solid fa-circle-check"></i> Completed</span>`;
      }

      // Add a status CSS class name mapping
      const statusClass = formatStatusClass(order.status);

      tr.innerHTML = `
        <td class="order-id">${order.id}</td>
        <td>
          <div style="font-weight:600;">${timeStr}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</div>
        </td>
        <td>
          <div style="font-weight:700; color:var(--secondary);">${order.customer.name}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:2px;"><i class="fa-solid fa-phone" style="font-size:0.7rem;"></i> ${order.customer.phone}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.2; max-width:180px;"><i class="fa-solid fa-house" style="font-size:0.7rem;"></i> ${order.customer.address}</div>
        </td>
        <td style="font-weight:600; color:var(--secondary);">${order.restaurantName}</td>
        <td>${itemsHtml}</td>
        <td class="order-price">$${parseFloat(order.total).toFixed(2)}</td>
        <td>
          <span class="status-badge ${statusClass}">${order.status}</span>
        </td>
        <td class="dashboard-action-btns">
          ${actionButtons}
        </td>
      `;

      // Attach button event handlers
      const actionBtn = tr.querySelector('.action-btn');
      if (actionBtn) {
        actionBtn.addEventListener('click', (e) => {
          const orderId = e.target.getAttribute('data-id');
          if (order.status === 'Placed') {
            updateOrderStatus(orderId, 'Preparing');
          } else if (order.status === 'Preparing') {
            updateOrderStatus(orderId, 'Out for Delivery');
          } else if (order.status === 'Out for Delivery') {
            updateOrderStatus(orderId, 'Delivered');
          }
        });
      }

      tbody.appendChild(tr);
    });
  }

  // Refresh button event listener
  refreshBtn.addEventListener('click', () => {
    renderDashboard();
    showToast("Dashboard refreshed successfully!");
  });

  // Initial render
  renderDashboard();

  // Polling check: check localStorage changes occasionally in case another window updates it
  window.addEventListener('storage', (e) => {
    if (e.key === 'quickbite_orders') {
      renderDashboard();
    }
  });
});
