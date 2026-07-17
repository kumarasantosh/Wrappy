"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CategoryId =
  | "wraps"
  | "fries"
  | "pizza"
  | "sandwiches"
  | "thickshakes"
  | "mojitos"
  | "desserts"
  | "brownie-bowls";

type MenuItem = {
  name: string;
  price?: number;
  category: CategoryId;
  badge?: string;
  desc?: string;
  veg?: boolean;
};

type Category = {
  id: CategoryId;
  label: string;
  ghost: string;
  tagline: string;
  accent: string;
  chip: string;
  glow: string;
  bar: string;
};

const categories: Category[] = [
  {
    id: "wraps",
    label: "Wraps",
    ghost: "WRAPS",
    tagline: "Fresh-rolled, loaded, and sauced to order.",
    accent: "text-wrappy-red",
    chip: "bg-wrappy-red/15 text-wrappy-red",
    glow: "hover:border-wrappy-red/60",
    bar: "from-wrappy-red to-wrappy-orange",
  },
  {
    id: "fries",
    label: "Fries",
    ghost: "FRIES",
    tagline: "Crispy golden fries — seasoned or fully loaded.",
    accent: "text-wrappy-orange",
    chip: "bg-wrappy-orange/15 text-wrappy-orange",
    glow: "hover:border-wrappy-orange/60",
    bar: "from-wrappy-orange to-wrappy-red",
  },
  {
    id: "pizza",
    label: "Pizza",
    ghost: "PIZZA",
    tagline: "Hand-stretched bases with loaded toppings.",
    accent: "text-wrappy-red",
    chip: "bg-wrappy-red/15 text-wrappy-red",
    glow: "hover:border-wrappy-red/60",
    bar: "from-wrappy-red to-wrappy-orange",
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    ghost: "SANDWICH",
    tagline: "Grilled, stuffed, and toasted golden.",
    accent: "text-wrappy-lime",
    chip: "bg-wrappy-lime/15 text-wrappy-lime",
    glow: "hover:border-wrappy-lime/60",
    bar: "from-wrappy-lime to-wrappy-orange",
  },
  {
    id: "thickshakes",
    label: "Thickshakes",
    ghost: "SHAKES",
    tagline: "Thick. Cold. Dangerously good.",
    accent: "text-wrappy-orange",
    chip: "bg-wrappy-orange/15 text-wrappy-orange",
    glow: "hover:border-wrappy-orange/60",
    bar: "from-wrappy-orange to-wrappy-red",
  },
  {
    id: "mojitos",
    label: "Mojitos",
    ghost: "MOJITOS",
    tagline: "Fizzy, minty, ice-cold refreshers.",
    accent: "text-wrappy-lime",
    chip: "bg-wrappy-lime/15 text-wrappy-lime",
    glow: "hover:border-wrappy-lime/60",
    bar: "from-wrappy-lime to-wrappy-orange",
  },
  {
    id: "desserts",
    label: "Desserts",
    ghost: "SWEET",
    tagline: "Sundaes and overloads worth the spoon fight.",
    accent: "text-wrappy-red",
    chip: "bg-wrappy-red/15 text-wrappy-red",
    glow: "hover:border-wrappy-red/60",
    bar: "from-wrappy-red to-wrappy-orange",
  },
  {
    id: "brownie-bowls",
    label: "Brownie Bowls",
    ghost: "BROWNIE",
    tagline: "Warm, gooey, straight out of the oven.",
    accent: "text-wrappy-orange",
    chip: "bg-wrappy-orange/15 text-wrappy-orange",
    glow: "hover:border-wrappy-orange/60",
    bar: "from-wrappy-orange to-wrappy-lime",
  },
];

