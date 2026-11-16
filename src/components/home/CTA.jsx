import { Link } from "react-router-dom";
import Container from "../Container";
import Button from "../Button";

function CTA() {
  return (
    <section className="py-16">
      <Container>

        <div className="bg-primary rounded-3xl px-6 py-12 md:px-12 text-center text-white">

          <p className="text-sm font-semibold tracking-widest">
            HANDMADE JUST FOR YOU
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Find Something Special Today
          </h2>

          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Explore our collection of handmade crochet products
            and find something unique for yourself or someone special.
          </p>

          <div className="mt-8">
            <Link to="/products">
              <Button
                variant="secondary"
                className="px-8"
              >
                Shop Now
              </Button>
            </Link>
          </div>

        </div>

      </Container>
    </section>
  );
}

export default CTA;