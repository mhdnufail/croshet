import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../store/AdminProductSlice";

function AdminProducts() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  // Fetch products
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
    });

    setEditingProduct(null);
    setShowForm(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add / Update product
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
    };

    // Update existing product
    if (editingProduct) {
      dispatch(
        updateAdminProduct({
          ...productData,
          id: editingProduct.id,
        })
      );
    }

    // Add new product
    else {
      const numericIds = items
        .map((product) => Number(product.id))
        .filter((id) => !isNaN(id));

      const newId =
        numericIds.length > 0
          ? Math.max(...numericIds) + 1
          : 1;

      dispatch(
        addAdminProduct({
          ...productData,
          id: newId,
        })
      );
    }

    resetForm();
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      image: product.image || "",
    });

    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      dispatch(deleteAdminProduct(id));
    }
  };

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    items.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = items.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Change page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // =========================
  // UI
  // =========================

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-serif text-[#2F241F]">
            Products
          </h1>

          <p className="text-[#756A64] mt-2">
            Manage your store products.
          </p>
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => {
            setEditingProduct(null);

            setFormData({
              name: "",
              category: "",
              price: "",
              image: "",
            });

            setShowForm(true);
          }}
          style={{
            backgroundColor: "#8B5E3C",
            color: "#FFFFFF",
          }}
          className="px-5 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition"
        >
          + Add Product
        </button>

      </div>

      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (
        <div className="bg-white border border-[#2F241F]/10 rounded-xl p-6 mb-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-semibold">
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <button
              onClick={resetForm}
              className="text-[#756A64] hover:text-[#2F241F]"
            >
              ✕
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#2F241F]/20 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                  placeholder="Crochet Flower"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#2F241F]/20 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                  placeholder="Flowers"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-[#2F241F]/20 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                  placeholder="299"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#2F241F]/20 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                  placeholder="/images/product.jpg"
                />
              </div>

            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                style={{
                  backgroundColor: "#8B5E3C",
                  color: "#FFFFFF",
                }}
                className="px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90"
              >
                {editingProduct
                  ? "Update Product"
                  : "Add Product"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg text-sm font-semibold border border-[#2F241F]/20 hover:bg-[#F5EBE0]"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-[#756A64]">
            Loading products...
          </p>
        </div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 p-12 text-center">

          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="text-[#756A64] mt-2">
            Add your first product to get started.
          </p>

        </div>
      )}

      {/* =========================
          PRODUCT TABLE
      ========================= */}

      {!loading && items.length > 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 overflow-hidden">

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              {/* Table Header */}
              <thead className="bg-[#F5EBE0]">

                <tr>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider">
                    Product
                  </th>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider">
                    Category
                  </th>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider">
                    Price
                  </th>

                  <th className="text-right px-5 py-4 text-xs uppercase tracking-wider">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {currentProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t border-[#2F241F]/10"
                  >

                    {/* Product */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#F5EBE0]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />

                        <div>

                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="text-xs text-[#756A64]">
                            ID: {product.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-sm text-[#756A64]">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-sm font-semibold">
                      ₹{product.price}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            handleEdit(product)
                          }
                          className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#F5EBE0] text-[#8B5E3C] hover:bg-[#D9A679]/30"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =========================
              PAGINATION
          ========================= */}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-[#2F241F]/10">

              {/* Showing Text */}
              <p className="text-sm text-[#756A64]">

                Showing{" "}
                <span className="font-medium text-[#2F241F]">
                  {startIndex + 1}
                </span>
                -
                <span className="font-medium text-[#2F241F]">
                  {Math.min(
                    startIndex + productsPerPage,
                    items.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#2F241F]">
                  {items.length}
                </span>{" "}
                products

              </p>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-[#2F241F]/20 text-sm hover:bg-[#F5EBE0] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ←
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() =>
                          changePage(page)
                        }
                        className={`w-9 h-9 rounded-lg text-sm transition ${
                          currentPage === page
                            ? "bg-[#8B5E3C] text-white"
                            : "border border-[#2F241F]/20 hover:bg-[#F5EBE0]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="w-9 h-9 rounded-lg border border-[#2F241F]/20 text-sm hover:bg-[#F5EBE0] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  →
                </button>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default AdminProducts;