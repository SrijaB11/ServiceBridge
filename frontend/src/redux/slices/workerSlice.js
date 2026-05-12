// src/redux/slices/workerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWorkers = createAsyncThunk(
    'workers/fetchWorkers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/admin/customers');
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const workerSlice = createSlice({
    name: 'workers',
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
                
                const payload = action.payload;

                if (Array.isArray(payload)) {
                    state.workers = payload;
                } 
                else if (payload?.data && Array.isArray(payload.data)) {
                    state.workers = payload.data;
                } 
                else if (payload?.workers && Array.isArray(payload.workers)) {
                    state.workers = payload.workers;
                }
                else if (payload && typeof payload === 'object') {
                    // If it's a single object, try to see if it's wrapped
                    state.workers = [payload];
                } 
                else {
                    state.workers = [];
                }
            })
            .addCase(fetchWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default workerSlice.reducer;