const items: MenuItem[] = [
  // Wraps
  {
    name: "Classic Veg",
    price: 119,
    category: "wraps",
    veg: true,
    desc: "Simple, fresh & satisfying.",
  },
  {
    name: "Classic Non Veg",
    price: 119,
    category: "wraps",
    veg: false,
    desc: "Classic flavours, meaty delight.",
  },
  {
    name: "Crispy Paneer Wrap",
    price: 159,
    category: "wraps",
    veg: true,
    desc: "Crispy paneer with spicy sauce & veggies.",
  },
  {
    name: "Chilli Paneer Wrap",
    price: 169,
    category: "wraps",
    veg: true,
    desc: "Spicy chilli paneer with sauce & crunchy veggies.",
  },
  {
    name: "Crispy Mushroom Wrap",
    price: 159,
    category: "wraps",
    veg: true,
    desc: "Crispy mushroom with sauce & fresh veggies.",
  },
  {
    name: "Crispy Chicken Wrap",
    price: 159,
    category: "wraps",
    veg: false,
    desc: "Crispy chicken with sauce & fresh veggies.",
  },
  {
    name: "Chilli Chicken Wrap",
    price: 169,
    category: "wraps",
    veg: false,
    desc: "Spicy chilli chicken with sauce & crunchy veggies.",
  },
  {
    name: "Smoky Tandoori Chicken",
    price: 169,
    category: "wraps",
    veg: false,
    desc: "Smoky tandoori chicken with onion & mint sauce.",
  },
  {
    name: "Cheesy Mexican Chicken",
    price: 179,
    category: "wraps",
    veg: false,
    desc: "Mexican spices with chicken, cheese & veggies.",
  },
  {
    name: "Fully Loaded Chicken Wrap",
    price: 179,
    category: "wraps",
    veg: false,
    badge: "Bestseller",
    desc: "Loaded with chicken, sauce, cheese & crunchy veggies.",
  },
  {
    name: "Cheese Overload Wrap",
    price: 189,
    category: "wraps",
    veg: true,
    desc: "Cheesy, creamy & loaded with flavours.",
  },
  // Fries
  {
    name: "Classic Fries",
    price: 99,
    category: "fries",
    veg: true,
    desc: "Choose your seasoning — Peri Peri, Indian Masala, Herbs N Spices or Cheese (+₹9).",
  },
  { name: "Crispy Chicken Fries", price: 159, category: "fries", veg: false },
  { name: "Chicken Keema Fries", price: 159, category: "fries", veg: false },
  { name: "BBQ Chicken Fries", price: 159, category: "fries", veg: false },
  {
    name: "Chipotle Chicken Fries",
    price: 159,
    category: "fries",
    veg: false,
    badge: "Must Try",
  },
  { name: "Crispy Paneer Fries", price: 159, category: "fries", veg: true },
  { name: "Crispy Mushroom Fries", price: 159, category: "fries", veg: true },
  {
    name: "Mexican Nacho Fries",
    price: 159,
    category: "fries",
    veg: true,
    badge: "Bestseller",
  },
  { name: "Cheesy Fries", price: 159, category: "fries", veg: true },
  {
    name: "Crispy Chicken Strips",
    price: 159,
    category: "fries",
    veg: false,
  },
  { name: "Paneer / Chicken Popcorn", price: 159, category: "fries" },
  {
    name: "Golden Chicken Nuggets",
    price: 99,
    category: "fries",
    veg: false,
  },
  { name: "Aloo Tikki", price: 99, category: "fries", veg: true },
  // Pizza
  {
    name: "Margherita",
    price: 159,
    category: "pizza",
    veg: true,
    desc: "Classic pizza with mozzarella cheese and rich tomato basil sauce.",
  },
  {
    name: "Pesto Paneer",
    price: 199,
    category: "pizza",
    veg: true,
    desc: "Basil pesto sauce, marinated paneer, mozzarella, onions, and capsicum.",
  },
  {
    name: "Mexican Veg",
    price: 199,
    category: "pizza",
    veg: true,
    desc: "Mexican sauce, sweet corn, bell peppers, onions, jalapeños, olives, and cheese.",
  },
  {
    name: "Paneer Tikka",
    price: 199,
    category: "pizza",
    veg: true,
    desc: "Tandoori paneer, onions, capsicum, mozzarella, and tikka sauce.",
  },
  {
    name: "Chef Special (Veg)",
    price: 209,
    category: "pizza",
    veg: true,
    desc: "Signature house pizza with premium veggies, special sauce, and loaded cheese.",
  },
  {
    name: "Chicken Tikka",
    price: 199,
    category: "pizza",
    veg: false,
    desc: "Tandoori chicken, onions, capsicum, mozzarella, and tikka sauce.",
  },
  {
    name: "Pesto Chicken",
    price: 209,
    category: "pizza",
    veg: false,
    desc: "Grilled chicken with basil pesto, mozzarella, onions, and herbs.",
  },
  {
    name: "Chicken Dominator",
    price: 229,
    category: "pizza",
    veg: false,
    badge: "Must Try",
    desc: "Loaded with chicken tikka, peri peri chicken, grilled chicken, and loaded cheese.",
  },
  {
    name: "Chef Special (Non Veg)",
    price: 229,
    category: "pizza",
    veg: false,
    desc: "House-special chicken pizza with signature sauce and premium toppings.",
  },
  // Sandwiches
  { name: "Veg", price: 99, category: "sandwiches", veg: true },
  { name: "Paneer", price: 109, category: "sandwiches", veg: true },
  { name: "Chicken Tikka", price: 109, category: "sandwiches", veg: false },
  {
    name: "Peri Peri Chicken",
    price: 109,
    category: "sandwiches",
    veg: false,
  },
  {
    name: "Add-On Cheese",
    price: 39,
    category: "sandwiches",
    veg: true,
    desc: "Extra cheese for any sandwich.",
  },
  // Thickshakes
  { name: "Butterscotch Banana", price: 109, category: "thickshakes" },
  { name: "Mango / Strawberry", price: 129, category: "thickshakes" },
  { name: "Oreo", price: 139, category: "thickshakes", badge: "Bestseller" },
  { name: "Hard Rock Coffee", price: 139, category: "thickshakes" },
  { name: "Black Currant", price: 139, category: "thickshakes" },
  { name: "Dryfruit", price: 149, category: "thickshakes" },
  { name: "Belgian Chocolate", price: 149, category: "thickshakes" },
  {
    name: "Ferrero Automatic",
    price: 149,
    category: "thickshakes",
    badge: "Must Try",
  },
  { name: "Kitkat", price: 149, category: "thickshakes" },
  { name: "Belgium Coffee", price: 159, category: "thickshakes" },
  { name: "Nutella", price: 159, category: "thickshakes", badge: "Bestseller" },
  // Mojitos
  { name: "Blue Heaven", price: 119, category: "mojitos", badge: "Bestseller" },
  { name: "Virgin Mint Splash", price: 119, category: "mojitos" },
  { name: "Cool Mint Sparkle", price: 119, category: "mojitos" },
  { name: "Pineapple Breeze", price: 119, category: "mojitos" },
  { name: "Watermelon Breeze", price: 119, category: "mojitos" },
  { name: "Blueberry Fizz", price: 119, category: "mojitos" },
  // Desserts
  { name: "Fruit Salad with Icecream", price: 109, category: "desserts" },
  { name: "Chocolate Fudge Sundae", price: 109, category: "desserts" },
  { name: "Mexican Brownie Bliss", price: 109, category: "desserts" },
  { name: "American Dryfruit", price: 139, category: "desserts" },
  { name: "Royal Dry Fruit Sundae", price: 159, category: "desserts" },
  {
    name: "Death by Chocolate",
    price: 159,
    category: "desserts",
    badge: "Bestseller",
  },
  {
    name: "Nutella Brownie Indulgence",
    price: 159,
    category: "desserts",
    badge: "Must Try",
  },
  { name: "Fruit n Nut Overload", price: 159, category: "desserts" },
  // Brownie Bowls
  { name: "Double Chocolate Brownie", price: 119, category: "brownie-bowls" },
  {
    name: "Sizzling Brownie",
    price: 159,
    category: "brownie-bowls",
    badge: "Must Try",
  },
];

