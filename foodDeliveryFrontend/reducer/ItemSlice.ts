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
      });
  },
});

export default itemSlice.reducer;
