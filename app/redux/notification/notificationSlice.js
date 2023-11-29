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


export default notificationSlice.reducer;
