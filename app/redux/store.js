import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import hotelSlice from './hotel/hotelSlice'
import categoryRoomSlice from './categoryRoom/categoryRoomSlice';
import orderSlice from './order/orderSlice';
import paymentSlice from './payment/paymentSlice';
import roomMessageSlice from './roomMessage/roomMessageSlice';
 // Đường dẫn đến reducer của bạn

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel: hotelSlice,
    categoryRoom: categoryRoomSlice,
    order: orderSlice,
    payment: paymentSlice,
    roomMessage: roomMessageSlice,
  },
});

export default store;