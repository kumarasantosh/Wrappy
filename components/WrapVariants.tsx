'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const menuItems = {
  Wraps: [
    { id: 1, name: 'Classic Veggie', vegetarian: true, vegan: false, ingredients: 'Wheat tortilla, fresh vegetables, lettuce, tomato, and special sauce.' },
    { id: 2, name: 'Butter Garlic Mushroom', vegetarian: true, vegan: false, ingredients: 'Wheat tortilla, butter garlic mushrooms, vegetables, and herbs.' },
    { id: 3, name: 'Crispy Paneer', vegetarian: true, vegan: false, ingredients: 'Wheat tortilla, crispy paneer, vegetables, and tangy sauce.' },
    { id: 4, name: 'Cheesy Paneer', vegetarian: true, vegan: false, ingredients: 'Wheat tortilla, cheesy paneer, vegetables, and creamy sauce.' },
    { id: 5, name: 'Crispy Chicken', vegetarian: false, vegan: false, ingredients: 'Wheat tortilla, crispy fried chicken, vegetables, and mayo.' },
    { id: 6, name: 'Chilli Chicken', vegetarian: false, vegan: false, ingredients: 'Wheat tortilla, spicy chilli chicken, vegetables, and hot sauce.' },
    { id: 7, name: 'Smoky Tandoori Chicken', vegetarian: false, vegan: false, ingredients: 'Wheat tortilla, tandoori marinated chicken, vegetables, and mint sauce.' },
    { id: 8, name: 'Cheesy Mexican Chicken', vegetarian: false, vegan: false, ingredients: 'Wheat tortilla, Mexican spiced chicken, cheese, and salsa.' },
    { id: 9, name: 'Fully Loaded Chicken Wrap', vegetarian: false, vegan: false, ingredients: 'Wheat tortilla, grilled chicken, cheese, vegetables, and special sauce.' },
  ],
  Fries: [
    { id: 10, name: 'Classic Crispy Fries', vegetarian: true, vegan: true, ingredients: 'Golden crispy potato fries, perfectly seasoned.' },
    { id: 11, name: 'Peri Peri Fries', vegetarian: true, vegan: true, ingredients: 'Crispy fries tossed in spicy peri peri seasoning.' },
    { id: 12, name: 'Signature Mixed Fries', vegetarian: true, vegan: true, ingredients: 'A mix of crispy fries with special seasoning blend.' },
    { id: 13, name: 'Golden Chicken Nuggets', vegetarian: false, vegan: false, ingredients: 'Crispy golden chicken nuggets, perfectly fried.' },
    { id: 14, name: 'Crispy Chicken Strips', vegetarian: false, vegan: false, ingredients: 'Tender chicken strips, breaded and fried to perfection.' },
    { id: 15, name: 'Chicken-Loaded Crispy Fries', vegetarian: false, vegan: false, ingredients: 'Crispy fries loaded with chicken, cheese, and sauces.' },
    { id: 16, name: 'Cheesy Loaded Fries', vegetarian: true, vegan: false, ingredients: 'Crispy fries loaded with melted cheese and sauces.' },
  ],
  UFO: [
    { id: 17, name: 'Crispy Veg', vegetarian: true, vegan: false, ingredients: 'Crispy vegetable filling in a soft wrap.' },
    { id: 18, name: 'Paneer / Mushroom', vegetarian: true, vegan: false, ingredients: 'Paneer or mushroom filling with vegetables and sauces.' },
    { id: 19, name: 'Chicken', vegetarian: false, vegan: false, ingredients: 'Tender chicken filling with vegetables and special sauce.' },
    { id: 20, name: 'Zinger Chicken', vegetarian: false, vegan: false, ingredients: 'Spicy zinger chicken with vegetables and mayo.' },
    { id: 21, name: 'Cheese Burst', vegetarian: true, vegan: false, ingredients: 'Melted cheese burst with vegetables and sauces.' },
  ],
  Thickshakes: [
    { id: 22, name: 'Butterscotch Banana', vegetarian: true, vegan: false, ingredients: 'Creamy butterscotch with fresh banana, blended to perfection.' },
    { id: 23, name: 'Oreo', vegetarian: true, vegan: false, ingredients: 'Crushed Oreo cookies blended with creamy milkshake.' },
    { id: 24, name: 'Hard Rock Coffee', vegetarian: true, vegan: false, ingredients: 'Rich coffee flavor with creamy milkshake base.' },
    { id: 25, name: 'KitKat', vegetarian: true, vegan: false, ingredients: 'Crushed KitKat chocolate blended with creamy milkshake.' },
    { id: 26, name: 'Protein', vegetarian: true, vegan: false, ingredients: 'High protein milkshake with your choice of flavor.' },
    { id: 27, name: 'Belgian Chocolate', vegetarian: true, vegan: false, ingredients: 'Rich Belgian chocolate blended into creamy milkshake.' },
    { id: 28, name: 'Nutella', vegetarian: true, vegan: false, ingredients: 'Creamy Nutella hazelnut spread blended with milkshake.' },
  ],
  Mojitos: [
    { id: 29, name: 'Blue Heaven', vegetarian: true, vegan: true, ingredients: 'Refreshing blue mojito with mint and lemon.' },
    { id: 30, name: 'Virgin', vegetarian: true, vegan: true, ingredients: 'Classic virgin mojito with fresh mint and lime.' },
    { id: 31, name: 'Mint', vegetarian: true, vegan: true, ingredients: 'Fresh mint mojito with lemon and soda.' },
    { id: 32, name: 'Grilled Pineapple', vegetarian: true, vegan: true, ingredients: 'Grilled pineapple mojito with mint and lime.' },
    { id: 33, name: 'Watermelon', vegetarian: true, vegan: true, ingredients: 'Fresh watermelon mojito with mint and lemon.' },
  ],
}

