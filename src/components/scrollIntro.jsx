import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

function ScrollAnimation() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Main image moves upward
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["0%", "-45%", "-100%"]
  );

  // Text animations
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0%", "-120%"]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0]
  );

  // Product section appears
  const productsY = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["100%", "0%"]
  );

  const productsOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [0, 1]
  );

  // Category section appears
  const categoriesY = useTransform(
    scrollYProgress,
    [0.5, 0.8],
    ["100%", "0%"]
  );

  const categoriesOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-[#F3F0E6]"
    >
      {/* Sticky animation area */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Intro text */}
        <motion.div
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none"
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#6F7568]">
              Handmade with love
            </p>

            <h2 className="font-serif text-5xl md:text-7xl text-[#34382F]">
              Crafted for you
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[#6F7568]">
              Discover beautiful handmade crochet pieces created
              with care and creativity.
            </p>
          </div>
        </motion.div>

        {/* Moving website content */}
        <motion.div
          style={{ y: imageY }}
          className="absolute left-1/2 top-[55%] w-[90%] max-w-6xl -translate-x-1/2"
        >
          {/* Hero image */}
          <div className="mb-24 overflow-hidden rounded-3xl">
            <img
              src="/images/crochet-hero.jpg"
              alt="Crochet collection"
              className="h-[70vh] w-full object-cover"
            />
          </div>

          {/* Products */}
          <motion.div
            style={{
              y: productsY,
              opacity: productsOpacity,
            }}
            className="mb-32"
          >
            <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-[#6F7568]">
              Our collection
            </p>

            <h2 className="mb-10 text-center font-serif text-4xl md:text-6xl text-[#34382F]">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              <ProductCard
                image="/images/bag.jpg"
                name="Crochet Bag"
                price="₹899"
              />

              <ProductCard
                image="/images/flower.jpg"
                name="Crochet Flower"
                price="₹299"
              />

              <ProductCard
                image="/images/home-decor.jpg"
                name="Crochet Decor"
                price="₹699"
              />

            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            style={{
              y: categoriesY,
              opacity: categoriesOpacity,
            }}
            className="pb-32"
          >
            <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-[#6F7568]">
              Explore
            </p>

            <h2 className="mb-10 text-center font-serif text-4xl md:text-6xl text-[#34382F]">
              Shop by Category
            </h2>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

              <Category
                image="/images/bags.jpg"
                name="Bags"
              />

              <Category
                image="/images/accessories.jpg"
                name="Accessories"
              />

              <Category
                image="/images/flowers.jpg"
                name="Flowers"
              />

              <Category
                image="/images/home-decor.jpg"
                name="Home Decor"
              />

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ image, name, price }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl text-[#34382F]">
          {name}
        </h3>

        <p className="mt-2 text-[#6F7568]">
          {price}
        </p>
      </div>
    </div>
  );
}

function Category({ image, name }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={name}
        className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex items-end bg-black/20 p-5">
        <h3 className="font-serif text-2xl text-white">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default ScrollAnimation;