import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/admin";

// 👉 Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const [customers, workers, bookings, complaints] = await Promise.all([
        fetch(`${API}/customers`).then((res) => res.json()),
        fetch(`${API}/workers`).then((res) => res.json()),
        fetch(`${API}/bookings`).then((res) => res.json()),
        fetch(`${API}/complaints`).then((res) => res.json()),
        fetch(`${API}/payments`).then((res) => res.json()),
      ]);

      return {
        customers: customers.length,
        workers: workers.length,
        bookings: bookings.length,
        complaints: complaints.length,
        raw: { customers, workers, bookings, complaints, payments },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      customers: 0,
      workers: 0,
      bookings: 0,
      complaints: 0,
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