const categories = [
  { name: 'Wraps', icon: '🌯', href: '/#wraps' },
  { name: 'Fries', icon: '🍟', href: '/#fries' },
  { name: 'UFO', icon: '🛸', href: '/#ufo' },
  { name: 'Thickshakes', icon: '🥤', href: '/#thickshakes' },
  { name: 'Mojitos', icon: '🍹', href: '/#mojitos' },
]

// Function to get the image path for a specific menu item
const getItemImage = (category: keyof typeof menuItems, itemName: string): string => {
  // Category-specific image mappings
  const categoryMaps: Record<keyof typeof menuItems, Record<string, string>> = {
    Wraps: {
      'Classic Veggie': '/Wraps/Classic Veggie_wrap.png',
      'Butter Garlic Mushroom': '/Wraps/Butter Garlic Mushroom_wrap.png',
      'Crispy Paneer': '/Wraps/Crispy Paneer_wrap.png',
      'Cheesy Paneer': '/Wraps/Cheesy Paneer_wrap.png',
      'Crispy Chicken': '/Wraps/Crispy Chicken_wrap.png',
      'Chilli Chicken': '/Wraps/Chilli Chicken_wrap.png',
      'Smoky Tandoori Chicken': '/Wraps/Smoky Tandoori Chicken_wrap.png',
      'Cheesy Mexican Chicken': '/Wraps/Cheesy Mexican Chicken_wrap.png',
      'Fully Loaded Chicken Wrap': '/Wraps/Fully Loaded Chicken Wrap_wrap.png',
    },
    Fries: {
      'Classic Crispy Fries': '/Fries/Classic Crispy Fries.png',
      'Peri Peri Fries': '/Fries/Peri Peri Fries.png',
      'Signature Mixed Fries': '/Fries/Signature Mixed Fries.png',
      'Golden Chicken Nuggets': '/Fries/Golden Chicken Nuggets.png',
      'Crispy Chicken Strips': '/Fries/Crispy Chicken Fries.png',
      'Chicken-Loaded Crispy Fries': '/Fries/Chicken Loaded Crispy Fries.png',
      'Cheesy Loaded Fries': '/Fries/Cheesy Loaded Fries.png',
    },
    UFO: {
      'Crispy Veg': '/UFO/Crispy Veg_UFO.png',
      'Paneer / Mushroom': '/UFO/Paneer_UFO.png',
      'Chicken': '/UFO/Chicken_UFO.png',
      'Zinger Chicken': '/UFO/Zinger Chicken_UFO.png',
      'Cheese Burst': '/UFO/Cheese Burst_UFO.png',
    },
    Thickshakes: {
      'Butterscotch Banana': '/Thickshakes/Butterscotch Banana_Thickshake.png',
      'Oreo': '/Thickshakes/Oreo_Thickshake.png',
      'Hard Rock Coffee': '/Thickshakes/Hard Rock Coffee_Thickshake.png',
      'KitKat': '/Thickshakes/Kit Kat_Thickshake.png',
      'Protein': '/Thickshakes/Protein_Thickshake.png',
      'Belgian Chocolate': '/Thickshakes/Belgian Chocolate_Thickshake.png',
      'Nutella': '/Thickshakes/Nutella_Thickshake.png',
    },
    Mojitos: {
      'Blue Heaven': '/Mojitos/Blue Heaven_Mojitos.png',
      'Virgin': '/Mojitos/Virgin_Mojitos.png',
      'Mint': '/Mojitos/Mint_Mojitos.png',
      'Grilled Pineapple': '/Mojitos/Grilled Pineapple_Mojito.png',
      'Watermelon': '/Mojitos/Watermelon_Mojitos.png',
    },
  }
  
  const categoryMap = categoryMaps[category]
  return categoryMap?.[itemName] || categoryImages[category] || '/wrap.png'
}

