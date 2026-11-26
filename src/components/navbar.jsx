// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ShoppingBag, Heart, User, LogOut, Menu, X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { useToast } from "../context/ToastContext";

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const isHome = location.pathname === "/";
//   const isTransparent = isHome && !scrolled;

//   const cartItems = useSelector((state) => state.cart.items);
//   const wishlistItems = useSelector((state) => state.wishlist?.items || []);

//   const cartCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const wishlistCount = wishlistItems.length;

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     showToast("Signed out successfully", "info");
//     navigate("/");
//   };

//   const handleSectionScroll = (e, sectionId) => {
//     if (location.pathname === "/") {
//       e.preventDefault();
//       const element = document.getElementById(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <header
//         className={`
//           fixed top-0 left-0 w-full z-[100]
//           transition-all duration-300
//           ${
//             isTransparent
//               ? "bg-gradient-to-b from-black/70 via-black/40 to-transparent text-white border-b border-white/20 py-5"
//               : "bg-[#F3F0E6] text-text border-b border-text/15 shadow-[0_4px_25px_rgba(47,36,31,0.08)] py-4"
//           }
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {/* ================= LOGO ================= */}
//             <Link
//               to="/"
//               className={`
//                 font-serif
//                 text-2xl sm:text-[1.7rem]
//                 font-bold
//                 tracking-[0.16em]
//                 uppercase
//                 transition-transform duration-200
//                 hover:opacity-85
//                 ${isTransparent ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" : "text-text"}
//               `}
//             >
//               CROCHET
//             </Link>

//             {/* ================= DESKTOP LINKS ================= */}
//             <nav className="hidden md:flex items-center gap-8 lg:gap-10">
//               <Link
//                 to="/"
//                 className={`
//                   relative
//                   text-[0.825rem]
//                   font-bold
//                   tracking-[0.16em]
//                   uppercase
//                   transition-all duration-200
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                       : "text-text hover:text-primary"
//                   }
//                   ${
//                     location.pathname === "/"
//                       ? "after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-[2px] after:bg-current"
//                       : ""
//                   }
//                 `}
//               >
//                 HOME
//               </Link>

//               <Link
//                 to="/products"
//                 className={`
//                   relative
//                   text-[0.825rem]
//                   font-bold
//                   tracking-[0.16em]
//                   uppercase
//                   transition-all duration-200
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                       : "text-text hover:text-primary"
//                   }
//                   ${
//                     location.pathname === "/products"
//                       ? "after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-[2px] after:bg-current"
//                       : ""
//                   }
//                 `}
//               >
//                 SHOP
//               </Link>

//               <a
//                 href="/#story"
//                 onClick={(e) => handleSectionScroll(e, "story")}
//                 className={`
//                   text-[0.825rem]
//                   font-bold
//                   tracking-[0.16em]
//                   uppercase
//                   transition-all duration-200
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                       : "text-text hover:text-primary"
//                   }
//                 `}
//               >
//                 OUR STORY
//               </a>

//               <a
//                 href="/#why-us"
//                 onClick={(e) => handleSectionScroll(e, "why-us")}
//                 className={`
//                   text-[0.825rem]
//                   font-bold
//                   tracking-[0.16em]
//                   uppercase
//                   transition-all duration-200
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                       : "text-text hover:text-primary"
//                   }
//                 `}
//               >
//                 OUR CRAFT
//               </a>

//               <a
//                 href="/#contact"
//                 onClick={(e) => handleSectionScroll(e, "contact")}
//                 className={`
//                   text-[0.825rem]
//                   font-bold
//                   tracking-[0.16em]
//                   uppercase
//                   transition-all duration-200
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                       : "text-text hover:text-primary"
//                   }
//                 `}
//               >
//                 CONTACT
//               </a>
//             </nav>

