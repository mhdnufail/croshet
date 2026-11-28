import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    productsCount: 0,
    usersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch("http://localhost:3000/products"),
      fetch("http://localhost:3000/users"),
      fetch("http://localhost:3000/orders"),
    ])
      .then(async ([productsRes, usersRes, ordersRes]) => {
        const products = productsRes.ok ? await productsRes.json() : [];
        const users = usersRes.ok ? await usersRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];

        if (isMounted) {
          const revenue = (orders || []).reduce(
            (sum, order) => sum + (Number(order.total) || 0),
            0
          );

          setStats({
            productsCount: (products || []).length,
            usersCount: (users || []).length,
            ordersCount: (orders || []).length,
            totalRevenue: revenue,
          });

          const sorted = (orders || []).sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          setRecentOrders(sorted.slice(0, 5));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Dashboard data fetch error:", err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#2F241F]">Dashboard</h1>
        <p className="text-[#756A64] mt-2">
          Real-time overview of your Chrochet store.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <Link
          to="/admin/products"
          className="bg-white rounded-xl p-6 border border-[#2F241F]/10 hover:shadow-md transition block"
        >
          <p className="text-sm text-[#756A64]">Total Products</p>
          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            {loading ? "..." : stats.productsCount}
          </h2>
          <p className="text-xs text-[#8B5E3C] mt-2 font-medium">
            Manage Products &rarr;
          </p>
        </Link>

        {/* Total Users */}
        <Link
          to="/admin/users"
          className="bg-white rounded-xl p-6 border border-[#2F241F]/10 hover:shadow-md transition block"
        >
          <p className="text-sm text-[#756A64]">Total Users</p>
          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            {loading ? "..." : stats.usersCount}
          </h2>
          <p className="text-xs text-[#8B5E3C] mt-2 font-medium">
            Manage Users &rarr;
          </p>
        </Link>

        {/* Total Orders */}
        <Link
          to="/admin/orders"
          className="bg-white rounded-xl p-6 border border-[#2F241F]/10 hover:shadow-md transition block"
        >
          <p className="text-sm text-[#756A64]">Total Orders</p>
          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            {loading ? "..." : stats.ordersCount}
          </h2>
          <p className="text-xs text-[#8B5E3C] mt-2 font-medium">
            Manage Orders &rarr;
          </p>
        </Link>

        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 border border-[#2F241F]/10">
          <p className="text-sm text-[#756A64]">Total Revenue</p>
          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            {loading ? "..." : `₹${stats.totalRevenue.toLocaleString("en-IN")}`}
          </h2>
          <p className="text-xs text-[#756A64] mt-2 font-medium">
            All customer orders
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8 bg-white rounded-xl border border-[#2F241F]/10 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#2F241F]/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif text-[#2F241F]">Recent Orders</h2>
            <p className="text-xs text-[#756A64] mt-1">
              Latest transactions placed by customers
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-sm font-semibold text-[#8B5E3C] hover:underline"
          >
            View All Orders &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#756A64] text-sm">
            Loading recent orders...
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center text-[#756A64] text-sm">
            No orders placed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5EBE0] text-[#2F241F]">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2F241F]/10">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFF8F0]/50 transition">
                    <td className="px-5 py-3.5 text-sm font-mono text-[#8B5E3C]">
                      #{String(order.id).slice(0, 8)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#2F241F]">
                      {order.shippingAddress?.name || "Customer"}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#756A64]">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN")
                        : "N/A"}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#2F241F]">
                      ₹{order.total || 0}
                    </td>
                    <td className="px-5 py-3.5 text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F5EBE0] text-[#8B5E3C]">
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Welcome Card */}
      <div className="mt-8 bg-[#F5EBE0] rounded-xl p-8 border border-[#2F241F]/10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8B5E3C] font-semibold">
          Chrochet Admin
        </p>
        <h2 className="text-2xl font-serif mt-3 text-[#2F241F]">
          Welcome to your store control center
        </h2>
        <p className="text-[#756A64] mt-3 max-w-2xl text-sm leading-relaxed">
          Use the left sidebar navigation to view and edit products, manage user
          access privileges, and process customer fulfillment orders.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
