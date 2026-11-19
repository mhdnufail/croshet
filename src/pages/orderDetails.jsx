import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
} from "lucide-react";
import Container from "../components/Container";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getOrderById } from "../services/orderService";

const STATUS_STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getOrderById(id)
      .then((data) => {
        if (!isMounted) return;

        if (!data) {
          setError("Order not found");
          setLoading(false);
          return;
        }

        // Ownership verification: user can only view their own order
        const isOwner =
          (user?.id && String(data.userId) === String(user.id)) ||
          (user?.email &&
            data.userEmail?.toLowerCase() === user.email.toLowerCase());

        if (!isOwner) {
          setIsUnauthorized(true);
          setLoading(false);
          return;
        }

        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load order:", err);
        if (isMounted) {
          setError("Order not found or unable to load details.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, user]);

  if (loading) {
    return <Loader fullScreen message="Loading order details..." />;
  }

  // Unauthorized or Not Found
  if (isUnauthorized || error || !order) {
    return (
      <section className="bg-background min-h-[60vh] flex items-center justify-center py-20">
        <Container>
          <div className="text-center max-w-md mx-auto bg-white border border-text/10 rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} />
            </div>

            <h1 className="font-serif text-2xl md:text-3xl text-text">
              {isUnauthorized ? "Unauthorized Access" : "Order Not Found"}
            </h1>

            <p className="text-muted mt-3 text-sm leading-relaxed">
              {isUnauthorized
                ? "You do not have permission to view this order. You may only view orders associated with your account."
                : "The requested order could not be located in our system."}
            </p>

            <Link
              to="/orders"
              className="
                inline-flex items-center gap-2
                mt-6
                bg-primary text-white
                px-6 py-2.5
                rounded-lg
                text-xs font-semibold
                tracking-[0.15em] uppercase
                hover:bg-primary-dark
                transition
              "
            >
              <ArrowLeft size={14} />
              <span>Back to My Orders</span>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  // Determine current step index for the progress bar
  const currentStepIndex = STATUS_STEPS.indexOf(order.status || "Pending");

  return (
    <section className="bg-background py-16 md:py-24 min-h-screen">
      <Container>
        {/* Navigation Breadcrumb */}
        <Link
          to="/orders"
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
          Back to My Orders
        </Link>

        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-text/10 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl md:text-4xl text-text">
                Order #{order.id}
              </h1>
              <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                {order.status || "Pending"}
              </span>
            </div>

            <p className="text-muted text-xs sm:text-sm mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Placed on{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                Payment:{" "}
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : order.paymentMethod}
              </span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-muted block">Total Paid / Payable</span>
            <span className="text-2xl sm:text-3xl font-bold font-serif text-primary">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Order Status Progress Tracker */}
        {order.status !== "Cancelled" ? (
          <div className="bg-white border border-text/10 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-text mb-6">
              Order Timeline
            </h2>

            <div className="grid grid-cols-4 gap-2 relative">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} className="flex flex-col items-center text-center">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition
                        ${
                          isPassed
                            ? "bg-primary text-white"
                            : "bg-secondary text-muted"
                        }
                        ${isCurrent ? "ring-4 ring-primary/20" : ""}
                      `}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`
                        text-xs mt-2 font-medium tracking-wide
                        ${isPassed ? "text-text font-semibold" : "text-muted"}
                      `}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6 mb-10 text-red-800 text-sm">
            This order has been cancelled.
          </div>
        )}

        {/* Order Content Grid: Items (8 cols) & Shipping Details (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order Items Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-text/10 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-text mb-6 pb-4 border-b border-text/10 flex items-center gap-2">
              <Package size={20} className="text-primary" />
              <span>Items in this Order ({order.items?.length || 0})</span>
            </h2>

            <div className="divide-y divide-text/10">
              {(order.items || []).map((item, idx) => {
                const lineTotal = item.price * (item.quantity || 1);

                return (
                  <div
                    key={idx}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-secondary overflow-hidden shrink-0 border border-text/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        {item.category && (
                          <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-primary">
                            {item.category}
                          </span>
                        )}

                        <Link
                          to={`/products/${item.id}`}
                          className="font-serif text-lg text-text hover:text-primary transition block mt-0.5"
                        >
                          {item.name}
                        </Link>

                        <p className="text-xs text-muted mt-1">
                          ₹{item.price} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-xs text-muted block sm:inline mr-2 sm:mr-0">
                        Total:
                      </span>
                      <span className="font-semibold text-text text-base">
                        ₹{lineTotal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="mt-8 pt-6 border-t border-text/10 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold text-text">₹{order.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Delivery</span>
                <span className="font-semibold text-text">
                  {order.delivery === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-xs">
                      Free
                    </span>
                  ) : (
                    `₹${order.delivery}`
                  )}
                </span>
              </div>

              <div className="w-full h-px bg-text/15 my-2" />

              <div className="flex justify-between items-center pt-1 text-base">
                <span className="font-serif font-bold text-text">
                  Total Paid / Payable
                </span>
                <span className="font-serif text-xl font-bold text-primary">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-secondary rounded-2xl border border-text/10 p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl text-text mb-4 pb-3 border-b border-text/10 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>Delivery Address</span>
              </h2>

              {order.shippingAddress ? (
                <div className="text-sm text-muted space-y-2">
                  <p className="font-semibold text-text text-base">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p className="pt-2 border-t border-text/10 text-xs text-text">
                    <strong>Phone:</strong> {order.shippingAddress.phone}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted">No address specified.</p>
              )}
            </div>

            <div className="bg-white border border-text/10 rounded-2xl p-6 text-xs text-muted space-y-2 shadow-sm">
              <p className="font-semibold text-text uppercase tracking-wider flex items-center gap-1.5">
                <Truck size={15} className="text-primary" />
                <span>Shipping Note</span>
              </p>
              <p>
                Every crochet piece is handcrafted. Delivery typically takes 4–7
                business days. Tracking updates are provided via email.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrderDetails;
