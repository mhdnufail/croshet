import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useAuth();

  const location = useLocation();

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`
          fixed top-0 left-0 w-full z-[100]
          transition-all duration-300
          ${
            isTransparent
              ? "bg-transparent text-white border-b border-white/15 py-6"
              : "bg-cream backdrop-blur-md text-text border-b border-text/10 shadow-[0_4px_20px_rgba(47,36,31,0.05)] py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="
                font-serif
                text-[1.45rem]
                font-semibold
                tracking-[0.15em]
                uppercase
                transition-opacity duration-200
                hover:opacity-70
              "
            >
              CROCHET
            </Link>

            {/* ================= DESKTOP LINKS ================= */}
            <nav className="hidden md:flex items-center gap-10">
              <Link
                to="/"
                className={`
                  relative
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                  ${
                    location.pathname === "/"
                      ? "after:absolute after:left-0 after:-bottom-2 after:w-full after:h-px after:bg-current"
                      : ""
                  }
                `}
              >
                HOME
              </Link>

              <Link
                to="/products"
                className={`
                  relative
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                  ${
                    location.pathname === "/products"
                      ? "after:absolute after:left-0 after:-bottom-2 after:w-full after:h-px after:bg-current"
                      : ""
                  }
                `}
              >
                SHOP
              </Link>

              <Link
                to="/categories"
                className="
                  relative
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                CATEGORIES
              </Link>

              <Link
                to="/about"
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                ABOUT
              </Link>

              <Link
                to="/contact"
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                CONTACT
              </Link>
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}
            <div className="flex items-center gap-6">

              {user && (
                <>
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="
                      inline-flex items-center
                      transition-opacity duration-200
                      hover:opacity-60
                    "
                    title="Wishlist"
                  >
                    <Heart size={18} strokeWidth={1.5} />
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="
                      inline-flex items-center gap-1.5
                      text-[0.75rem]
                      font-medium
                      tracking-[0.2em]
                      uppercase
                      transition-opacity duration-200
                      hover:opacity-60
                    "
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />

                    <span className="hidden lg:inline">
                      CART
                    </span>

                    <span className="hidden lg:inline opacity-80 tabular-nums">
                      (0)
                    </span>
                  </Link>
                </>
              )}

              {/* Sign In */}
              <Link
                to="/login"
                className="
                  inline-flex items-center gap-1.5
                  text-[0.75rem]
                  font-medium
                  tracking-[0.2em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                <User size={18} strokeWidth={1.5} />

                <span className="hidden lg:inline">
                  SIGN IN
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                  md:hidden
                  bg-transparent
                  border-0
                  p-0
                  cursor-pointer
                "
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? (
                  <X size={24} strokeWidth={1.5} />
                ) : (
                  <Menu size={24} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`
          fixed inset-0
          bg-background
          text-text
          z-[200]
          flex flex-col
          p-6
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div
            className="
            flex
            items-center
            justify-between
            pb-8
            border-b border-text/10
          "
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.35rem]
                font-semibold
                tracking-[0.15em]
              "
            >
              CROCHET
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                bg-transparent
                border-0
                cursor-pointer
                text-text
              "
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav
            className="
            flex
            flex-col
            gap-7
            py-12
            flex-1
          "
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                transition-colors
                hover:text-primary
              "
            >
              HOME
            </Link>

            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                transition-colors
                hover:text-primary
              "
            >
              SHOP
            </Link>

            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                transition-colors
                hover:text-primary
              "
            >
              CATEGORIES
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                transition-colors
                hover:text-primary
              "
            >
              ABOUT
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-[1.8rem]
                font-medium
                tracking-[0.05em]
                transition-colors
                hover:text-primary
              "
            >
              CONTACT
            </Link>

            {user && (
              <>
                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="
                inline-flex items-center
                transition-opacity duration-200
                hover:opacity-60
              "
                  title="Wishlist"
                >
                  <Heart size={18} strokeWidth={1.5} />
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="
                inline-flex items-center gap-1.5
                text-[0.75rem]
                font-medium
                tracking-[0.2em]
                uppercase
                transition-opacity duration-200
                hover:opacity-60
              "
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />

                  <span className="hidden lg:inline">CART</span>

                  <span className="hidden lg:inline opacity-80 tabular-nums">
                    (0)
                  </span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Footer */}
          <div
            className="
            pt-6
            border-t border-text/10
          "
          >
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                block
                w-full
                bg-text
                text-background
                text-center
                py-3
                text-xs
                font-semibold
                tracking-[0.15em]
                transition-opacity
                hover:opacity-80
              "
            >
              SIGN IN / REGISTER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
