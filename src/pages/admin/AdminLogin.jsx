import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/admins");

    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    const admins = await response.json();

    console.log("Admins from database:", admins);
    console.log("Entered email:", email.trim());
    console.log("Entered password:", password.trim());

    const admin = admins.find(
      (item) =>
        item.email.trim() === email.trim() &&
        item.password.trim() === password.trim()
    );

    console.log("Matched admin:", admin);

    if (!admin) {
      setError("Invalid admin email or password.");
      return;
    }

    // Store admin session
    login(admin);

    // Navigate to admin dashboard
    navigate("/admin", { replace: true });
  } catch (error) {
    console.error("Admin login error:", error);
    setError("Unable to login. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#2F241F] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <p className="text-[#D9A679] text-xs font-semibold tracking-[0.3em] uppercase">
            Chrochet
          </p>

          <h1 className="font-serif text-4xl text-white mt-3">
            Admin Login
          </h1>

          <p className="text-white/60 mt-3 text-sm">
            Sign in to manage your store
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#FFF8F0] rounded-xl p-7 md:p-9 shadow-xl"
        >

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-[0.15em] uppercase text-[#2F241F] mb-2"
            >
              Admin Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                border
                border-[#2F241F]/20
                rounded-lg
                px-4
                py-3
                bg-white
                text-[#2F241F]
                outline-none
                focus:border-[#8B5E3C]
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-[0.15em] uppercase text-[#2F241F] mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="
                w-full
                border
                border-[#2F241F]/20
                rounded-lg
                px-4
                py-3
                bg-white
                text-[#2F241F]
                outline-none
                focus:border-[#8B5E3C]
                transition
              "
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#8B5E3C",
              color: "#FFFFFF",
            }}
            className="
              w-full
              mt-7
              py-3.5
              rounded-lg
              text-xs
              font-semibold
              tracking-[0.2em]
              uppercase
              hover:opacity-90
              disabled:opacity-60
              transition
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="text-center text-white/40 text-xs mt-6">
          Chrochet Admin Panel
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;