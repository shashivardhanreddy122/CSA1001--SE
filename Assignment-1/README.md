# QuickBite | Food Delivery & Restaurant Ordering System

A fully static, high-fidelity, and responsive website simulating a complete Food Delivery and Restaurant Ordering System. This project is built using only standard semantic **HTML5**, modern **CSS3** styling, and vanilla **JavaScript** (ES6+), with **no frameworks, no backends, and no databases**.

Data state management and order placement tracking are simulated entirely using browser-native `localStorage` to sync the state between client-side ordering flows and administrative manager interfaces.

## 🚀 Live Demo & How to Run

Since the application is built entirely of client-side static code:
1. Clone or download this project directory.
2. Open [index.html](index.html) directly in any modern web browser (Google Chrome, Firefox, Safari, Edge) to run it.
3. *Alternative:* Run a simple local development server of your choice:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve` or `live-server`

---

## 🛠 Tech Stack

*   **HTML5**: Semantic tags (`header`, `main`, `aside`, `section`, `footer`) for accessibility and structured layout.
*   **CSS3**: Custom properties (CSS variables) for design tokens, flexbox/grid for layouts, responsive media queries, glassmorphism UI headers, and smooth keyframe status transitions.
*   **Vanilla JavaScript (ES6)**: Dom manipulation, URL parameter parsing, custom events, localStorage API, state transitions, and interval loop tracking.
*   **External Assets**: Google Fonts ("Outfit" and "Plus Jakarta Sans") for premium branding typography, and Font Awesome CDN for operational icons.

---

## 📁 File Structure

```
food-delivery-website/
├── index.html          # Homepage. Lists available mock restaurants with search and cuisine filtering.
├── menu.html           # Restaurant Menu. Shows detailed menu items and has a live sidebar basket summary.
├── cart.html           # Checkout Basket. Lists items, allows adjusting quantities, and submits the order form.
├── tracking.html       # Order Live Tracker. Visualizes order status stepper with auto-progression updates.
├── dashboard.html      # Merchant Dashboard. Displays orders table and analytics; updates order status.
├── css/
│   └── style.css       # Clean, modern, responsive stylesheet for all pages (with HSL colors).
└── js/
    ├── data.js         # Mock database storing restaurant menus and delivery specifications.
    ├── cart.js         # Library for cart modifications, totals math, storage sync, and custom notifications.
    ├── menu.js         # Parses URL queries to render the selected restaurant menu.
    ├── tracking.js     # Automates progression (Placed -> Preparing -> Out for Delivery -> Delivered).
    └── dashboard.js    # Merchant operations tool. Displays stats metrics and triggers manual status overrides.
```

---

## 🎯 Core Features & User Journey

1.  **Browse & Discover**:
    *   Navigate the homepage containing a clean card layout of 5 premium mock restaurants (Burger Craft, Bella Italia, Sakura Sushi, Verde Salad & Co., Sweet Retreat).
    *   Search by restaurant name or filter using category chips (Burgers, Italian, Japanese, Healthy, Desserts).
2.  **Add to Basket**:
    *   View restaurant menus dynamically mapped from `data.js`.
    *   Add items to the cart. If you try to add items from another restaurant, the cart system prompts you to confirm clearing items from the first restaurant before switching.
    *   Review cart details instantly in the sticky side panel basket showing the subtotal, delivery fee, tax, and grand total.
3.  **Checkout Process**:
    *   Manage quantities (+/-) or delete items on the Cart page.
    *   Fill out the delivery contact details and payment options (Cash on Delivery or Card). Simulated card inputs display conditionally.
    *   Placing the order saves a new order object to `localStorage` and clears the checkout cart.
4.  **Order Tracking**:
    *   The tracking page maps progress stepper circles.
    *   **Automated progression** progresses the order status automatically every 5 seconds (Placed ➔ Preparing ➔ Out for Delivery ➔ Delivered) and saves the changes back to `localStorage`.
5.  **Manager Dashboard**:
    *   Open the operational control dashboard to view business metrics: Total Revenue, Total Orders, Active Orders, and Average Ticket Size.
    *   View a table list of all submitted orders sorted by placement time (newest first).
    *   Manually change statuses of active orders (e.g. advance *Placed* to *Preparing* to *Out for Delivery* to *Delivered*).
    *   Manual status shifts reflect instantly in the client's Tracking page tab due to storage listener syncing!
