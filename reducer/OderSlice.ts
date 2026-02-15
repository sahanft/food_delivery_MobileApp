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
      });
  },
});

export default orderSlice.reducer;
