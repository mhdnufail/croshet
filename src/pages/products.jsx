import { useState } from "react";
import Container from "../components/Container";
import ProductCard from "../components/productcard"

const products = [
  {
    id: 1,
    name: "Crochet Handbag",
    category: "Bags",
    price: 899,
    rating: 4.8,
    image: "👜",
  },
  {
    id: 2,
    name: "Crochet Flower",
    category: "Flowers",
    price: 299,
    rating: 4.7,
    image: "🌸",
  },
  {
    id: 3,
    name: "Crochet Teddy",
    category: "Toys",
    price: 699,
    rating: 4.9,
    image: "🧸",
  },
  {
    id: 4,
    name: "Crochet Hair Bow",
    category: "Accessories",
    price: 199,
    rating: 4.6,
    image: "🎀",
  },
  {
    id: 5,
    name: "Crochet Shoulder Bag",
    category: "Bags",
    price: 999,
    rating: 4.8,
    image: "👜",
  },
  {
    id: 6,
    name: "Crochet Rose",
    category: "Flowers",
    price: 349,
    rating: 4.7,
    image: "🌹",
  },
  {
    id: 7,
    name: "Crochet Bunny",
    category: "Toys",
    price: 749,
    rating: 4.9,
    image: "🐰",
  },
  {
    id: 8,
    name: "Crochet Headband",
    category: "Accessories",
    price: 249,
    rating: 4.6,
    image: "🎀",
  },
];

const categories = [
  "All",
  "Bags",
  "Flowers",
  "Toys",
  "Accessories"
]

function Products() {
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("All")

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || product.category === category;

  return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16">
      <Container>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary font-semibold">
            OUR COLLECTION
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            All Products
          </h1>

          <p className="text-muted mt-4">
            Explore our complete collection of handmade crochet products.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

                {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full border transition ${
                category === item
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 hover:border-primary hover:text-primary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-4xl">🔍</p>

            <h3 className="text-xl font-semibold mt-4">
              No products found
            </h3>

            <p className="text-muted mt-2">
              Try searching for another product.
            </p>
          </div>
        )}

        </div>

      </Container>
    </section>
  );
}

export default Products;