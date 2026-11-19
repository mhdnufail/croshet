import { Link } from "react-router-dom";
import Container from "../Container";

function CTA() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Left Content */}
          <div className="bg-text px-8 py-14 md:px-14 md:py-20 flex flex-col justify-center">
            <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">
              Made For You
            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mt-5 leading-[1.05]">
              Something
              <br />
              <span className="italic">special awaits.</span>
            </h2>

            <p className="text-black/70 max-w-md mt-6 leading-relaxed">
              Discover handcrafted crochet pieces designed to bring warmth,
              creativity, and personality into your everyday life.
            </p>

            <div className="mt-9">
              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-white
                  text-text
                  px-7
                  py-3.5
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  uppercase
                  hover:bg-accent
                  transition
                  duration-300
                "
              >
                Shop Collection
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative min-h-[400px] bg-primary overflow-hidden">

            <img
              src="https://i.pinimg.com/736x/2f/fd/c4/2ffdc451ba22750e987ff2220f08a716.jpg"
              alt="Men clothing"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                opacity-90
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-text/35" />

            {/* Decorative Frame */}
            <div className="absolute inset-6 md:inset-8 border border-white/40" />

            {/* Text */}
            <div className="absolute inset-0 flex items-end p-10 md:p-14">
              <div>
                <p className="text-black text-xs tracking-[0.3em] uppercase font-semibold">
                  Handmade
                </p>

                <p className="text-black font-serif text-3xl md:text-4xl mt-2 italic">
                  With love.
                </p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTA;