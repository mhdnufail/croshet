import { Link } from "react-router-dom";
import Container from "../Container";

const products = [
  {
    id: 1,
    name: "Crochet Handbag",
    category: "Bags",
    price: 899,
    image: "/images/crochet-bag.jpg",
  },
  {
    id: 2,
    name: "Crochet Flower",
    category: "Flowers",
    price: 299,
    image: "/images/crochet-flower.jpg",
  },
  {
    id: 3,
    name: "Crochet Teddy",
    category: "Toys",
    price: 699,
    image: "/images/crochet-teddy.jpg",
  },
  {
    id: 4,
    name: "Crochet Shoulder Bag",
    category: "Bags",
    price: 999,
    image: "/images/crochet-shoulder-bag.jpg",
  },
];

function FeaturedProducts() {
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

          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    group-hover:bg-black/10
                    transition
                    duration-500
                  "
                />

                {/* View Product */}
                <div
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
                  "
                >
                  <span
                    className="
                      bg-white
                      text-text
                      px-5
                      py-2.5
                      text-xs
                      font-semibold
                      tracking-[0.15em]
                      uppercase
                      shadow-lg
                      whitespace-nowrap
                    "
                  >
                    View Product
                  </span>
                </div>

              </div>

              {/* Product Information */}
              <div className="pt-5">

                <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
                  {product.category}
                </p>

                <div className="flex items-start justify-between gap-4 mt-2">

                  <h3 className="font-serif text-xl text-text group-hover:text-primary transition">
                    {product.name}
                  </h3>

                  <span className="text-sm font-semibold text-text">
                    ₹{product.price}
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default FeaturedProducts;