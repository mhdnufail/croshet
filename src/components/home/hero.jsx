import { Link } from "react-router-dom";
import Container from "../Container";
import Button from "../Button";


function Hero() {
  return (
    <section className="bg-secondary pt-20">
      <Container>

        <div className="min-h-[600px] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16">

          {/* Content */}
          <div>

            <p className="text-primary font-semibold tracking-wide mb-4">
              HANDMADE WITH LOVE
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Beautiful Crochet
              <span className="text-primary">
                {" "}Made For You
              </span>
            </h1>

            <p className="mt-6 text-muted text-lg max-w-xl">
              Discover unique handmade crochet products
              crafted with care, creativity, and passion.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link to="/products">
                <Button>
                  Shop Now
                </Button>
              </Link>

              <Link to="/categories">
                <Button variant="outline">
                  Explore Categories
                </Button>
              </Link>

            </div>

          </div>

          {/* Image Placeholder */}
          <div className="flex justify-center">

            <div className="w-full max-w-md h-[300px] bg-accent rounded-10xl flex items-center justify-center">

              <span className="text-6xl">
                <img src="https://i.pinimg.com/1200x/06/4e/dc/064edc3ed659faae20d9616b7a529d69.jpg" alt="" />
              </span>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default Hero;