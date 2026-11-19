import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Container from "../components/Container";
import { removeFromWishlist, clearWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { useToast } from "../context/ToastContext";

function Wishlist() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const items = useSelector((state) => state.wishlist.items);

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    showToast(`"${product.name}" moved to cart`);
  };

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product.id));
    showToast(`Removed from wishlist`, "info");
  };

  if (items.length === 0) {
    return (
      <section className="bg-background min-h-[70vh] py-20 flex items-center">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 text-primary">
              <Heart size={28} strokeWidth={1.5} />
            </div>

            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Curated Favorites
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
              Your Wishlist is Empty
            </h1>

            <p className="text-muted mt-4 leading-relaxed text-sm md:text-base">
              You haven&apos;t saved any crochet treasures yet. Explore our handcrafted
              collection and tap the heart icon to save items you love.
            </p>

            <Link
              to="/products"
              className="
                inline-flex
                items-center
                gap-3
                mt-8
                bg-primary
                text-white
                px-8
                py-3.5
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                rounded-lg
                hover:bg-primary-dark
                transition
              "
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Curated By You
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-2">
              My Wishlist
            </h1>

            <p className="text-muted mt-2 text-sm">
              {items.length} {items.length === 1 ? "piece" : "pieces"} saved
            </p>
          </div>

          <button
            onClick={() => {
              dispatch(clearWishlist());
              showToast("Wishlist cleared", "info");
            }}
            className="text-xs font-semibold tracking-[0.15em] uppercase text-muted hover:text-red-600 transition w-fit"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="
                bg-white
                border border-text/10
                rounded-2xl
                overflow-hidden
                flex flex-col
                group
                hover:shadow-md
                transition duration-300
              "
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition duration-500
                    "
                  />
                </Link>

                {/* Remove button overlay */}
                <button
                  onClick={() => handleRemove(product)}
                  className="
                    absolute
                    top-3
                    right-3
                    w-9
                    h-9
                    rounded-full
                    bg-white/90
                    backdrop-blur-sm
                    text-text
                    hover:text-red-600
                    flex
                    items-center
                    justify-center
                    shadow-sm
                    transition
                  "
                  title="Remove from wishlist"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">
                  {product.category}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="
                    font-serif
                    text-lg
                    text-text
                    mt-1
                    hover:text-primary
                    transition
                    line-clamp-1
                  "
                >
                  {product.name}
                </Link>

                {/* Price */}
                <div className="flex items-center justify-between mt-3 mb-5">
                  <span className="text-xl font-bold text-text">
                    ₹{product.price}
                  </span>
                  {product.rating && (
                    <span className="text-xs text-muted">
                      ⭐ {product.rating}
                    </span>
                  )}
                </div>

                {/* Move to Cart button */}
                <button
                  type="button"
                  onClick={() => handleMoveToCart(product)}
                  className="
                    w-full
                    mt-auto
                    py-3
                    px-4
                    rounded-lg
                    text-xs
                    font-semibold
                    tracking-[0.15em]
                    uppercase
                    bg-primary
                    text-white
                    hover:bg-primary-dark
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <ShoppingBag size={15} />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Wishlist;
