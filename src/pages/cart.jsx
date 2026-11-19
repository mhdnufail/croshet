import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Truck } from "lucide-react";
import Container from "../components/Container";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import { useToast } from "../context/ToastContext";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const items = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Delivery charge: Free if >= 1000, ₹50 if < 1000 and > 0
  const delivery = subtotal >= 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const amountNeededForFreeDelivery = Math.max(0, 1000 - subtotal);

  // Final total
  const total = subtotal + delivery;

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    showToast(`Removed "${item.name}" from cart`, "info");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast("Cart cleared", "info");
  };

  // Empty Cart State
  if (items.length === 0) {
    return (
      <section className="bg-background min-h-[70vh] py-20 flex items-center">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 text-primary">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>

            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Your Shopping Bag
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
              Your Cart is Empty
            </h1>

            <p className="text-muted mt-4 leading-relaxed text-sm md:text-base">
              Looks like you haven&apos;t added any handmade crochet items to your cart
              yet. Explore our warm collection and find something you love.
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
              Start Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-24 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Your Selection
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-text mt-2">
            Shopping Cart
          </h1>

          <p className="text-muted mt-2 text-sm">
            {items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
            {items.reduce((sum, i) => sum + i.quantity, 0) === 1
              ? "item"
              : "items"}{" "}
            in your bag
          </p>
        </div>

        {/* Free Delivery Bar */}
        {subtotal > 0 && subtotal < 1000 ? (
          <div className="mb-8 p-4 rounded-xl bg-secondary/80 border border-text/10 flex items-center gap-3 text-xs text-text">
            <Truck size={18} className="text-primary shrink-0" />
            <span>
              Add <strong className="text-primary">₹{amountNeededForFreeDelivery}</strong> more of handcrafted goods to enjoy <strong>FREE Delivery</strong>!
            </span>
          </div>
        ) : (
          <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
            <Truck size={18} className="text-emerald-600 shrink-0" />
            <span>
              Congratulations! Your order qualifies for <strong>Free Delivery</strong>.
            </span>
          </div>
        )}

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="
                    bg-white
                    border border-text/10
                    rounded-2xl
                    p-4
                    sm:p-5
                    shadow-sm
                    hover:shadow
                    transition
                  "
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.id}`}
                      className="
                        w-full
                        sm:w-28
                        h-28
                        shrink-0
                        bg-secondary
                        overflow-hidden
                        rounded-xl
                        border border-text/5
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          hover:scale-105
                          transition duration-500
                        "
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">
                            {item.category}
                          </p>

                          <Link
                            to={`/products/${item.id}`}
                            className="
                              font-serif
                              text-lg
                              sm:text-xl
                              text-text
                              hover:text-primary
                              transition
                              mt-0.5
                              block
                            "
                          >
                            {item.name}
                          </Link>

                          <p className="text-sm text-muted mt-1">
                            ₹{item.price} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          className="
                            text-muted
                            hover:text-red-600
                            p-1.5
                            rounded-lg
                            hover:bg-red-50
                            transition
                          "
                          title="Remove item"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-text/5">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-text/20 rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            className="
                              w-8
                              h-8
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

                          <span className="w-10 text-center text-xs font-semibold text-text">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            aria-label="Increase quantity"
                            className="
                              w-8
                              h-8
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

                        {/* Line Total */}
                        <div className="text-right">
                          <span className="text-xs text-muted block">Subtotal</span>
                          <span className="text-base font-semibold text-text">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={handleClearCart}
                className="
                  text-xs
                  font-semibold
                  tracking-[0.15em]
                  uppercase
                  text-muted
                  hover:text-red-600
                  transition
                "
              >
                Clear Cart
              </button>

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
                  text-primary
                  hover:text-primary-dark
                  transition
                "
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-2xl border border-text/10 p-6 sm:p-8 sticky top-24 shadow-sm">
              <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                Summary
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl text-text mt-2">
                Order Total
              </h2>

              {/* Subtotal, Delivery, Total */}
              <div className="mt-6 space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-text font-semibold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Delivery</span>
                  <span className="text-text font-semibold">
                    {delivery === 0 ? (
                      <span className="text-emerald-700 uppercase text-xs tracking-wider font-bold">
                        Free
                      </span>
                    ) : (
                      `₹${delivery}`
                    )}
                  </span>
                </div>

                <div className="w-full h-px bg-text/15 my-2" />

                <div className="flex justify-between items-center pt-1">
                  <span className="text-text font-serif text-lg font-bold">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-bold text-primary font-serif">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout */}
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="
                  w-full
                  mt-8
                  bg-primary
                  text-white
                  py-4
                  px-6
                  rounded-lg
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  uppercase
                  hover:bg-primary-dark
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-sm
                "
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-center text-[11px] text-muted mt-4">
                Taxes and discounts calculated during checkout
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Cart;
