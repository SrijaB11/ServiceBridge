import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async () => {
    const res = await fetch("http://localhost:5000/admin/workers");

    if (!res.ok) {
      throw new Error("Failed to fetch workers");
    }

    return await res.json();
  },
);

const workerSlice = createSlice({
  name: "workers",
  initialState: {
    workers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workerSlice.reducer;
