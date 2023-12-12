import { createSlice } from "@reduxjs/toolkit";
import { createCategoryRoom, filterCategoryRoomByHotel, getCategoryRoom, getCategoryRoomByHotel, getCategoryRoomById } from "./categoryRoomThunks";



const initialState ={
    loading: false,
    error: {},
    data: [],
    detail:[]
}

const categoryRoomSlice = createSlice({
    name: "categoryRoom",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoryRoom.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createCategoryRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(createCategoryRoom.fulfilled, (state, action) => {
                state.loading = false
                state.detail = action.payload
                state.error = ""
            })
            .addCase(createCategoryRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //
            .addCase(getCategoryRoomByHotel.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoryRoomByHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoomByHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(filterCategoryRoomByHotel.pending, (state) => {
                state.loading = true
            })
            .addCase(filterCategoryRoomByHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })
            .addCase(filterCategoryRoomByHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getCategoryRoomById.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoryRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.detail = action.payload
                state.error = ""
            })
            .addCase(getCategoryRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export default categoryRoomSlice.reducer