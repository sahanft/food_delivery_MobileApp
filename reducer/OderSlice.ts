import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

// Async thunk to add an order
export const AddOrder = createAsyncThunk(
  "order/AddOrder",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://192.168.1.101:3000/api/order/AddOrder", orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://192.168.1.101:3000/api/order/getAllOrders");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderData }: { id: string; orderData: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://192.168.1.101:3000/api/order/updateOrder/${id}`, orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update order");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://192.168.1.101:3000/api/order/deleteOrder/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Correctly updating array
      })
      .addCase(AddOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => (order.id || order._id) === (action.payload.id || action.payload._id));
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => (order.id || order._id) !== action.payload);
      });
  },
});

export default orderSlice.reducer;
