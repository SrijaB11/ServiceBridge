import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fake API call (replace with your backend later)
export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async () => {
    const response = await fetch("http://localhost:8000/workers"); // adjust if needed
    return await response.json();
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
