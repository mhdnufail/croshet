import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact" className="border-t bg-gray-950 text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">
              Crochet Store
            </h2>

            <p className="mt-3 text-gray-400">
              Handmade crochet products crafted with
              care and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                className="text-gray-400 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-gray-400 hover:text-white"
              >
                Products
              </Link>

              <Link
                to="/wishlist"
                className="text-gray-400 hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="text-gray-400 hover:text-white"
              >
                Cart
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              Email: crochetstore@gmail.com
            </p>

            <p className="text-gray-400 mt-2">
              Phone: +91 920700 9383
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Crochet Store. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;