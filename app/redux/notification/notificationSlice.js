import { createSlice } from '@reduxjs/toolkit';
import { getNoticationById } from './notificationThunks';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification', 
  initialState,   
  reducers: {
    addNotification: (state, action)=>{
      state.data = [action.payload, ...state.data];
    }
  },
  extraReducers: builder =>{
    builder.addCase(getNoticationById.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getNoticationById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = ""
    });
    builder.addCase(getNoticationById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer;
