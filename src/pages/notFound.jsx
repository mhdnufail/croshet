import { Link } from "react-router-dom";
import Container from "../components/Container";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="min-h-[70vh] bg-background flex items-center justify-center py-20">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Error 404
          </p>

          <h1 className="font-serif text-6xl md:text-7xl font-bold text-text mt-3">
            404
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl text-text mt-4">
            Page Not Found
          </h2>

          <p className="mt-3 text-muted text-sm leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. Discover
            our handcrafted collection instead.
          </p>

          <Link
            to="/"
            className="
              inline-flex items-center gap-2
              mt-8
              bg-primary text-white
              px-7 py-3.5
              rounded-lg
              text-xs font-semibold
              tracking-[0.15em] uppercase
              hover:bg-primary-dark
              transition
            "
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;