//             {/* ================= RIGHT ACTIONS ================= */}
//             <div className="flex items-center gap-5 sm:gap-6">
//               {/* Authenticated Only: Wishlist & Cart */}
//               {user ? (
//                 <>
//                   {/* Wishlist */}
//                   <Link
//                     to="/wishlist"
//                     className={`
//                       relative
//                       inline-flex items-center
//                       transition-transform duration-200
//                       hover:scale-105
//                       ${
//                         isTransparent
//                           ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-accent"
//                           : "text-text hover:text-primary"
//                       }
//                     `}
//                     title="Wishlist"
//                     aria-label="Wishlist"
//                   >
//                     <Heart size={21} strokeWidth={2} />
//                     {wishlistCount > 0 && (
//                       <span className="
//                         absolute
//                         -top-2
//                         -right-2.5
//                         min-w-[18px]
//                         h-[18px]
//                         px-1
//                         flex
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-primary
//                         text-white
//                         text-[10px]
//                         font-bold
//                         shadow-sm
//                       ">
//                         {wishlistCount}
//                       </span>
//                     )}
//                   </Link>

//                   {/* Cart */}
//                   <Link
//                     to="/cart"
//                     className={`
//                       relative
//                       inline-flex items-center
//                       transition-transform duration-200
//                       hover:scale-105
//                       ${
//                         isTransparent
//                           ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-accent"
//                           : "text-text hover:text-primary"
//                       }
//                     `}
//                     title="Cart"
//                     aria-label="Shopping Cart"
//                   >
//                     <ShoppingBag size={21} strokeWidth={2} />

//                     {cartCount > 0 && (
//                       <span className="
//                         absolute
//                         -top-2
//                         -right-2.5
//                         min-w-[18px]
//                         h-[18px]
//                         px-1
//                         flex
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-primary
//                         text-white
//                         text-[10px]
//                         font-bold
//                         shadow-sm
//                       ">
//                         {cartCount}
//                       </span>
//                     )}
//                   </Link>

//                   {/* Profile Link */}
//                   <Link
//                     to="/profile"
//                     className={`
//                       inline-flex items-center gap-1.5
//                       text-[0.8rem]
//                       font-bold
//                       tracking-[0.14em]
//                       uppercase
//                       transition-colors duration-200
//                       ${
//                         isTransparent
//                           ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-accent"
//                           : "text-text hover:text-primary"
//                       }
//                     `}
//                     title="My Profile"
//                   >
//                     <User size={19} strokeWidth={2} />
//                     <span className="hidden lg:inline">
//                       {user.name ? user.name.split(" ")[0] : "ACCOUNT"}
//                     </span>
//                   </Link>

//                   {/* Logout Button */}
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className={`
//                       hidden sm:inline-flex items-center gap-1
//                       text-[0.75rem]
//                       font-bold
//                       tracking-[0.14em]
//                       uppercase
//                       transition-colors duration-200
//                       ${
//                         isTransparent
//                           ? "text-white/80 hover:text-red-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
//                           : "text-text/75 hover:text-red-600"
//                       }
//                     `}
//                     title="Sign Out"
//                     aria-label="Sign Out"
//                   >
//                     <LogOut size={17} strokeWidth={2} />
//                   </button>
//                 </>
//               ) : (
//                 /* Logged Out: Sign In Only (NO Cart, NO Wishlist) */
//                 <Link
//                   to="/login"
//                   className={`
//                     inline-flex items-center gap-1.5
//                     text-[0.825rem]
//                     font-bold
//                     tracking-[0.16em]
//                     uppercase
//                     transition-all duration-200
//                     ${
//                       isTransparent
//                         ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] hover:text-accent"
//                         : "text-text hover:text-primary"
//                     }
//                   `}
//                 >
//                   <User size={19} strokeWidth={2} />
//                   <span className="hidden sm:inline">SIGN IN</span>
//                 </Link>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 type="button"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className={`
//                   md:hidden
//                   bg-transparent
//                   border-0
//                   p-1
//                   cursor-pointer
//                   transition-colors
//                   ${
//                     isTransparent
//                       ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
//                       : "text-text"
//                   }
//                 `}
//                 aria-label="Toggle navigation menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <X size={26} strokeWidth={2} />
//                 ) : (
//                   <Menu size={26} strokeWidth={2} />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ================= MOBILE DRAWER ================= */}
//       <div
//         className={`
//           fixed inset-0
//           bg-background
//           text-text
//           z-[200]
//           flex flex-col
//           p-6
//           transition-transform duration-300
//           ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Mobile Header */}
//           <div className="flex items-center justify-between pb-6 border-b border-text/10">
//             <Link
//               to="/"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="
//                 font-serif
//                 text-2xl
//                 font-bold
//                 tracking-[0.15em]
//               "
//             >
//               CROCHET
//             </Link>

