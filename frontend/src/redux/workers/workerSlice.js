import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/admin/workers";

// GET all workers
export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async () => {
    const res = await fetch(API);
    return res.json();
  },
);

// VERIFY worker
export const verifyWorker = createAsyncThunk(
  "workers/verifyWorker",
  async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified: true }),
    });
    return res.json();
  },
);

// REJECT worker
export const rejectWorker = createAsyncThunk(
  "workers/rejectWorker",
  async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const workerSlice = createSlice({
  name: "workers",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(verifyWorker.fulfilled, (state, action) => {
        const index = state.list.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(rejectWorker.fulfilled, (state, action) => {
        state.list = state.list.filter((w) => w.id !== action.payload);
      });
  },
});

export default workerSlice.reducer;