const seasonings = [
  "Peri Peri",
  "Indian Masala",
  "Herbs N Spices",
  "Cheese (+₹9)",
];

const sauces = [
  "Signature Mayo",
  "Ketchup",
  "Zesty Aioli",
  "Chipotle",
  "Fries Sauce",
  "Honey Mustard",
  "Sour Cream",
  "Creamy Cheese",
];

const dessertAddOns = [
  "Oreo Crumble",
  "Chocolate Chips",
  "Brownie",
  "Dry Fruits",
  "Icecream Scoop",
];

const filterPills: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wraps", label: "Wraps" },
  { id: "fries", label: "Fries" },
  { id: "pizza", label: "Pizza" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "thickshakes", label: "Thickshakes" },
  { id: "mojitos", label: "Mojitos" },
  { id: "desserts", label: "Desserts" },
  { id: "brownie-bowls", label: "Brownie Bowls" },
];

function CatIcon({
  id,
  className = "w-4 h-4",
}: {
  id: string;
  className?: string;
}) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
  };
  switch (id) {
    case "all":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "wraps":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-28 12 12)" />
          <path d="M8.5 10.5c2 1.5 5 1.5 7-1.5" />
        </svg>
      );
    case "fries":
      return (
        <svg {...p}>
          <path d="M5 9h14l-1.5 11h-11L5 9z" />
          <path d="M9 9V4" />
          <path d="M12 9V3" />
          <path d="M15 9V4" />
        </svg>
      );
    case "pizza":
      return (
        <svg {...p}>
          <path d="M12 21 4.5 6a17 17 0 0 1 15 0L12 21z" />
          <path d="M10 9h.01" />
          <path d="M14 11h.01" />
          <path d="M11.5 14h.01" />
        </svg>
      );
    case "sandwiches":
      return (
        <svg {...p}>
          <rect x="3" y="6.5" width="18" height="3.5" rx="1.75" />
          <rect x="3" y="14" width="18" height="3.5" rx="1.75" />
          <path d="m7 10 1.5 4" />
          <path d="m12 10 1.5 4" />
          <path d="m17 10 1.5 4" />
        </svg>
      );
    case "thickshakes":
      return (
        <svg {...p}>
          <path d="M7 8l1.5 12h7L17 8" />
          <path d="M6 8h12" />
          <path d="M12 8l2.5-5H17" />
          <path d="M8.5 13h7" />
        </svg>
      );
    case "mojitos":
      return (
        <svg {...p}>
          <path d="M5 4h14l-7 8-7-8z" />
          <path d="M12 12v7" />
          <path d="M8 21h8" />
        </svg>
      );
    case "desserts":
      return (
        <svg {...p}>
          <path d="M5 12h14a7 7 0 0 1-14 0z" />
          <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
          <path d="M12 8.5V6" />
        </svg>
      );
    case "brownie-bowls":
      return (
        <svg {...p}>
          <rect x="4" y="6" width="16" height="13" rx="2" />
          <path d="M9 11h.01" />
          <path d="M15 11h.01" />
          <path d="M12 15h.01" />
        </svg>
      );
    case "sauces":
      return (
        <svg {...p}>
          <path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10z" />
        </svg>
      );
    case "add-ons":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8.5v7" />
          <path d="M8.5 12h7" />
        </svg>
      );
    default:
      return null;
  }
}

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 flex-shrink-0 border-2 rounded-[3px] ${
        veg ? "border-green-500" : "border-red-600"
      }`}
      title={veg ? "Veg" : "Non-Veg"}
    >
      {veg ? (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      ) : (
        <span
          className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-red-600"
          style={{ marginTop: "-1px" }}
        />
      )}
    </span>
  );
}

export default function BhMenuPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | CategoryId>(
    "all",
  );
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = !q || item.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const isEmpty = filteredItems.length === 0;
  const showSaucesPanel =
    !search.trim() && (activeCategory === "all" || activeCategory === "fries");
  const showDessertAddOns = !search.trim() && activeCategory === "all";

  return (
    <main className="relative min-h-screen bg-wrappy-black text-wrappy-cream overflow-hidden">
      {/* Global ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-wrappy-red/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-wrappy-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-wrappy-lime/5 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3 text-wrappy-red text-xs font-semibold tracking-[0.25em] uppercase"
          >
            Wrapz N Fryz
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display mb-4"
          >
            Banjara Hills Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-wrappy-cream/60 max-w-xl mx-auto font-light"
          >
            Wraps, loaded fries, pizza, sandwiches, thick shakes, mojitos &amp;
            desserts. Search, filter, and find your next favourite.
          </motion.p>
        </div>
      </section>

      {/* Sticky search + filter bar */}
      <div className="sticky top-0 z-40 bg-wrappy-black/80 backdrop-blur-xl border-b border-wrappy-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search */}
          <div className="relative md:w-64 flex-shrink-0">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wrappy-cream/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the menu..."
              className="w-full bg-wrappy-cream/10 border border-wrappy-cream/15 rounded-full pl-11 pr-4 py-2.5 text-sm text-wrappy-cream placeholder-wrappy-cream/40 focus:outline-none focus:border-wrappy-red focus:bg-wrappy-cream/15 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 pb-0.5">
            {filterPills.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-wrappy-red text-wrappy-cream shadow-lg shadow-wrappy-red/40 scale-105"
                      : "bg-wrappy-cream/10 text-wrappy-cream/70 hover:bg-wrappy-cream/20 hover:text-wrappy-cream"
                  }`}
                >
                  <CatIcon id={cat.id} className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 md:pt-14">
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-wrappy-cream/50"
            >
              <svg
                className="w-10 h-10 mx-auto mb-4 text-wrappy-cream/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-lg font-semibold">
                No items match &quot;{search}&quot;
              </p>
              <p className="text-sm mt-1">
                Try a different search or category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {categories.map((cat) => {
          const catItems = filteredItems.filter((i) => i.category === cat.id);
          if (catItems.length === 0) return null;

          return (
            <div key={cat.id} className="relative mb-20 last:mb-8" id={cat.id}>
              {/* Ghost title */}
              <span
                aria-hidden
                className="pointer-events-none select-none absolute -top-8 left-0 text-[72px] md:text-[120px] font-extrabold font-display leading-none text-transparent opacity-[0.07]"
                style={{ WebkitTextStroke: "2px #f9f5ef" }}
              >
                {cat.ghost}
              </span>

              {/* Section header */}
              <div className="relative pt-8 md:pt-14 mb-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-display">
                      {cat.label}
                    </h2>
                    <p className="text-sm text-wrappy-cream/50 mt-2 font-light">
                      {cat.tagline}
                    </p>
                  </div>
                  <span
                    className={`hidden sm:inline-block text-xs font-bold uppercase tracking-widest ${cat.accent}`}
                  >
                    {catItems.length} {catItems.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div
                  className={`mt-4 h-1 w-24 rounded-full bg-gradient-to-r ${cat.bar}`}
                />
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {catItems.map((item, idx) => (
                  <motion.div
                    key={`${item.category}-${item.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                    className={`group relative rounded-2xl bg-gradient-to-br from-wrappy-cream/[0.08] to-wrappy-cream/[0.02] border border-wrappy-cream/10 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 ${cat.glow}`}
                  >
                    {item.badge && (
                      <span
                        className={`absolute -top-2.5 right-4 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          item.badge === "Bestseller"
                            ? "bg-wrappy-red text-wrappy-cream"
                            : "bg-wrappy-lime text-wrappy-black"
                        }`}
                      >
                        ★ {item.badge}
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      {item.veg !== undefined && (
                        <span className="mt-1">
                          <VegMark veg={item.veg} />
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-semibold text-wrappy-cream/90 group-hover:text-wrappy-cream transition-colors">
                            {item.name}
                          </span>
                          {typeof item.price === "number" && (
                            <>
                              <span className="flex-1 border-b border-dotted border-wrappy-cream/25 translate-y-[-3px]" />
                              <span
                                className={`flex-shrink-0 font-extrabold text-base rounded-full px-3 py-1 ${cat.chip}`}
                              >
                                ₹{item.price}
                              </span>
                            </>
                          )}
                        </div>
                        {item.desc && (
                          <p className="text-xs text-wrappy-cream/45 mt-1.5 font-light leading-relaxed pr-2">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Seasonings & sauces panel under Fries */}
              {cat.id === "fries" && showSaucesPanel && (
                <div className="mt-6 rounded-3xl border border-dashed border-wrappy-orange/30 bg-wrappy-orange/[0.04] p-6 md:p-8">
                  <div className="mb-5">
                    <h3 className="text-lg md:text-xl font-extrabold font-display">
                      Seasonings &amp; Sauces
                    </h3>
                    <p className="text-xs text-wrappy-cream/50 font-light mt-1">
                      Season your fries, then pick your dip.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-wrappy-orange mr-1">
                        Seasonings
                      </span>
                      {seasonings.map((s) => (
                        <span
                          key={s}
                          className="px-3.5 py-1.5 rounded-full bg-wrappy-black border border-wrappy-orange/40 text-wrappy-orange text-xs font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-wrappy-orange mr-1">
                        Sauces
                      </span>
                      {sauces.map((s) => (
                        <span
                          key={s}
                          className="px-3.5 py-1.5 rounded-full bg-wrappy-black border border-wrappy-cream/20 text-wrappy-cream/80 text-xs font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Dessert add-ons */}
        {showDessertAddOns && (
          <div className="relative mb-8" id="add-ons">
            <div className="rounded-3xl border border-dashed border-wrappy-lime/30 bg-wrappy-lime/[0.04] p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="flex-shrink-0">
                  <h3 className="text-lg md:text-xl font-extrabold font-display">
                    Dessert Add-Ons
                  </h3>
                  <p className="text-xs text-wrappy-cream/50 font-light mt-1">
                    Level up any shake or dessert.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {dessertAddOns.map((addOn) => (
                    <span
                      key={addOn}
                      className="px-4 py-2 rounded-full bg-wrappy-black border border-wrappy-lime/40 text-wrappy-lime text-sm font-semibold hover:bg-wrappy-lime/10 transition-colors"
                    >
                      {addOn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Minimal brand footer — standalone digital menu, no site navigation */}
      <div className="relative z-10 pb-10 text-center">
        <p className="font-serif text-lg font-bold text-wrappy-cream/80 mb-1">
          Wrapz <span className="text-wrappy-red">N</span> Fryz
        </p>
        <p className="text-xs text-wrappy-cream/40">
          Prices inclusive of taxes. Menu subject to change.
        </p>
      </div>
    </main>
  );
}
