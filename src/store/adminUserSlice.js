import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000/users";

// Fetch users
export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Block / Unblock user
export const toggleUserStatus = createAsyncThunk(
  "adminUsers/toggleUserStatus",
  async (user, { rejectWithValue }) => {
    try {
      const isCurrentlyBlocked =
        user.blocked === true || user.status === "Blocked";
      const nextBlocked = !isCurrentlyBlocked;
      const nextStatus = nextBlocked ? "Blocked" : "Active";

      const updatedUser = {
        ...user,
        blocked: nextBlocked,
        status: nextStatus,
      };

      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Toggle user status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (user) => String(user.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default adminUserSlice.reducer;
