import Container from "../Container";
import ProductCard from "../productcard";
import { Link } from "react-router-dom";

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
];

function FeaturedProducts() {
  return (
    <section className="py-16 bg-secondary">

      <Container>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>
            <p className="text-primary font-semibold">
              OUR COLLECTION
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Featured Products
            </h2>

            <p className="text-muted mt-3 max-w-xl">
              Discover some of our most loved handmade
              crochet products.
            </p>
          </div>

          <Link
            href="/products"
            className="text-primary font-semibold hover:underline"
          >
            View All Products →
          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}

export default FeaturedProducts;