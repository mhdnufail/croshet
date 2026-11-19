import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate(`/login?redirect=/products/${product.id}`);
      return;
    }

    dispatch(addToCart(product));
    showToast(`Added "${product.name}" to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate(`/login?redirect=/products/${product.id}`);
      return;
    }

    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      showToast("Removed from wishlist", "info");
    } else {
      showToast("Added to wishlist");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-text/10 hover:shadow-lg transition-all duration-300 group flex flex-col">
      {/* Product Image Area */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Floating Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`
            absolute top-3 right-3
            w-9 h-9 rounded-full
            flex items-center justify-center
            transition-all duration-200
            shadow-sm
            ${
              isWishlisted
                ? "bg-white text-red-600 shadow"
                : "bg-white/80 backdrop-blur-sm text-text hover:bg-white hover:text-primary"
            }
          `}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart size={16} className={isWishlisted ? "fill-red-600" : ""} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
            {product.category}
          </p>

          <Link to={`/products/${product.id}`}>
            <h3 className="font-serif text-lg text-text mt-1 hover:text-primary transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-text">₹{product.price}</span>

            {product.rating && (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>{product.rating}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            w-full
            mt-5
            py-2.5
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
          <ShoppingBag size={14} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