//             <button
//               type="button"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="bg-transparent border-0 cursor-pointer text-text p-1"
//               aria-label="Close menu"
//             >
//               <X size={26} strokeWidth={2} />
//             </button>
//           </div>

//           {/* Mobile Links */}
//           <nav className="flex flex-col gap-6 py-8 flex-1 overflow-y-auto">
//             <Link
//               to="/"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="font-serif text-2xl font-bold tracking-[0.05em] transition hover:text-primary"
//             >
//               HOME
//             </Link>

//             <Link
//               to="/products"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="font-serif text-2xl font-bold tracking-[0.05em] transition hover:text-primary"
//             >
//               SHOP COLLECTION
//             </Link>

//             <a
//               href="/#story"
//               onClick={(e) => {
//                 setIsMobileMenuOpen(false);
//                 handleSectionScroll(e, "story");
//               }}
//               className="font-serif text-2xl font-bold tracking-[0.05em] transition hover:text-primary"
//             >
//               OUR STORY
//             </a>

//             <a
//               href="/#why-us"
//               onClick={(e) => {
//                 setIsMobileMenuOpen(false);
//                 handleSectionScroll(e, "why-us");
//               }}
//               className="font-serif text-2xl font-bold tracking-[0.05em] transition hover:text-primary"
//             >
//               OUR CRAFT
//             </a>

//             <a
//               href="/#contact"
//               onClick={(e) => {
//                 setIsMobileMenuOpen(false);
//                 handleSectionScroll(e, "contact");
//               }}
//               className="font-serif text-2xl font-bold tracking-[0.05em] transition hover:text-primary"
//             >
//               CONTACT
//             </a>

//             {/* Authenticated Links in Mobile Drawer */}
//             {user && (
//               <div className="pt-6 border-t border-text/10 space-y-4">
//                 <Link
//                   to="/cart"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center justify-between text-base font-bold text-text hover:text-primary transition"
//                 >
//                   <span className="flex items-center gap-2.5">
//                     <ShoppingBag size={20} strokeWidth={2} />
//                     <span>Cart</span>
//                   </span>
//                   <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                     {cartCount}
//                   </span>
//                 </Link>

//                 <Link
//                   to="/wishlist"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center justify-between text-base font-bold text-text hover:text-primary transition"
//                 >
//                   <span className="flex items-center gap-2.5">
//                     <Heart size={20} strokeWidth={2} />
//                     <span>Wishlist</span>
//                   </span>
//                   <span className="bg-secondary text-primary text-xs font-bold px-2 py-0.5 rounded-full">
//                     {wishlistCount}
//                   </span>
//                 </Link>

//                 <Link
//                   to="/orders"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-2.5 text-base font-bold text-text hover:text-primary transition"
//                 >
//                   <User size={20} strokeWidth={2} />
//                   <span>My Orders</span>
//                 </Link>

//                 <Link
//                   to="/profile"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-2.5 text-base font-bold text-text hover:text-primary transition"
//                 >
//                   <User size={20} strokeWidth={2} />
//                   <span>My Profile ({user.name})</span>
//                 </Link>
//               </div>
//             )}
//           </nav>

//           {/* Mobile Footer Area */}
//           <div className="pt-6 border-t border-text/10">
//             {user ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsMobileMenuOpen(false);
//                   handleLogout();
//                 }}
//                 className="
//                   w-full
//                   bg-red-50 text-red-700
//                   border border-red-200
//                   text-center
//                   py-3.5
//                   rounded-xl
//                   text-xs font-bold
//                   tracking-[0.15em] uppercase
//                   flex items-center justify-center gap-2
//                   transition
//                 "
//               >
//                 <LogOut size={17} strokeWidth={2} />
//                 <span>Sign Out</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="
//                   block
//                   w-full
//                   bg-primary text-white
//                   text-center
//                   py-3.5
//                   rounded-xl
//                   text-xs font-bold
//                   tracking-[0.15em] uppercase
//                   hover:bg-primary-dark
//                   transition
//                 "
//               >
//                 Sign In / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;


