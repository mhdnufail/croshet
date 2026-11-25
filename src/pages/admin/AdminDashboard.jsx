function AdminDashboard() {
  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#2F241F]">
          Dashboard
        </h1>

        <p className="text-[#756A64] mt-2">
          Overview of your Chrochet store.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl p-6 border border-[#2F241F]/10">
          <p className="text-sm text-[#756A64]">
            Total Products
          </p>

          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#2F241F]/10">
          <p className="text-sm text-[#756A64]">
            Total Users
          </p>

          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#2F241F]/10">
          <p className="text-sm text-[#756A64]">
            Total Orders
          </p>

          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#2F241F]/10">
          <p className="text-sm text-[#756A64]">
            Revenue
          </p>

          <h2 className="text-3xl font-semibold text-[#8B5E3C] mt-3">
            ₹0
          </h2>
        </div>

      </div>

      {/* Welcome Card */}
      <div className="mt-8 bg-[#F5EBE0] rounded-xl p-8">

        <p className="text-xs uppercase tracking-[0.2em] text-[#8B5E3C] font-semibold">
          Chrochet Store
        </p>

        <h2 className="text-2xl font-serif mt-3">
          Manage your store from one place.
        </h2>

        <p className="text-[#756A64] mt-3 max-w-2xl">
          Use the sidebar to manage products, users and customer orders.
          Dashboard statistics will be connected to your JSON Server data
          in the next steps.
        </p>

      </div>

    </div>
  );
}

export default AdminDashboard;