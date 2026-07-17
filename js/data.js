/**
 * Mock data for QuickBite Food Delivery Website
 * This file contains hardcoded restaurant and menu details to simulate database responses.
 */

const RESTAURANTS_DATA = [
  {
    id: 1,
    name: "Burger Craft",
    cuisine: "American • Burgers • Fast Food",
    rating: 4.8,
    reviewsCount: 142,
    deliveryTime: "15-25 min",
    deliveryFee: 0.99,
    bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: 101,
        name: "Classic Cheeseburger",
        price: 12.99,
        description: "Flame-grilled Angus beef patty, cheddar cheese, crisp lettuce, tomato, pickles, and our signature sauce on a toasted brioche bun.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 102,
        name: "Bacon Avocado Burger",
        price: 14.99,
        description: "Angus beef patty with crispy smoked bacon, fresh avocado, swiss cheese, and garlic aioli.",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 103,
        name: "Truffle Parmesan Fries",
        price: 5.99,
        description: "Thick-cut golden fries tossed in truffle oil, grated parmesan, and fresh rosemary, served with garlic dip.",
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 104,
        name: "Crispy Chicken Tenders",
        price: 9.99,
        description: "Hand-breaded buttermilk chicken tenders served with honey mustard sauce and house slaw.",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 105,
        name: "Craft IPA Beer",
        price: 6.50,
        description: "Cold, refreshing local craft IPA with citrusy notes and a smooth finish.",
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
        popular: false
      }
    ]
  },
  {
    id: 2,
    name: "Bella Italia",
    cuisine: "Italian • Pasta • Stone-baked Pizza",
    rating: 4.9,
    reviewsCount: 289,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: 201,
        name: "Margherita Pizza",
        price: 14.99,
        description: "Classic pizza with San Marzano tomato sauce, fresh mozzarella di bufala, organic basil, and a drizzle of extra virgin olive oil.",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 202,
        name: "Handmade Fettuccine Alfredo",
        price: 16.99,
        description: "Rich and creamy Parmigiano-Reggiano cream sauce tossed with fresh handmade egg noodles, topped with parsley.",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 203,
        name: "Spicy Pepperoni & Hot Honey Pizza",
        price: 17.49,
        description: "Artisan pepperoni, fresh mozzarella, tomato sauce, spicy calabrian chili flakes, drizzled with hot organic honey.",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 204,
        name: "Garlic Butter Focaccia",
        price: 4.99,
        description: "Freshly baked focaccia bread brushed with garlic butter, rosemary, and sea salt, served with olive oil and balsamic.",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 205,
        name: "Classic Tiramisu",
        price: 7.99,
        description: "Layers of espresso-soaked ladyfingers, velvety mascarpone cream, and a dusting of premium dark cocoa powder.",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        popular: true
      }
    ]
  },
  {
    id: 3,
    name: "Sakura Sushi",
    cuisine: "Japanese • Sushi • Ramen",
    rating: 4.7,
    reviewsCount: 198,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    bannerImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: 301,
        name: "Signature Sushi Roll Combo",
        price: 22.99,
        description: "A combination of California Roll, Spicy Tuna Roll, and Rainbow Roll (18 pieces total), served with pickled ginger and wasabi.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 302,
        name: "Spicy Tonkotsu Ramen",
        price: 15.99,
        description: "Creamy pork broth with thin noodles, chashu pork, soft-boiled marinated egg, bamboo shoots, nori, and black garlic chili oil.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 303,
        name: "Salmon & Tuna Sashimi",
        price: 11.99,
        description: "6 pieces of fresh, thick-sliced Atlantic salmon and bigeye tuna sashimi, served over shredded daikon radish.",
        image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 304,
        name: "Pork Gyoza (6 pcs)",
        price: 6.99,
        description: "Pan-fried Japanese dumplings stuffed with seasoned ground pork and cabbage, served with a savory dipping sauce.",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 305,
        name: "Sweet Matcha Mochi Ice Cream",
        price: 5.99,
        description: "Three soft, chewy rice cakes filled with sweet premium matcha green tea ice cream.",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
        popular: false
      }
    ]
  },
  {
    id: 4,
    name: "Verde Salad & Co.",
    cuisine: "Healthy • Salads • Vegan Options",
    rating: 4.6,
    reviewsCount: 85,
    deliveryTime: "10-20 min",
    deliveryFee: 0.00,
    bannerImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: 401,
        name: "Quinoa Avocado Power Bowl",
        price: 13.49,
        description: "Warm organic quinoa, Hass avocado, roasted sweet potato, kale, edamame, pumpkin seeds, drizzled with lemon-tahini dressing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 402,
        name: "Harvest Apple & Goat Cheese Salad",
        price: 11.99,
        description: "Crisp mixed greens, sliced Honeycrisp apples, soft goat cheese crumbles, candied pecans, and dried cranberries with balsamic vinaigrette.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 403,
        name: "Superfood Acai Berry Bowl",
        price: 8.99,
        description: "Blended organic acai topped with gluten-free granola, sliced banana, strawberries, chia seeds, and a drizzle of organic honey.",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 404,
        name: "Green Detox Smoothie (16oz)",
        price: 6.99,
        description: "Freshly blended baby spinach, green apple, cucumber, ginger, lemon, celery, and cold-pressed coconut water.",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&w=800&q=80",
        popular: true
      }
    ]
  },
  {
    id: 5,
    name: "Sweet Retreat",
    cuisine: "Desserts • Sweet • Waffles",
    rating: 4.8,
    reviewsCount: 112,
    deliveryTime: "15-25 min",
    deliveryFee: 2.99,
    bannerImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: 501,
        name: "Strawberry Waffle Tower",
        price: 10.99,
        description: "Freshly baked Belgian waffle topped with fresh sliced strawberries, whipped cream, vanilla ice cream, and dark chocolate drizzle.",
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 502,
        name: "Gourmet Cupcake Box (4 Pack)",
        price: 12.00,
        description: "A selection of our popular cupcakes: Red Velvet, Double Chocolate, Salted Caramel, and Vanilla Bean.",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
        popular: true
      },
      {
        id: 503,
        name: "Fudge Brownie Sundae",
        price: 7.50,
        description: "Warm, fudgy chocolate brownie topped with two scoops of vanilla bean ice cream, hot fudge, and whipped cream.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        popular: false
      },
      {
        id: 504,
        name: "Iced Caramel Macchiato",
        price: 5.49,
        description: "Chilled espresso mixed with creamy whole milk, premium vanilla syrup, topped with sweet caramel drizzle.",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80",
        popular: false
      }
    ]
  }
];

// If using ES Modules or standard script inclusion, make it accessible globally
if (typeof window !== 'undefined') {
  window.RESTAURANTS_DATA = RESTAURANTS_DATA;
}
