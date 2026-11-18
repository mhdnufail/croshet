import { Link } from "react-router-dom";
import Container from "../Container";

// Import category images
import bagsImage from "../../assets/bags.jpg";
import flowersImage from "../../assets/flowers.jpg";
import toysImage from "../../assets/toys.jpg";
import accessoriesImage from "../../assets/accessories.jpg";

const categories = [
  {
    id: 1,
    name: "Crochet Bags",
    image: bagsImage,
    description: "Beautiful handmade bags",
  },
  {
    id: 2,
    name: "Crochet Flowers",
    image: flowersImage,
    description: "Flowers that last forever",
  },
  {
    id: 3,
    name: "Crochet Toys",
    image: toysImage,
    description: "Cute handmade toys",
  },
  {
    id: 4,
    name: "Accessories",
    image: accessoriesImage,
    description: "Unique crochet accessories",
  },
];

function FeaturedCategories() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6">
      <Container>

        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">

          <p className="text-xs tracking-[0.35em] uppercase text-muted mb-5">
            Explore
          </p>

          <h2 className="text-5xl md:text-6xl font-normal text-charcoal">
            Our Collection
          </h2>

          <p className="mt-6 text-muted max-w-xl mx-auto leading-7">
            Discover thoughtfully handcrafted pieces designed
            to bring a little warmth to everyday life.
          </p>

        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group"
            >

              <div
                className="
                  relative
                  h-[380px]
                  overflow-hidden
                  bg-sand
                "
              >

                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Dark Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/20
                    transition
                    duration-500
                    group-hover:bg-black/35
                  "
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">

                  <h3
                    className="
                      text-3xl
                      font-normal
                      font-serif
                      text-white
                    "
                  >
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/90">
                    {category.description}
                  </p>

                  <span
                    className="
                      mt-5
                      text-[10px]
                      tracking-[0.3em]
                      uppercase
                      text-white
                    "
                  >
                    Explore →
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

export default FeaturedCategories;