import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Package,
} from "lucide-react";
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
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

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

  const handleSectionScroll = (e, sectionId) => {
    if (location.pathname === "/") {
      e.preventDefault();

      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
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

              {/* HOME */}
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

              {/* SHOP */}
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

              {/* OUR CRAFT */}
              <a
                href="/#why-us"
                onClick={(e) => handleSectionScroll(e, "why-us")}
                className="
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                "
              >
                OUR CRAFT
              </a>

              {/* VIEW ORDERS */}
              <Link
                to="/orders"
                className={`
                  relative
                  text-[0.75rem]
                  font-medium
                  tracking-[0.22em]
                  uppercase
                  transition-opacity duration-200
                  hover:opacity-60
                  ${
                    location.pathname === "/orders"
                      ? "after:absolute after:left-0 after:-bottom-2 after:w-full after:h-px after:bg-current"
                      : ""
                  }
                `}
              >
                VIEW ORDERS
              </Link>
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}
            <div className="flex items-center gap-5 sm:gap-6">

              {/* AUTHENTICATED USER */}     
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
                      <span
                        className="
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
                        "
                      >
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
                      <span
                        className="
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
                        "
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Profile */}
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
                      {user.name
                        ? user.name.split(" ")[0]
                        : "ACCOUNT"}
                    </span>
                  </Link>

                  {/* Logout */}
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
                /* LOGGED OUT */
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

                  <span className="hidden sm:inline">
                    SIGN IN
                  </span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
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
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
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
              className="
                bg-transparent
                border-0
                cursor-pointer
                text-text
                p-1
              "
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-5 py-8 flex-1 overflow-y-auto">

            {/* HOME */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-2xl
                tracking-[0.05em]
                transition
                hover:text-primary
              "
            >
              HOME
            </Link>

            {/* SHOP */}
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-2xl
                tracking-[0.05em]
                transition
                hover:text-primary
              "
            >
              SHOP ALL
            </Link>

            {/* VIEW ORDERS */}
            <Link
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                font-serif
                text-2xl
                tracking-[0.05em]
                transition
                hover:text-primary
              "
            >
              VIEW ORDERS
            </Link>

            {/* OUR CRAFT */}
            <a
              href="/#why-us"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleSectionScroll(e, "why-us");
              }}
              className="
                font-serif
                text-2xl
                tracking-[0.05em]
                transition
                hover:text-primary
              "
            >
              OUR CRAFT
            </a>

            {/* NO CONTACT */}

            {/* Authenticated Links */}
            {user && (
              <div className="pt-4 border-t border-text/10 space-y-4">

                {/* Cart */}
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex items-center justify-between
                    text-base
                    font-medium
                    text-text
                    hover:text-primary
                    transition
                  "
                >
                  <span className="flex items-center gap-2.5">
                    <ShoppingBag size={18} />
                    <span>Cart</span>
                  </span>

                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </Link>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex items-center justify-between
                    text-base
                    font-medium
                    text-text
                    hover:text-primary
                    transition
                  "
                >
                  <span className="flex items-center gap-2.5">
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </span>

                  <span className="bg-secondary text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                </Link>

                {/* My Orders */}
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex items-center gap-2.5
                    text-base
                    font-medium
                    text-text
                    hover:text-primary
                    transition
                  "
                >
                  <Package size={18} />
                  <span>My Orders</span>
                </Link>

                {/* My Profile */}
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex items-center gap-2.5
                    text-base
                    font-medium
                    text-text
                    hover:text-primary
                    transition
                  "
                >
                  <User size={18} />
                  <span>My Profile ({user.name})</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Footer */}
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
                  tracking-[0.15em]
                  uppercase
                  flex items-center
                  justify-center
                  gap-2
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
                  tracking-[0.15em]
                  uppercase
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