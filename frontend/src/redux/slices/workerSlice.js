import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/admin/workers';

export const fetchWorkers = createAsyncThunk(
    'workers/fetchWorkers',
    async (_, { rejectWithValue }) => {
        try {
            console.log('🚀 Fetching from:', API_URL);   // Debug log
            const response = await axios.get(API_URL);
            
            console.log('✅ API Response:', response.data); // See what API actually returns
            return response.data;
        } catch (error) {
            console.error('❌ API Error:', error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Failed to fetch workers'
            );
        }
    }
);

const workerSlice = createSlice({
    name: 'workers',
    initialState: {
        workers: [],
        currentWorker: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentWorker: (state, action) => {
            state.currentWorker = action.payload;
        },
        clearWorkerState: (state) => {
            state.workers = [];
            state.currentWorker = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkers.fulfilled, (state, action) => {
                state.loading = false;
                console.log('📦 Data saved to Redux:', action.payload);
                
                state.workers = Array.isArray(action.payload) ? action.payload : [action.payload];
                state.currentWorker = state.workers[0] || null;
            })
            .addCase(fetchWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('🚨 Redux Error State:', action.payload);
            });
    },
});

export const { setCurrentWorker, clearWorkerState } = workerSlice.actions;
export default workerSlice.reducer;