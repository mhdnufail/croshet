import { Link } from "react-router-dom";

// import crochetLeft from "../src/assets/croshet-left.jpg";
import crochetLeft from '../assets/croshet-left.jpg';
import crochetRight from '../assets/croshet-right.jpg';

import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <div className="bg-[#f5f1e8] text-[#29271f]">
      <section className="relative h-screen min-h-[650px] overflow-hidden">
        {/* Navigation */}
        {/* <nav className="absolute top-0 left-0 z-30 w-full px-6 md:px-10 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="
              font-['Playfair_Display']
              text-[1.45rem]
              font-semibold
              tracking-[0.15em]
              uppercase
              text-[#F8F3EA]
              transition-opacity
              duration-200
              hover:opacity-75
            "
            >
              CROCHET
            </Link>

            <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] text-white uppercase">
              <Link to="/" className="hover:opacity-60 transition">
                Home
              </Link>

              <Link to="/products" className="hover:opacity-60 transition">
                Shop
              </Link>

              <a href="#about" className="hover:opacity-60 transition">
                About
              </a>

              <a href="#contact" className="hover:opacity-60 transition">
                Contact
              </a>
            </div>

            <button className="md:hidden text-white text-2xl">☰</button>
          </div>
        </nav> */}

        {/* ================= SPLIT IMAGE ================= */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Image */}
          <div className="relative overflow-hidden">
            <img
              src={crochetLeft}
              alt="Handmade crochet chair"
              className="w-full h-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block overflow-hidden">
            <img
              src={crochetRight}
              alt="Crochet yarn and handmade craft"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>

        {/* ================= CENTER CONTENT ================= */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-4xl text-white">
            <p className="mb-5 text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium">
              HANDCRAFTED WITH LOVE
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Made by Hand.
              <br />
            Made to Be Loved.
            </h1>

            <p className="mt-7 max-w-md mx-auto text-sm md:text-base leading-relaxed text-white/90">
              Modern crochet pieces designed to bring handmade beauty into your everyday style.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="
                  inline-flex items-center justify-center
                  px-10 py-4
                  border border-white/90
                  bg-white/10
                  backdrop-blur-md
                  text-white
                  text-xs font-semibold uppercase
                  tracking-[0.25em]
                  rounded-sm
                  transition-all duration-300
                  hover:bg-white
                  hover:text-black
                  hover:border-white
                  hover:scale-103
                "
              >
                Shop the collection
              </Link>

              {/* <a
                href="#story"
                className="px-8 py-3 border border-white text-white text-xs tracking-[0.2em] uppercase
                hover:bg-white hover:text-[#29271f] transition duration-300"
              >
                Our Story
              </a> */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section id="story" className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8a806c] mb-5">
            Made by Hand
          </p>

          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Every stitch has
            <br />a story.
          </h2>

          <p className="mt-8 text-[#6f695c] leading-8 max-w-xl mx-auto">
            We believe handmade products carry something that mass-produced
            pieces cannot — time, patience and a little piece of the person who
            created them.
          </p>
        </div>
      </section>

      {/* ================= EXISTING SECTIONS ================= */}

      <FeaturedCategories />

      <FeaturedProducts />

      <WhyChooseUs />

      <CTA />
    </div>
  );
}

export default Home;
