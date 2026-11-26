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

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
    };

    if (editingProduct) {
      dispatch(
        updateAdminProduct({
          ...productData,
          id: editingProduct.id,
        })
      );
    } else {
      dispatch(addAdminProduct(productData));
    }

    resetForm();
  };

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

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      dispatch(deleteAdminProduct(id));
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-serif text-[#2F241F]">
            Products
          </h1>

          <p className="text-[#756A64] mt-2">
            Manage your store products.
          </p>
        </div>

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

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-white border border-[#2F241F]/10 rounded-xl p-6 mb-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-semibold">
              {editingProduct ? "Edit Product" : "Add Product"}
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

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                style={{
                  backgroundColor: "#8B5E3C",
                  color: "#FFFFFF",
                }}
                className="px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90"
              >
                {editingProduct ? "Update Product" : "Add Product"}
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

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-[#756A64]">
            Loading products...
          </p>
        </div>
      )}

      {/* Empty State */}
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

      {/* Product Table */}
      {!loading && items.length > 0 && (
        <div className="bg-white rounded-xl border border-[#2F241F]/10 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

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

              <tbody>

                {items.map((product) => (

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
                          onClick={() => handleEdit(product)}
                          className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#F5EBE0] text-[#8B5E3C] hover:bg-[#D9A679]/30"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
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

        </div>
      )}

    </div>
  );
}

export default AdminProducts;