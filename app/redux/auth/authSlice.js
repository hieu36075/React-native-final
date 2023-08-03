import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunks";

const initialState ={
    isLogin: false, // Đặt giá trị ban đầu là false
    loading: false,
    error: '',
    token: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            // localStorage.removeItem('token')
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
    },
    extraReducers: builder=>{
        builder.addCase(login.pending,(state,action)=>{
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.isLogin= true
            state.loading=false
            console.log(action.payload)
            state.token = action.payload
            state.error = ''
        })
        builder.addCase(login.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        // builder.addCase(loginByGoogle.pending,(state,action)=>{
        //     state.isLogin=true
        //     state.loading=true
        // })
        // builder.addCase(loginByGoogle.fulfilled,(state,action)=>{
        //     state.isLogin= true
        //     state.loading=false
        //     state.token = action.payload
        // })
        // builder.addCase(loginByGoogle.rejected, (state,action)=>{
        //     state.loading= false
        //     state.error = action.payload
        // })
    }
});


export default authSlice.reducer