const categoryImages: Record<keyof typeof menuItems, string> = {
  Wraps: '/wrap.png',
  Fries: '/fries.png',
  UFO: '/wrap.png',
  Thickshakes: '/thickshake.png',
  Mojitos: '/thickshake.png',
}

export default function WrapVariants() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof menuItems>('Wraps')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [activeCategory, setActiveCategory] = useState('Wraps')
  const imageRef = useRef<HTMLImageElement>(null)
  const variantsRef = useRef<HTMLUListElement>(null)

  const currentItems = menuItems[selectedCategory]
  const currentVariant = currentItems[selectedVariant]

  useEffect(() => {
    // Reset selected variant when category changes
    setSelectedVariant(0)
  }, [selectedCategory])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      if (variantsRef.current) {
        const children = Array.from(variantsRef.current.children) as HTMLElement[]
        gsap.fromTo(
          children,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [selectedCategory, selectedVariant])

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, category: typeof categories[0]) => {
    e.preventDefault()
    setActiveCategory(category.name)
    setSelectedCategory(category.name as keyof typeof menuItems)
    
    if (category.href.startsWith('/#')) {
      const targetId = category.href.split('#')[1]
      const element = document.getElementById(targetId)
      if (element) {
        const offset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section
      id="wraps"
      ref={sectionRef}
      className="relative bg-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Navigation - Desktop */}
        <div className="mb-8 md:mb-12 hidden md:block">
          <nav className="flex items-center justify-center gap-6 md:gap-10 lg:gap-12">
            {categories.map((category) => {
              const isActive = activeCategory === category.name
              return (
                <a
                  key={category.name}
                  href={category.href}
                  onClick={(e) => handleCategoryClick(e, category)}
                  className={`flex flex-col items-center gap-3 transition-all cursor-pointer group ${
                    isActive
                      ? 'text-wrappy-red'
                      : 'text-gray-500 hover:text-wrappy-black'
                  }`}
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-3xl md:text-4xl transition-transform ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                    {category.name}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>

        {/* Category Navigation - Mobile (Horizontal Scrollable) */}
        <div className="mb-6 md:hidden">
          <nav className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((category) => {
              const isActive = activeCategory === category.name
              return (
                <a
                  key={category.name}
                  href={category.href}
                  onClick={(e) => handleCategoryClick(e, category)}
                  className={`flex flex-col items-center gap-2 transition-all cursor-pointer group flex-shrink-0 ${
                    isActive
                      ? 'text-wrappy-red'
                      : 'text-gray-500'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center text-2xl transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}>
                    {category.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {category.name}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>

        {/* Product Display Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Product Image - First on Mobile, Left on Desktop */}
          <div className="lg:col-span-9 order-1 lg:order-1">
            <div className="relative">
              <div className="relative w-full max-w-xl mx-auto bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  ref={imageRef}
                  src={getItemImage(selectedCategory, currentVariant.name)}
                  alt={currentVariant.name}
                  className="w-full h-auto object-contain"
                />
                {currentVariant.vegan ? (
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-green-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                    Vegan!
                  </div>
                ) : currentVariant.vegetarian ? (
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-green-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold">
                    Vegetarian!
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Variants List - Below Photo on Mobile, Right on Desktop */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            <h3 className="text-base md:text-lg font-black text-wrappy-black mb-3 md:mb-4 font-display uppercase tracking-wider border-b border-gray-200 pb-2">
              Variants:
            </h3>
            <ul ref={variantsRef} className="space-y-0 max-h-64 md:max-h-none overflow-y-auto md:overflow-visible">
              {currentItems.map((variant, index) => (
                <li key={variant.id} className="mb-1">
                  <button
                    onClick={() => setSelectedVariant(index)}
                    className={`w-full text-left py-3 md:py-2 px-2 md:px-1 text-sm transition-all touch-manipulation ${
                      selectedVariant === index
                        ? 'text-wrappy-black font-semibold underline decoration-2 underline-offset-2 bg-wrappy-red/5 rounded md:bg-transparent'
                        : 'text-gray-600 active:text-wrappy-black'
                    }`}
                  >
                    {variant.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
