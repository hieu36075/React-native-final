import { createSlice } from "@reduxjs/toolkit";
import { changePassword, login, register, resetPassword } from "./authThunks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState ={
    isLogin: false,
    loading: false,
    error: '',
    token: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            AsyncStorage.removeItem('token');
            state.isLogin = false
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setToken: (state, action)=>{
            state.token = action.payload
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

        builder.addCase(register.pending,(state,action)=>{
            state.loading = true;
            state.error = ''
        })
        builder.addCase(register.fulfilled, (state, action) =>{
            state.loading=false
        
            state.token = action.payload
            state.token = action.payload.access_token
            AsyncStorage.setItem('token', action.payload.access_token)
            AsyncStorage.setItem('rfToken', action.payload.refresh_token)
            state.isLogin= true
            state.error = ''
        })
        builder.addCase(register.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(resetPassword.pending,(state,action)=>{
            state.loading = true;
            state.error = ''
        })
        builder.addCase(resetPassword.fulfilled, (state, action) =>{
            state.loading=  false
            state.error = ''
        })
        builder.addCase(resetPassword.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(changePassword.pending,(state,action)=>{
            state.loading = true;
            state.error = ''
        })
        builder.addCase(changePassword.fulfilled, (state, action) =>{
            state.loading=  false
            state.error = ''
        })
        builder.addCase(changePassword.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
});

export const {setIsLogin, logout, setToken } = authSlice.actions;
export default authSlice.reducer