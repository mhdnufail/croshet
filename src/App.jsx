import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
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
        {/* Spelling fallback for wishlist */}
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

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
