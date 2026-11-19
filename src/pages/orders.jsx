import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight, Eye, Calendar, Clock } from "lucide-react";
import Container from "../components/Container";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getUserOrders } from "../services/orderService";

const STATUS_BADGE = {
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Confirmed: "bg-blue-50 text-blue-800 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-800 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-50 text-red-800 border-red-200",
};

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getUserOrders(user?.id, user?.email)
      .then((data) => {
        if (isMounted) {
          // Sort newest orders first
          const sorted = (data || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sorted);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load orders:", err);
        if (isMounted) {
          setError("Unable to load orders. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return <Loader fullScreen message="Loading your orders..." />;
  }

  if (error) {
    return (
      <section className="bg-background min-h-[60vh] flex items-center justify-center py-20">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <h2 className="font-serif text-3xl text-text">Something went wrong</h2>
            <p className="text-muted mt-2 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-primary-dark transition"
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="bg-background min-h-[70vh] py-20 flex items-center">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 text-primary">
              <Package size={28} strokeWidth={1.5} />
            </div>

            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Order History
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
              No Orders Yet
            </h1>

            <p className="text-muted mt-4 leading-relaxed text-sm md:text-base">
              You haven&apos;t placed any crochet orders yet. Explore our handmade
              collection and treat yourself or a loved one to something unique.
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
              Discover Collection
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
            Account Activity
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-text mt-2">
            My Orders
          </h1>

          <p className="text-muted mt-2 text-sm">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const itemCount = (order.items || []).reduce(
              (sum, item) => sum + (item.quantity || 1),
              0
            );

            const badgeClass =
              STATUS_BADGE[order.status] ||
              "bg-secondary text-text border-text/10";

            return (
              <div
                key={order.id}
                className="
                  bg-white
                  border border-text/10
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow
                  transition
                "
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-text/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif font-bold text-lg text-text">
                      Order #{order.id}
                    </span>

                    <span
                      className={`
                        text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border
                        ${badgeClass}
                      `}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Recent"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {order.paymentMethod === "COD"
                        ? "COD"
                        : "Online Paid"}
                    </span>
                  </div>
                </div>

                {/* Items Preview Area */}
                <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Thumbnails of items */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
                    {(order.items || []).slice(0, 4).map((item, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-xl bg-secondary overflow-hidden shrink-0 border border-text/10 relative group"
                        title={`${item.name} (x${item.quantity})`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute bottom-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    ))}

                    {(order.items || []).length > 4 && (
                      <div className="w-16 h-16 rounded-xl bg-secondary/80 flex items-center justify-center shrink-0 border border-text/10 text-xs font-semibold text-muted">
                        +{(order.items || []).length - 4} more
                      </div>
                    )}

                    <div className="ml-2">
                      <p className="text-sm font-medium text-text">
                        {itemCount} {itemCount === 1 ? "handmade item" : "handmade items"}
                      </p>
                      <p className="text-xs text-muted">
                        {(order.items || [])
                          .map((i) => i.name)
                          .slice(0, 2)
                          .join(", ")}
                        {(order.items || []).length > 2 && "..."}
                      </p>
                    </div>
                  </div>

                  {/* Order Total & Action Button */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-text/5">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-muted block">Total Amount</span>
                      <span className="text-xl font-bold font-serif text-primary">
                        ₹{order.total}
                      </span>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        bg-secondary
                        text-text
                        hover:bg-primary
                        hover:text-white
                        border border-text/15
                        px-4
                        py-2.5
                        rounded-lg
                        text-xs
                        font-semibold
                        tracking-[0.15em]
                        uppercase
                        transition
                      "
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Orders;
