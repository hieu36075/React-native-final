import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunks";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            console.log('a')
            AsyncStorage.removeItem('token');
            state.isLogin = false
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setToken: (state, action)=>{
            state.token = action.payload
            console.log(state.token)
        }
    },
    extraReducers: builder=>{
        builder.addCase(login.pending,(state,action)=>{
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) =>{
            state.isLogin= true
            state.loading=false
            AsyncStorage.setItem('token', action.payload.access_token)
            state.token = action.payload.access_token
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

export const {setIsLogin, logout, setToken } = authSlice.actions;
export default authSlice.reducer