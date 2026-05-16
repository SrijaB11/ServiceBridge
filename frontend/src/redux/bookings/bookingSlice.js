import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/admin/bookings";

// GET bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const res = await fetch(API);
    return res.json();
  },
);

// UPDATE booking status
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async ({ id, status }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    return res.json();
  },
);

// DELETE booking
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.list = state.list.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
