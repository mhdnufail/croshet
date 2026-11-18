import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const categories = [
  "All",
  "Bags",
  "Flowers",
  "Toys",
  "Accessories",
];

const products = [
  {
    id: 1,
    name: "Crochet Handbag",
    category: "Bags",
    price: 899,
    rating: 4.8,
    image: "/images/bags.jpg",
  },
  {
    id: 2,
    name: "Crochet Flower",
    category: "Flowers",
    price: 299,
    rating: 4.7,
    image: "/images/flowers.jpg",
  },
  {
    id: 3,
    name: "Crochet Teddy",
    category: "Toys",
    price: 699,
    rating: 4.9,
    image: "/images/toys.jpg",
  },
  {
    id: 4,
    name: "Crochet Hair Bow",
    category: "Accessories",
    price: 199,
    rating: 4.6,
    image: "/images/crochet-bow.jpg",
  },
  {
    id: 5,
    name: "Crochet Shoulder Bag",
    category: "Bags",
    price: 999,
    rating: 4.8,
    image: "/images/crochet-shoulder-bag.jpg",
  },
  {
    id: 6,
    name: "Crochet Rose",
    category: "Flowers",
    price: 349,
    rating: 4.7,
    image: "/images/crochet-rose.jpg",
  },
  {
    id: 7,
    name: "Crochet Bunny",
    category: "Toys",
    price: 749,
    rating: 4.9,
    image: "/images/crochet-bunny.jpg",
  },
  {
    id: 8,
    name: "Crochet Headband",
    category: "Accessories",
    price: 249,
    rating: 4.6,
    image: "/images/crochet-headband.jpg",
  },
];

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice,setMaxPrice] = useState("All")

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || product.category === category;

  const matchesPrice =
    maxPrice === "All" || product.price <= Number(maxPrice);

  return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="py-16 bg-background">
      <Container>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-primary font-semibold tracking-wide">
            OUR COLLECTION
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Crochet Collection
          </h1>

          <p className="text-muted mt-4">
            Discover beautifully handcrafted crochet pieces made
            with care and creativity.
          </p>

        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mt-8">

          <input
            type="text"
            placeholder="Search crochet products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-white
              border border-gray-200
              rounded-full
              px-6 py-3
              outline-none
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />

        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
                px-5 py-2
                rounded-full
                border
                transition
                duration-200
                ${
                  category === item
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-200 text-text hover:border-primary hover:text-primary"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

        <div className="flex justify-center mt-5">
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-primary"
        >
          <option value="All">All Prices</option>
          <option value="300">Under ₹300</option>
          <option value="500">Under ₹500</option>
          <option value="750">Under ₹750</option>
          <option value="1000">Under ₹1000</option>
        </select>
      </div>

        {/* Product Count */}
        <div className="flex justify-between items-center mt-10 mb-5">

          <p className="text-muted">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}{" "}
            found
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-primary text-sm font-medium hover:underline"
            >
              Clear search
            </button>
          )}

        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border border-gray-100
                  hover:shadow-lg
                  transition duration-300
                  group
                "
              >

                {/* Product Image */}
                <Link to={`/products/${product.id}`}>

                  <div className="h-72 bg-secondary overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition duration-500
                      "
                    />

                  </div>

                </Link>

                {/* Product Info */}
                <div className="p-5">

                  <p className="text-sm text-primary font-medium">
                    {product.category}
                  </p>

                  <Link to={`/products/${product.id}`}>

                    <h2 className="text-lg font-semibold mt-1 hover:text-primary">
                      {product.name}
                    </h2>

                  </Link>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-xl font-bold">
                      ₹{product.price}
                    </span>

                    <span className="text-sm text-muted">
                      ⭐ {product.rating}
                    </span>

                  </div>

                  <button
                    className="
                      w-full
                      mt-4
                      bg-primary
                      text-white
                      py-2.5
                      rounded-lg
                      font-medium
                      hover:bg-primary-dark
                      transition
                    "
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* No Results */
          <div className="text-center py-20">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-2xl font-semibold">
              No products found
            </h2>

            <p className="text-muted mt-2">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="
                mt-6
                bg-primary
                text-white
                px-6 py-2.5
                rounded-lg
                hover:bg-primary-dark
                transition
              "
            >
              View All Products
            </button>

          </div>

        )}

      </Container>
    </section>
  );
}

export default Products;