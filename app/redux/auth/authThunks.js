import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../service/axios-interceptor"
import { ToastAndroid } from "react-native"

export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('/auth/login', data)
        return reponse
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue("Network Error");
        }
    }
})

export const register = createAsyncThunk('auth/register', async(data, {rejectWithValue})=>{
    try {
        const {confirmPassword, ...register} = data
        const reponse = await http.post('auth/register', register)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.patch('auth/reset-password', data)
        return reponse.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const changePassword = createAsyncThunk('auth/changePassword', async(data, {rejectWithValue})=>{
    try {
        const reponse = await http.post('auth/change-pass', data)
        return reponse
    } catch (error) {
        ToastAndroid.show("Wrong password", ToastAndroid.SHORT);
        return rejectWithValue(error)
    }
})