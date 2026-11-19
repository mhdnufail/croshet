import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { checkEmailExists, registerUser } from "../services/authService";
import Container from "../components/Container";

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Check duplicate email
      const emailExists = await checkEmailExists(trimmedEmail);
      if (emailExists) {
        setError("An account with this email already exists. Please sign in.");
        setLoading(false);
        return;
      }

      // Create new customer account
      const newUser = await registerUser({
        name: trimmedName,
        email: trimmedEmail,
        password: password,
      });

      // Automatically log user in
      login(newUser);

      // Redirect
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to create account. Please ensure the server is running and try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-[75vh] py-16 md:py-24">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Join Our Community
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
              Create Account
            </h1>

            <p className="text-muted mt-4 text-sm">
              Sign up to save favorite pieces, order handcrafted items, and track deliveries.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-text/10 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammed"
                required
                className="
                  w-full
                  border
                  border-text/20
                  rounded-lg
                  px-4
                  py-3
                  text-text
                  text-sm
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  transition
                "
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="
                  w-full
                  border
                  border-text/20
                  rounded-lg
                  px-4
                  py-3
                  text-text
                  text-sm
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  transition
                "
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2"
              >
                Password (min. 6 characters)
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="
                    w-full
                    border
                    border-text/20
                    rounded-lg
                    px-4
                    py-3
                    pr-11
                    text-text
                    text-sm
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="
                    w-full
                    border
                    border-text/20
                    rounded-lg
                    px-4
                    py-3
                    pr-11
                    text-text
                    text-sm
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition p-1"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-7
                py-3.5
                rounded-lg
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                bg-primary
                text-white
                hover:bg-primary-dark
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted mt-6">
              Already have an account?{" "}
              <Link
                to={
                  redirect && redirect !== "/"
                    ? `/login?redirect=${encodeURIComponent(redirect)}`
                    : "/login"
                }
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Register;
