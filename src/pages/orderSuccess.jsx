import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, PackageCheck, ArrowRight } from "lucide-react";
import Container from "../components/Container";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section className="bg-background min-h-[75vh] py-16 md:py-24 flex items-center">
      <Container>
        <div className="max-w-xl mx-auto text-center bg-white border border-text/10 rounded-3xl p-8 sm:p-12 shadow-sm">
          {/* Animated Success Checkmark Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={44} strokeWidth={1.75} />
          </div>

          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Order Confirmed
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text mt-3">
            Thank You for Your Order!
          </h1>

          <p className="text-muted mt-4 text-sm sm:text-base leading-relaxed">
            Your handmade crochet order has been received and is being prepared
            with care. We have sent a confirmation details to your registered
            email address.
          </p>

          {/* Order Details Snippet */}
          {order && (
            <div className="bg-secondary/60 rounded-2xl p-5 my-8 border border-text/10 text-left space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Order ID:</span>
                <span className="font-semibold text-text font-mono">
                  #{order.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Order Date:</span>
                <span className="font-medium text-text">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Today"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Payment Method:</span>
                <span className="font-medium text-text uppercase">
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : order.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-text/10">
                <span className="text-text font-semibold">Total Paid / Due:</span>
                <span className="text-primary font-bold text-base">
                  ₹{order.total}
                </span>
              </div>

              {order.shippingAddress && (
                <div className="pt-2 border-t border-text/10 text-xs text-muted">
                  <span className="block font-semibold text-text mb-0.5">
                    Shipping to:
                  </span>
                  <span>
                    {order.shippingAddress.name}, {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/orders"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center gap-2
                bg-primary text-white
                px-8 py-3.5
                rounded-lg
                text-xs font-semibold
                tracking-[0.15em] uppercase
                hover:bg-primary-dark
                transition
                shadow-sm
              "
            >
              <PackageCheck size={16} />
              <span>View My Orders</span>
            </Link>

            <Link
              to="/products"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center gap-2
                bg-secondary text-text
                border border-text/15
                px-8 py-3.5
                rounded-lg
                text-xs font-semibold
                tracking-[0.15em] uppercase
                hover:bg-text hover:text-white
                transition
              "
            >
              <ShoppingBag size={16} />
              <span>Continue Shopping</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrderSuccess;
