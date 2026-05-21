import { configureStore } from '@reduxjs/toolkit';
import workerReducer from './slices/workerSlice';
import customerReducer from './slices/customerSlice';   // ← New Import

const store = configureStore({
    reducer: {
        workers: workerReducer,
        customers: customerReducer,     // ← Added
    },
});

export default store;