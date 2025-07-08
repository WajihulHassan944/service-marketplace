import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import gigsReducer from "./features/gigsSlice";
import categoryReducer from "./features/categorySlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    gigs: gigsReducer,
    categories: categoryReducer,
  },
});
