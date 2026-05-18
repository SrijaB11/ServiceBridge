import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/complaint/admin";

// GET complaints
export const fetchComplaints = createAsyncThunk(
  "complaints/fetch",
  async () => {
    const res = await fetch(API);
    return res.json();
  },
);

// UPDATE status
export const updateComplaintStatus = createAsyncThunk(
  "complaints/updateStatus",
  async ({ id, status }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
);

// DELETE complaint
export const deleteComplaint = createAsyncThunk(
  "complaints/delete",
  async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        const i = state.list.findIndex((c) => c.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default complaintSlice.reducer;
