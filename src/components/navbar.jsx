import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
             Crochet Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">

            <Link to="/" className="hover:text-primary">
              Home
            </Link>

            <Link to="/products" className="hover:text-primary">
              Products
            </Link>

            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>

            <Link to="/wishlist" className="hover:text-primary">
              ♡ Wishlist
            </Link>

            <Link to="/cart" className="hover:text-primary">
              🛒 Cart
            </Link>

            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Login
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/categories"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
              >
                ♡ Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
              >
                🛒 Cart
              </Link>

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-primary text-white px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;