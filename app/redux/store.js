import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
 // Đường dẫn đến reducer của bạn

const store = configureStore({
  reducer: {
    auth: authSlice
  },
});

export default store;