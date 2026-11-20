import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";

const otherProducts = [
  {
    id: 1,
    name: "Crochet Handbag",
    category: "Bags",
    price: 899,
    image: "https://i.pinimg.com/736x/75/49/6f/75496f9217714d1399f70abd6cb91a67.jpg",
  },
  {
    id: 2,
    name: "Crochet Flower",
    category: "Flowers",
    price: 299,
    image: "https://i.pinimg.com/736x/b8/ed/be/b8edbeff1d33df49d1d8ba0a9dbd7fe8.jpg",
  },
];

const clothingOptions = {
  men: {
    id: 3,
    name: "Men's Crochet Knit Sweater",
    category: "Clothings",
    gender: "Men",
    price: 1499,
    image: "https://i.pinimg.com/1200x/5a/1a/3c/5a1a3cf1ebee553fe7173b6ecb3e84c9.jpg",
  },
  women: {
    id: 9,
    name: "Women's Crochet Cardigan",
    category: "Clothings",
    gender: "Women",
    price: 1399,
    image: "https://i.pinimg.com/736x/a9/31/09/a931093515733a135c35488b8bbe68f0.jpg",
  },
};

const fourthProduct = {
  id: 4,
  name: "Crochet Shoulder Bag",
  category: "Bags",
  price: 999,
  image: "/images/crochet-shoulder-bag.jpg",
};

function FeaturedProducts() {
  const [selectedGender, setSelectedGender] = useState("women");

  const currentClothing = clothingOptions[selectedGender];

  return (
    <section className="bg-background py-24">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Curated for you
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-text mt-3">
              Featured Pieces
            </h2>

            <p className="text-muted max-w-lg mt-4 leading-relaxed">
              Discover a selection of handcrafted crochet pieces made to bring
              warmth, character, and creativity into your everyday life.
            </p>
          </div>

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              tracking-[0.2em]
              uppercase
              text-text
              border-b
              border-text
              pb-1
              hover:text-primary
              hover:border-primary
              transition
              w-fit
            "
          >
            View All Products
            <span>→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Bags */}
          <Link to={`/products/${otherProducts[0].id}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={otherProducts[0].image}
                alt={otherProducts[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-white text-text px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase shadow-lg whitespace-nowrap">
                  View Product
                </span>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
                {otherProducts[0].category}
              </p>
              <div className="flex items-start justify-between gap-4 mt-2">
                <h3 className="font-serif text-xl text-text group-hover:text-primary transition">
                  {otherProducts[0].name}
                </h3>
                <span className="text-sm font-semibold text-text">
                  ₹{otherProducts[0].price}
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Flowers */}
          <Link to={`/products/${otherProducts[1].id}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={otherProducts[1].image}
                alt={otherProducts[1].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-white text-text px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase shadow-lg whitespace-nowrap">
                  View Product
                </span>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
                {otherProducts[1].category}
              </p>
              <div className="flex items-start justify-between gap-4 mt-2">
                <h3 className="font-serif text-xl text-text group-hover:text-primary transition">
                  {otherProducts[1].name}
                </h3>
                <span className="text-sm font-semibold text-text">
                  ₹{otherProducts[1].price}
                </span>
              </div>
            </div>
          </Link>

          {/* 3. CLOTHING (Replaces Toys) with Options to Select Men & Women */}
          <div className="group flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <Link to={`/products/${currentClothing.id}`} className="block w-full h-full">
                <img
                  src={currentClothing.image}
                  alt={currentClothing.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
              </Link>

              {/* Floating Gender Selector Pill */}
              <div className="absolute top-3.5 left-3.5 z-20 flex items-center bg-white/95 backdrop-blur-md p-1 rounded-full border border-text/15 shadow-sm">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedGender("women");
                  }}
                  className={`
                    px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all
                    ${
                      selectedGender === "women"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:text-text"
                    }
                  `}
                >
                  Women
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedGender("men");
                  }}
                  className={`
                    px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all
                    ${
                      selectedGender === "men"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:text-text"
                    }
                  `}
                >
                  Men
                </button>
              </div>

              {/* Hover View Product Button */}
              <Link
                to={`/products/${currentClothing.id}`}
                className="
                  absolute
                  bottom-5
                  left-1/2
                  -translate-x-1/2
                  translate-y-4
                  opacity-0
                  group-hover:translate-y-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                  z-10
                "
              >
                <span className="bg-white text-text px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase shadow-lg whitespace-nowrap block">
                  View {selectedGender === "women" ? "Women" : "Men"}
                </span>
              </Link>
            </div>

            {/* Product Information */}
            <div className="pt-5">
              <div className="flex items-center justify-between">
                <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
                  {currentClothing.category} • {currentClothing.gender}
                </p>

                {/* Quick Switch Link */}
                <span className="text-[10px] tracking-wider uppercase text-muted font-medium">
                  {selectedGender === "women" ? "Showing Women" : "Showing Men"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mt-2">
                <Link to={`/products/${currentClothing.id}`}>
                  <h3 className="font-serif text-xl text-text group-hover:text-primary transition line-clamp-1">
                    {currentClothing.name}
                  </h3>
                </Link>

                <span className="text-sm font-semibold text-text shrink-0">
                  ₹{currentClothing.price}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Bags */}
          <Link to={`/products/${fourthProduct.id}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={fourthProduct.image}
                alt={fourthProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-white text-text px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase shadow-lg whitespace-nowrap">
                  View Product
                </span>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
                {fourthProduct.category}
              </p>
              <div className="flex items-start justify-between gap-4 mt-2">
                <h3 className="font-serif text-xl text-text group-hover:text-primary transition">
                  {fourthProduct.name}
                </h3>
                <span className="text-sm font-semibold text-text">
                  ₹{fourthProduct.price}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
