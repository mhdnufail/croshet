import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import Container from "../components/Container";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(email, password);

      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      login(user);
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError("Unable to login. Please ensure the server is running and try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-[75vh] py-16 md:py-24">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              Welcome Back
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
              Sign In
            </h1>

            <p className="text-muted mt-4 text-sm">
              Sign in to manage your orders, wishlist, and cart.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-text/10 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
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

            {/* Password Field */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold tracking-[0.15em] uppercase text-text mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-muted mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to={
                  redirect && redirect !== "/"
                    ? `/register?redirect=${encodeURIComponent(redirect)}`
                    : "/register"
                }
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Login;
