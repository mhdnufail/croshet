import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User, LogOut, Menu, X, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useToast } from "../context/ToastContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistCount = wishlistItems.length;

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

  const handleLogout = () => {
    logout();
    showToast("Signed out successfully", "info");
    navigate("/");
  };

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
              : "bg-[#F3F0E6]/95 backdrop-blur-md text-text border-b border-text/10 shadow-[0_4px_20px_rgba(47,36,31,0.05)] py-4"
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
                hover:opacity-75
              "
            >
              CROCHET
            </Link>

            {/* ================= DESKTOP LINKS ================= */}
            <nav className="hidden md:flex items-center gap-9">
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
                to="/products?category=Clothings"
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                CLOTHINGS
              </Link>

              <Link
                to="/products?category=Bags"
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                BAGS
              </Link>

              <Link
                to="/products?category=Flowers"
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                FLOWERS
              </Link>
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Authenticated Only: Wishlist & Cart */}
              {user ? (
                <>
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="
                      relative
                      inline-flex items-center
                      transition-opacity duration-200
                      hover:opacity-70
                    "
                    title="Wishlist"
                    aria-label="Wishlist"
                  >
                    <Heart size={20} strokeWidth={1.5} />
                    {wishlistCount > 0 && (
                      <span className="
                        absolute
                        -top-2
                        -right-2.5
                        min-w-[17px]
                        h-[17px]
                        px-1
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        text-white
                        text-[9px]
                        font-bold
                      ">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="
                      relative
                      inline-flex items-center
                      transition-opacity duration-200
                      hover:opacity-70
                    "
                    title="Cart"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingBag size={20} strokeWidth={1.5} />

                    {cartCount > 0 && (
                      <span className="
                        absolute
                        -top-2
                        -right-2.5
                        min-w-[17px]
                        h-[17px]
                        px-1
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        text-white
                        text-[9px]
                        font-bold
                      ">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Profile & My Orders Link */}
                  <Link
                    to="/profile"
                    className="
                      inline-flex items-center gap-1.5
                      text-[0.75rem]
                      font-medium
                      tracking-[0.2em]
                      uppercase
                      transition-opacity duration-200
                      hover:opacity-70
                    "
                    title="My Profile"
                  >
                    <User size={18} strokeWidth={1.5} />
                    <span className="hidden lg:inline font-semibold">
                      {user.name ? user.name.split(" ")[0] : "ACCOUNT"}
                    </span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      hidden sm:inline-flex items-center gap-1
                      text-[0.72rem]
                      font-medium
                      tracking-[0.18em]
                      uppercase
                      opacity-75
                      hover:opacity-100
                      hover:text-red-500
                      transition
                    "
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                /* Logged Out: Sign In Only (NO Cart, NO Wishlist) */
                <Link
                  to="/login"
                  className="
                    inline-flex items-center gap-1.5
                    text-[0.75rem]
                    font-medium
                    tracking-[0.2em]
                    uppercase
                    transition-opacity duration-200
                    hover:opacity-70
                  "
                >
                  <User size={18} strokeWidth={1.5} />
                  <span className="hidden sm:inline">SIGN IN</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                  md:hidden
                  bg-transparent
                  border-0
                  p-1
                  cursor-pointer
                  text-current
                "
                aria-label="Toggle navigation menu"
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
          <div className="flex items-center justify-between pb-6 border-b border-text/10">
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
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-transparent border-0 cursor-pointer text-text p-1"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-5 py-8 flex-1 overflow-y-auto">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.05em] transition hover:text-primary"
            >
              HOME
            </Link>

            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.05em] transition hover:text-primary"
            >
              SHOP ALL
            </Link>

            <Link
              to="/products?category=Clothings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-[0.2em] uppercase text-muted hover:text-primary transition"
            >
              CLOTHINGS
            </Link>

            <Link
              to="/products?category=Bags"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-[0.2em] uppercase text-muted hover:text-primary transition"
            >
              BAGS
            </Link>

            <Link
              to="/products?category=Flowers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-[0.2em] uppercase text-muted hover:text-primary transition"
            >
              FLOWERS
            </Link>

            <Link
              to="/products?category=Toys"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-[0.2em] uppercase text-muted hover:text-primary transition"
            >
              TOYS
            </Link>

            {/* Authenticated Links in Mobile Drawer */}
            {user && (
              <div className="pt-4 border-t border-text/10 space-y-4">
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-text hover:text-primary transition"
                >
                  <span className="flex items-center gap-2.5">
                    <ShoppingBag size={18} />
                    <span>Cart</span>
                  </span>
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-text hover:text-primary transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </span>
                  <span className="bg-secondary text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-base font-medium text-text hover:text-primary transition"
                >
                  <Package size={18} />
                  <span>My Orders</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-base font-medium text-text hover:text-primary transition"
                >
                  <User size={18} />
                  <span>My Profile ({user.name})</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Footer Area */}
          <div className="pt-6 border-t border-text/10">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="
                  w-full
                  bg-red-50 text-red-700
                  border border-red-200
                  text-center
                  py-3.5
                  rounded-xl
                  text-xs font-semibold
                  tracking-[0.15em] uppercase
                  flex items-center justify-center gap-2
                  transition
                "
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  block
                  w-full
                  bg-primary text-white
                  text-center
                  py-3.5
                  rounded-xl
                  text-xs font-semibold
                  tracking-[0.15em] uppercase
                  hover:bg-primary-dark
                  transition
                "
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
