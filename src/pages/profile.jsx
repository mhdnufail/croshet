import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Package,
  Heart,
  LogOut,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateProfile } from "../services/authService";

function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const updatedFields = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      };

      if (user?.id) {
        await updateProfile(user.id, updatedFields);
      }

      // Update local AuthContext and localStorage
      if (updateUser) {
        updateUser(updatedFields);
      }

      setSuccessMessage("Profile updated successfully!");
      showToast("Profile details updated successfully");
      setSaving(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3500);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast("Signed out successfully", "info");
    navigate("/");
  };

  return (
    <section className="bg-background py-16 md:py-24 min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Account Management
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-text mt-2">
            My Profile
          </h1>

          <p className="text-muted mt-2 text-sm">
            Manage your personal details, default shipping address, and order history.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quick Profile Card & Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Identity Card */}
            <div className="bg-white border border-text/10 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary text-2xl font-serif font-bold border border-primary/20">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="font-serif text-xl font-bold text-text">
                {user?.name || "Customer"}
              </h2>

              <p className="text-xs text-muted mt-1 break-all flex items-center justify-center gap-1">
                <Mail size={12} />
                <span>{user?.email}</span>
              </p>

              <div className="mt-4 pt-4 border-t border-text/10">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-primary bg-secondary/80 px-3 py-1 rounded-full">
                  Valued Customer
                </span>
              </div>
            </div>

            {/* Quick Links Menu */}
            <div className="bg-white border border-text/10 rounded-2xl p-4 shadow-sm space-y-1">
              <Link
                to="/orders"
                className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-text hover:bg-secondary hover:text-primary transition"
              >
                <div className="flex items-center gap-3">
                  <Package size={17} className="text-primary" />
                  <span>My Orders</span>
                </div>
                <span className="text-muted text-xs">→</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-text hover:bg-secondary hover:text-primary transition"
              >
                <div className="flex items-center gap-3">
                  <Heart size={17} className="text-primary" />
                  <span>My Wishlist</span>
                </div>
                <span className="text-muted text-xs">→</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={17} />
                  <span>Sign Out</span>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT: Edit Profile Form (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-text/10 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-text mb-6 pb-3 border-b border-text/10 flex items-center gap-2">
              <User size={20} className="text-primary" />
              <span>Personal & Address Details</span>
            </h2>

            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full border border-text/10 bg-secondary/50 rounded-lg px-4 py-3 text-sm text-muted cursor-not-allowed"
                  />
                  <p className="text-[11px] text-muted mt-1">
                    Email cannot be changed directly
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>

                {/* Default Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    Default Street Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/flat, street, locality"
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>

                {/* Pincode */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className="w-full border border-text/20 rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex items-center gap-2
                    bg-primary text-white
                    px-7 py-3
                    rounded-lg
                    text-xs font-semibold
                    tracking-[0.15em] uppercase
                    hover:bg-primary-dark
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition
                    shadow-sm
                  "
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Profile;
