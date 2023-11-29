import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import hotelSlice from './hotel/hotelSlice'
import categoryRoomSlice from './categoryRoom/categoryRoomSlice';
import orderSlice from './order/orderSlice';
import paymentSlice from './payment/paymentSlice';
import roomMessageSlice from './roomMessage/roomMessageSlice';
import notificationSlice from './notification/notificationSlice';
import userSlice from './user/userSlice';
import profileSlice from './profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel: hotelSlice,
    categoryRoom: categoryRoomSlice,
    order: orderSlice,
    payment: paymentSlice,
    roomMessage: roomMessageSlice,
    notification: notificationSlice,
    user: userSlice,
    profile: profileSlice
  },
});

export default store;