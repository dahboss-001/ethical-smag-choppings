/* =========================================================
   ETHICAL SMAG CHOPPINGS — SITE CONFIG (edit this file only)
   Prices are typical Awka restaurant prices in Naira (₦).
   Update any price below and the whole site updates.
   ========================================================= */
const CONFIG = {
  businessName: "ETHICAL SMAG CHOPPINGS",
  whatsappNumber: "2349129898128",      // wa.me international format
  whatsappDisplay: "0912 989 8128",
  email: "",                             // optional: add an email to enable "Order by email"
  isPlaceholder: false,
  paymentBank: "OPay",
  paymentAccount: "9129898128",   // no account name given

  currency: "₦",
  timezone: "Africa/Lagos",
  // Saturday-only service. Orders before cutoff count for that Saturday.
  cutoffDay: 6,           // 6 = Saturday
  cutoffHour: 8,          // 8:00 AM Lagos time
  saturdaysToShow: 4,
  timeSlots: ["Morning (9 AM – 12 PM)", "Afternoon (12 PM – 4 PM)", "Evening (4 PM – 7 PM)"],
  deliveryAreas: ["Okpuno", "Unizik Junction", "Goodwill Junction", "Isuaniocha", "Regina", "Aroma"],
  deliveryFee: 0,         // free delivery within listed areas
  // Promo counts "plates" = items in categories marked plate:true (rice, soups, specials). Drinks/sides never count.
  promoMinPlates: 3,
  promoDiscountPercent: 10,
  promoExtra: "free drink",

  menu: [
    { cat: "Rice Dishes", plate: true, items: [
      { id: "jollof", name: "Jollof Rice", desc: "Smoky party jollof with chicken & dodo", price: 3500, img: "jollof" },
      { id: "fried-rice", name: "Fried Rice", desc: "Nigerian fried rice with veggies & beef", price: 3500, img: "fried-rice" },
      { id: "ofada", name: "Ofada Rice & Sauce", desc: "Local rice with ayamase stew, meat & egg", price: 4000, img: "ofada" },
      { id: "native-jollof", name: "Native (Palm-oil) Jollof", desc: "Palm-oil rice with smoked fish & greens", price: 3500, img: "native-jollof" },
      { id: "coconut-rice", name: "Coconut Rice", desc: "Fragrant coconut rice with shrimp & veggies", price: 4000, img: "coconut-rice" }
    ]},
    { cat: "Soups (with swallow)", plate: true, note: "Each soup comes with your choice of swallow — add it below.", items: [
      { id: "egusi", name: "Egusi Soup", desc: "Melon seed soup with meat & stockfish", price: 4000, img: "egusi" },
      { id: "onugbu", name: "Ofe Onugbu (Bitterleaf)", desc: "Classic Igbo bitterleaf soup", price: 4500, img: "onugbu" },
      { id: "oha", name: "Oha Soup", desc: "Oha leaves in rich palm-oil broth", price: 4500, img: "oha" },
      { id: "okra", name: "Okra Soup", desc: "Fresh okra with beef, fish & shrimp", price: 3500, img: "okra" },
      { id: "afang", name: "Afang Soup", desc: "Afang & waterleaf with periwinkle", price: 5000, img: "afang" },
      { id: "banga", name: "Banga Soup (Ofe Akwu)", desc: "Palm-nut soup with catfish", price: 5000, img: "banga" },
      { id: "ogbono", name: "Ogbono Soup", desc: "Draw soup with ugu, meat & fish", price: 4000, img: "ogbono" },
      { id: "edikang", name: "Edikang Ikong", desc: "Rich ugu & waterleaf vegetable soup", price: 5500, img: "edikang" },
      { id: "efo", name: "Efo Riro (Vegetable Soup)", desc: "Spinach in pepper stew with assorted meat", price: 4000, img: "efo" },
      { id: "nsala", name: "Ofe Nsala (White Soup)", desc: "Peppery white soup with catfish", price: 5500, img: "nsala" },
      { id: "owerri", name: "Ofe Owerri", desc: "Loaded vegetable soup with snails & stockfish", price: 6000, img: "owerri" }
    ]},
    { cat: "Swallow", items: [
      { id: "eba", name: "Eba", desc: "Garri swallow (1 wrap)", price: 500, img: "eba" },
      { id: "pounded-yam", name: "Pounded Yam", desc: "Smooth pounded yam (1 wrap)", price: 1000, img: "pounded-yam" },
      { id: "fufu", name: "Fufu (Akpu)", desc: "Cassava fufu (1 wrap)", price: 500, img: "fufu" },
      { id: "semo", name: "Semo", desc: "Semovita swallow (1 wrap)", price: 600, img: "semo" }
    ]},
    { cat: "Specials", plate: true, items: [
      { id: "abacha", name: "Abacha (African Salad)", desc: "With ugba, garden egg & fried fish", price: 3000, img: "abacha" },
      { id: "nkwobi", name: "Nkwobi", desc: "Spicy cow foot in palm-oil sauce", price: 6000, img: "nkwobi" },
      { id: "isi-ewu", name: "Isi Ewu", desc: "Spicy goat head delicacy", price: 8000, img: "isi-ewu" },
      { id: "goat-pepper", name: "Goat Meat Pepper Soup", desc: "Hot & spicy with scent leaves", price: 4000, img: "goat-pepper" },
      { id: "catfish-pepper", name: "Catfish Pepper Soup", desc: "Fresh catfish in pepper soup", price: 5000, img: "catfish-pepper" },
      { id: "agoyin", name: "Beans & Plantain (Ewa Agoyin)", desc: "Mashed beans, agoyin sauce & dodo", price: 2500, img: "agoyin" },
      { id: "asaro", name: "Yam Porridge (Asaro)", desc: "Yam in palm-oil pepper sauce with fish", price: 3000, img: "asaro" },
      { id: "yam-egg", name: "Boiled Yam & Egg Sauce", desc: "Soft yam with tomato egg sauce", price: 2500, img: "yam-egg" }
    ]},
    { cat: "Proteins", items: [
      { id: "chicken", name: "Peppered Chicken", desc: "Fried chicken in pepper sauce (1 piece)", price: 2000, img: "chicken" },
      { id: "turkey", name: "Peppered Turkey", desc: "Fried turkey in pepper sauce (1 piece)", price: 3000, img: "turkey" },
      { id: "snail", name: "Peppered Snail", desc: "Juicy snails in spicy sauce", price: 3500, img: "snail" },
      { id: "gizdodo", name: "Gizdodo", desc: "Gizzard & plantain in pepper sauce", price: 3000, img: "gizdodo" }
    ]},
    { cat: "Sides & Snacks", items: [
      { id: "moimoi", name: "Moi Moi", desc: "Steamed bean pudding with egg", price: 800, img: "moimoi" },
      { id: "dodo", name: "Fried Plantain (Dodo)", desc: "Sweet fried ripe plantain", price: 700, img: "dodo" },
      { id: "meatpie", name: "Meat Pie", desc: "Flaky pastry with minced beef", price: 1000, img: "meatpie" },
      { id: "puffpuff", name: "Puff Puff (portion)", desc: "Soft sweet fried dough balls", price: 500, img: "puffpuff" },
      { id: "suya", name: "Suya", desc: "Spicy grilled beef with onions", price: 1500, img: "suya" },
      { id: "akara", name: "Akara (portion)", desc: "Crispy bean fritters", price: 500, img: "akara" }
    ]},
    { cat: "Drinks", drinks: true, items: [
      { id: "zobo", name: "Zobo", desc: "Chilled hibiscus drink", price: 500, img: "zobo" },
      { id: "chapman", name: "Chapman", desc: "Fruity Nigerian mocktail", price: 1500, img: "chapman" },
      { id: "softdrink", name: "Soft Drink", desc: "Assorted chilled bottle", price: 500, img: "softdrinks" },
      { id: "water", name: "Bottled Water", desc: "Chilled 75cl", price: 300, img: "water" }
    ]}
  ]
};
