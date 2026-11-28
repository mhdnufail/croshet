import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/mainLayout";
import AdminLayout from "./layouts/adminLayout";

// Protection components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Customer Pages
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetails from "./pages/productDeatils";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Wishlist from "./pages/whishlist";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccess";
import Orders from "./pages/orders";
import OrderDetails from "./pages/orderDetails";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <Routes>
      {/* =========================
          CUSTOMER ROUTES (MainLayout)
      ========================= */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        {/* Typo alias for wishlist */}
        <Route
          path="/whishlist"
          element={<Navigate to="/wishlist" replace />}
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 Route inside MainLayout */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* =========================
          ADMIN LOGIN (Standalone)
      ========================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* =========================
          ADMIN PROTECTED ROUTES (AdminLayout)
      ========================= */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
