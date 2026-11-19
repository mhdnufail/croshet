import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { clearCart } from "../store/cartSlice";
import { createOrder } from "../services/orderService";
import { useToast } from "../context/ToastContext";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { showToast } = useToast();

  const items = useSelector((state) => state.cart.items);

  // Calculate pricing
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  // Form State prefilled with user data if available
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // If cart is empty, redirect to /cart
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      showToast("Please correct the form errors.", "error");
      return;
    }

    if (items.length === 0) {
      showToast("Your cart is empty.", "error");
      navigate("/cart");
      return;
    }

    setSubmitting(true);

    const orderPayload = {
      userId: user?.id,
      userEmail: user?.email || formData.email.trim(),
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: subtotal,
      delivery: delivery,
      total: total,
      shippingAddress: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },
      paymentMethod: paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const createdOrder = await createOrder(orderPayload);

      // Clear the Redux cart only AFTER successful creation
      dispatch(clearCart());
      showToast("Order placed successfully!");

      navigate("/order-success", {
        replace: true,
        state: { order: createdOrder },
      });
    } catch (err) {
      console.error("Order creation failed:", err);
      setServerError(
        "Failed to place order. Please check that the server is running and try again."
      );
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-16 md:py-24 min-h-screen">
      <Container>
        {/* Navigation Breadcrumb */}
        <Link
          to="/cart"
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
            mb-8
          "
        >
          <ArrowLeft size={14} />
          Back to Shopping Bag
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Final Step
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-text mt-2">
            Secure Checkout
          </h1>

          <p className="text-muted mt-2 text-sm">
            Please enter your delivery details to complete your handcrafted order.
          </p>
        </div>

        {serverError && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Customer Information (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping Address Box */}
              <div className="bg-white border border-text/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-text mb-6 pb-3 border-b border-text/10 flex items-center gap-2">
                  <Truck size={20} className="text-primary" />
                  <span>Delivery Address</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Muhammed"
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.name
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.email
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.phone
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      Street Address & Apartment *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Flat, building number, street name, locality"
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.address
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Nilambur"
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.city
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Kerala"
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.state
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                      Pincode (Postal Code) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode (e.g. 679329)"
                      maxLength={6}
                      className={`
                        w-full border rounded-lg px-4 py-3 text-sm text-text outline-none transition
                        ${
                          errors.pincode
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-text/20 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        }
                      `}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods Box */}
              <div className="bg-white border border-text/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-text mb-6 pb-3 border-b border-text/10 flex items-center gap-2">
                  <Banknote size={20} className="text-primary" />
                  <span>Payment Method</span>
                </h2>

                <div className="space-y-4">
                  {/* Cash On Delivery Option */}
                  <label
                    className={`
                      flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition
                      ${
                        paymentMethod === "COD"
                          ? "border-primary bg-secondary/30 ring-1 ring-primary/20"
                          : "border-text/15 hover:border-text/30"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <span className="font-semibold text-text text-sm block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-xs text-muted block mt-1">
                        Pay cash upon delivery at your doorstep with no advance payment.
                      </span>
                    </div>
                  </label>

                  {/* Online Payment (UI preview mode) */}
                  <label
                    className={`
                      flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition
                      ${
                        paymentMethod === "ONLINE"
                          ? "border-primary bg-secondary/30 ring-1 ring-primary/20"
                          : "border-text/15 hover:border-text/30"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={() => setPaymentMethod("ONLINE")}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-text text-sm flex items-center gap-2">
                          <CreditCard size={16} />
                          Online Payment (UPI, Cards, NetBanking)
                        </span>
                        <span className="text-[10px] tracking-wider uppercase font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Test Mode
                        </span>
                      </div>
                      <span className="text-xs text-muted block mt-1">
                        Mock payment gateway demonstration for development.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-secondary rounded-2xl border border-text/10 p-6 sm:p-8 sticky top-24 shadow-sm">
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                  Review Your Order
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl text-text mt-2 mb-6">
                  Order Summary
                </h2>

                {/* Items in Checkout */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 mb-6 border-b border-text/10 pb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3.5 text-sm"
                    >
                      <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-text/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-semibold text-text truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-text">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-text font-semibold">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted">Delivery</span>
                    <span className="text-text font-semibold">
                      {delivery === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-xs">
                          Free
                        </span>
                      ) : (
                        `₹${delivery}`
                      )}
                    </span>
                  </div>

                  <div className="w-full h-px bg-text/15 my-2" />

                  <div className="flex justify-between items-center pt-1">
                    <span className="font-serif text-lg font-bold text-text">
                      Total Payable
                    </span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    w-full
                    mt-8
                    py-4
                    px-6
                    rounded-lg
                    text-xs
                    font-semibold
                    tracking-[0.2em]
                    uppercase
                    bg-primary
                    text-white
                    hover:bg-primary-dark
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2.5
                    shadow-md
                  "
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Placing Your Order...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Place Order (₹{total})</span>
                    </>
                  )}
                </button>

                <div className="mt-5 text-center text-[11px] text-muted space-y-1">
                  <p>🔒 256-bit SSL encrypted checkout</p>
                  <p>Handmade with love • Delivered safely</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}

export default Checkout;
