import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingBag, ArrowLeft, Star, Check } from "lucide-react";
import Container from "../components/Container";
import Loader from "../components/Loader";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getProductById } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  // Fetch product from JSON Server
  useEffect(() => {
    let isMounted = true;

    getProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        if (isMounted) {
          setError("Product not found");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!user) {
      navigate(`/login?redirect=/products/${product.id}`);
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
      })
    );

    setJustAdded(true);
    showToast(
      `Added ${quantity} ${quantity === 1 ? "item" : "items"} of "${product.name}" to cart`
    );

    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const handleToggleWishlist = () => {
    if (!product) return;

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

  // Loading state
  if (loading) {
    return <Loader fullScreen message="Loading crochet piece..." />;
  }

  // Error / Not Found state
  if (error || !product) {
    return (
      <section className="bg-background min-h-[60vh] flex items-center justify-center py-20">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Item Unavailable
            </p>

            <h1 className="font-serif text-4xl text-text mt-3">
              Product Not Found
            </h1>

            <p className="text-muted mt-3 text-sm leading-relaxed">
              The handmade piece you are looking for is currently unavailable or
              does not exist.
            </p>

            <Link
              to="/products"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-primary
                text-white
                px-6
                py-3
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                rounded-lg
                hover:bg-primary-dark
                transition
              "
            >
              <ArrowLeft size={16} />
              Back to Collection
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        {/* Back Link */}
        <Link
          to="/products"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-semibold
            tracking-[0.15em]
            uppercase
            text-muted
            hover:text-primary
            transition
            mb-10
          "
        >
          <ArrowLeft size={15} />
          Back to Collection
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="bg-secondary rounded-2xl overflow-hidden aspect-square border border-text/10 shadow-sm relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text mt-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center text-amber-600">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm font-semibold text-text">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-muted tracking-wide uppercase">
                / 5.0 Handcrafted Rating
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-serif font-semibold text-text mt-6">
              ₹{product.price}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-text/10 my-8" />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-text">
                About this piece
              </h3>
              <p className="text-muted leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label
                htmlFor="product-quantity"
                className="block text-xs font-semibold tracking-[0.2em] uppercase text-text mb-3"
              >
                Quantity
              </label>

              <div className="flex items-center border border-text/20 rounded-lg w-fit overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="
                    w-11
                    h-11
                    text-base
                    text-text
                    hover:bg-secondary
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  −
                </button>

                <span
                  id="product-quantity"
                  className="w-14 text-center font-medium text-text text-sm select-none"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                  className="
                    w-11
                    h-11
                    text-base
                    text-text
                    hover:bg-secondary
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-8">
              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`
                  flex-1
                  py-4
                  px-6
                  rounded-lg
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  uppercase
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  shadow-sm
                  ${
                    justAdded
                      ? "bg-green-700 text-white"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }
                `}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Cart ({quantity})</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`
                  w-14
                  h-12
                  rounded-lg
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-200
                  ${
                    isWishlisted
                      ? "bg-red-50 border-red-300 text-red-600"
                      : "bg-white border-text/20 text-text hover:bg-secondary hover:text-primary"
                  }
                `}
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
                aria-label={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-red-600" : ""}
                />
              </button>
            </div>

            {/* Delivery Highlight */}
            <div className="mt-8 p-4 rounded-xl bg-secondary/60 border border-text/10 text-xs text-muted space-y-1.5">
              <p className="font-semibold text-text uppercase tracking-wider">
                Handmade Guarantee
              </p>
              <p>
                Each item is lovingly crocheted by hand. Orders over ₹1000 qualify
                for complimentary free shipping across India.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductDetails;
