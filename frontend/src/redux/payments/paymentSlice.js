import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/admin/payments";

// GET payments
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    const res = await fetch(API);
    return res.json();
  },
);

// UPDATE payment status (paid / pending)
export const updatePaymentStatus = createAsyncThunk(
  "payments/updateStatus",
  async ({ id, status }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    return res.json();
  },
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(updatePaymentStatus.fulfilled, (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });
  },
});

export default paymentSlice.reducer;
