import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import hotelSlice from './hotel/hotelSlice'
 // Đường dẫn đến reducer của bạn

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel: hotelSlice
  },
});

export default store;