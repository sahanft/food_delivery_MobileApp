// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     updateCart: (state, action) => {
//       state.items = action.payload;
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, updateCart, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;