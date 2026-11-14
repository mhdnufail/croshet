import { Link } from "react-router-dom";
import Container from "../Container";

const categories = [
  {
    id: 1,
    name: "Crochet Bags",
    icon: "👜",
    description: "Beautiful handmade bags",
  },
  {
    id: 2,
    name: "Crochet Flowers",
    icon: "🌸",
    description: "Flowers that last forever",
  },
  {
    id: 3,
    name: "Crochet Toys",
    icon: "🧸",
    description: "Cute handmade toys",
  },
  {
    id: 4,
    name: "Accessories",
    icon: "🎀",
    description: "Unique crochet accessories",
  },
];

function FeaturedCategories() {
  return (
    <section className="py-16">
      <Container>

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-primary font-semibold">
            EXPLORE
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Shop By Category
          </h2>

          <p className="text-muted mt-4">
            Explore our collection of handmade crochet
            products created with care.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group"
            >

              <div className="bg-secondary rounded-2xl p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-lg">

                <div className="text-6xl">
                  {category.icon}
                </div>

                <h3 className="text-xl font-semibold mt-5 group-hover:text-primary">
                  {category.name}
                </h3>

                <p className="text-muted mt-2">
                  {category.description}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default FeaturedCategories;