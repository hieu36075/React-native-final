import { createSlice } from "@reduxjs/toolkit";
import { confirmOrder, createOrder,  getOrderById, getOrderByUserId, updateOrder } from "./orderThunk";
const initialState ={
    loading: false,
    error: {},
    data: [],
    details:[],
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateOrder.pending, (state, action) => {
                state.loading = true
                state.data = action.payload
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //
            .addCase(getOrderByUserId.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderByUserId.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getOrderByUserId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

             //
            .addCase(getOrderById.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false
                state.details = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(confirmOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(confirmOrder.fulfilled, (state, action) => {
                state.loading = false
                state.totalRevenuse = action.payload
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            
    }
});

export default orderSlice.reducer