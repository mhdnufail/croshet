import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_BADGE = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  Processing: "bg-purple-100 text-purple-800 border-purple-300",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:3000/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      // Sort newest first
      const sorted = (data || []).sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setOrders(sorted);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const order = orders.find((o) => String(o.id) === String(orderId));
      if (!order) return;

      const updated = {
        ...order,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Failed to update order status");

      const savedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) =>
          String(o.id) === String(orderId) ? { ...o, ...savedOrder } : o
        )
      );

      if (selectedOrder && String(selectedOrder.id) === String(orderId)) {
        setSelectedOrder((prev) => ({ ...prev, ...savedOrder }));
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const id = String(order.id || "").toLowerCase();
    const email = (order.userEmail || "").toLowerCase();
    const name = (order.shippingAddress?.name || "").toLowerCase();

    const matchesSearch =
      id.includes(term) || email.includes(term) || name.includes(term);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#2F241F]">Orders</h1>
          <p className="text-[#756A64] mt-2">
            View customer orders and update fulfillment status.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, name, email..."
            className="w-full sm:w-60 bg-white border border-[#2F241F]/20 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#8B5E3C]"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#2F241F]/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8B5E3C]"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && orders.length === 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 p-12 text-center">
          <p className="text-[#756A64]">Loading orders...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 p-12 text-center">
          <h2 className="text-xl font-semibold text-[#2F241F]">No orders found</h2>
          <p className="text-[#756A64] mt-2">
            {searchTerm || statusFilter !== "All"
              ? "Try adjusting your filters."
              : "No customer orders have been placed yet."}
          </p>
        </div>
      )}

      {/* Orders Table */}
      {filteredOrders.length > 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F5EBE0] text-[#2F241F]">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2F241F]/10">
                {currentOrders.map((order) => {
                  const isUpdating = updatingId === order.id;
                  const dateFormatted = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[#FFF8F0]/50 transition"
                    >
                      <td className="px-5 py-4 text-sm font-mono text-[#8B5E3C] font-semibold">
                        #{String(order.id).slice(0, 8)}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        <div className="font-medium text-[#2F241F]">
                          {order.shippingAddress?.name || "Customer"}
                        </div>
                        <div className="text-xs text-[#756A64]">
                          {order.userEmail || "No email"}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#756A64]">
                        {dateFormatted}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#2F241F]">
                        ₹{order.total || 0}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        <select
                          value={order.status || "Pending"}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`
                            px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer outline-none transition
                            ${
                              STATUS_BADGE[order.status] ||
                              "bg-gray-100 text-gray-700 border-gray-300"
                            }
                            ${isUpdating ? "opacity-50 cursor-wait" : ""}
                          `}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-5 py-4 text-sm text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#2F241F]/20 text-[#8B5E3C] hover:bg-[#F5EBE0] transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#2F241F]/10 bg-[#FFF8F0]/30 text-sm">
              <p className="text-xs text-[#756A64]">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded border border-[#2F241F]/20 text-xs disabled:opacity-40 hover:bg-[#F5EBE0]"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold ${
                        currentPage === pageNum
                          ? "bg-[#8B5E3C] text-white"
                          : "border border-[#2F241F]/20 hover:bg-[#F5EBE0]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded border border-[#2F241F]/20 text-xs disabled:opacity-40 hover:bg-[#F5EBE0]"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2F241F]/10 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-serif text-[#2F241F]">
                  Order #{String(selectedOrder.id).slice(0, 10)}
                </h2>
                <p className="text-xs text-[#756A64] mt-1">
                  Placed on{" "}
                  {selectedOrder.createdAt
                    ? new Date(selectedOrder.createdAt).toLocaleString("en-IN")
                    : "N/A"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-[#756A64] hover:text-[#2F241F] text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-[#FFF8F0] rounded-xl p-4 mb-6 border border-[#2F241F]/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
                Shipping & Customer Details
              </h3>
              <p className="text-sm font-medium text-[#2F241F]">
                {selectedOrder.shippingAddress?.name || "Customer"} (
                {selectedOrder.userEmail})
              </p>
              <p className="text-sm text-[#756A64] mt-1">
                Phone: {selectedOrder.shippingAddress?.phone || "N/A"}
              </p>
              <p className="text-sm text-[#756A64]">
                Address: {selectedOrder.shippingAddress?.address},{" "}
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state} -{" "}
                {selectedOrder.shippingAddress?.pincode}
              </p>
              <p className="text-sm text-[#756A64] mt-1">
                Payment Method:{" "}
                <span className="font-semibold text-[#2F241F]">
                  {selectedOrder.paymentMethod || "COD"}
                </span>
              </p>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-3">
                Items ({selectedOrder.items?.length || 0})
              </h3>

              <div className="divide-y divide-[#2F241F]/10 border border-[#2F241F]/10 rounded-xl overflow-hidden">
                {(selectedOrder.items || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-[#2F241F]/10"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-[#2F241F]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#756A64]">
                          Qty: {item.quantity || 1} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[#2F241F]">
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="border-t border-[#2F241F]/10 pt-4 flex justify-between items-center text-base font-semibold text-[#2F241F]">
              <span>Total Amount:</span>
              <span className="text-[#8B5E3C] text-xl">
                ₹{selectedOrder.total || 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
