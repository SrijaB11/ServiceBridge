import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = "http://localhost:5000/admin/customers";

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const res = await fetch(API_BASE, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return data.data || data;
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) return rejectWithValue(result.message);
    return result.data || result;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, ...data }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) return rejectWithValue(result.message);
    return { id, ...data };   // Return normalized data
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message);
    }
    return id;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState: { customers: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => { state.loading = true; })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.unshift(action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.customers[index] = action.payload;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(c => c.id !== action.payload);
            });
    }
});

export default customerSlice.reducer;