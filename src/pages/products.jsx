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

function Products() {
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

        {/* Product Grid */}
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

export default Products;