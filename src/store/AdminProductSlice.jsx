import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3000/products";

// Fetch products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async () => {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  }
);

// Add product
export const addAdminProduct = createAsyncThunk(
  "adminProducts/addProduct",
  async (product) => {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return await response.json();
  }
);

// Update product
export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async (product) => {
    const response = await fetch(`${API}/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  }
);

// Delete product
export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return id;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default adminProductSlice.reducer;