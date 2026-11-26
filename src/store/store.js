import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import adminProductReducer from "./AdminProductSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,

    adminProducts: adminProductReducer
  },
});

// Automatically persist cart and wishlist to localStorage on every state change
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("crochet_cart", JSON.stringify(state.cart.items));
    localStorage.setItem(
      "crochet_wishlist",
      JSON.stringify(state.wishlist.items)
    );
  } catch (error) {
    console.error("Failed to persist state to localStorage", error);
  }
});

export default store;
