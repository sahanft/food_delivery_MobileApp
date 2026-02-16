import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../model/Item";

const initialState: Item[] = [];

const api = axios.create({
  baseURL: "http://192.168.1.101:3000",  
});

export const fetchItems = createAsyncThunk("item/getAllItem", async () => {
  try {
    const response = await api.get("/api/item/getAllItem");
    // console.log("Response Data: ", response.data);  
    return response.data;  // Return the items to Redux store
  } catch (error) {
    console.error("Cannot fetchItems: ", error);
    throw error;  // Throw the error so it can be handled by .rejected case
  }
});

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ id, itemData }: { id: string; itemData: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/item/updateItem/${id}`, itemData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update item");
    }
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/item/deleteItem/${id}`);
      return id; // Return id to remove from state
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete item");
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        // console.log("Fetched Items: ", action.payload);  // Verify the data received
        return action.payload;  // Store fetched items in state
      })
      .addCase(fetchItems.rejected, (state, action) => {
        console.error("Failed to Get Items: ", action.error.message);  // Error message on failure
      })
      .addCase(fetchItems.pending, () => {
        console.log("Fetching Items...");  // Log during fetch
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.findIndex((item: any) => (item.id || item._id) === action.payload._id || action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        return state.filter((item: any) => (item.id || item._id) !== action.payload);
      });
  },
});

export default itemSlice.reducer;
