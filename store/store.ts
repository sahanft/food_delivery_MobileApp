import { configureStore } from "@reduxjs/toolkit";

import itemReducer from '../reducer/ItemSlice'
import cartReducer from '../reducer/OderSlice'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    orders: cartReducer,
  }
})

export default store;