import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="px-6 md:px-10 py-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">

            <Link
              to="/"
              className="text-xs tracking-[0.25em] uppercase text-white
              hover:opacity-60 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-xs tracking-[0.25em] uppercase text-white
              hover:opacity-60 transition"
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="text-xs tracking-[0.25em] uppercase text-white
              hover:opacity-60 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-xs tracking-[0.25em] uppercase text-white
              hover:opacity-60 transition"
            >
              Contact
            </Link>

          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-white text-xl hover:opacity-60 transition"
          >
            🛍
          </Link>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;