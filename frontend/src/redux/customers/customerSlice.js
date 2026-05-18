import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/admin/customers";

// GET all customers
export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const res = await fetch(API);
  return res.json();
});

// UPDATE customer
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
);

// DELETE customer
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
