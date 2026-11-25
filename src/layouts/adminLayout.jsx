import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2F241F] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#2F241F] text-white min-h-screen hidden md:flex flex-col">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <p className="text-[#D9A679] text-xs font-semibold tracking-[0.3em] uppercase">
            Chrochet
          </p>

          <h1 className="text-2xl font-serif mt-2">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          {navigation.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block px-4 py-3 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-[#8B5E3C] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Admin Info */}
        <div className="border-t border-white/10 p-5">

          <p className="text-xs text-white/40 uppercase tracking-wider">
            Signed in as
          </p>

          <p className="text-sm mt-1 text-white">
            {admin?.name || "Admin"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-[#D9A679] hover:text-white transition"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Header */}
        <header className="h-20 bg-white border-b border-[#2F241F]/10 flex items-center justify-between px-6 md:px-10">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#756A64]">
              Admin Dashboard
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Welcome, {admin?.name || "Admin"}
            </h2>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-[#8B5E3C] hover:text-[#6F472D] font-medium"
          >
            Logout
          </button>

        </header>

        {/* Page Content */}
        <section className="p-6 md:p-10">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;