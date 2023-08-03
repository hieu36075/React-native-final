import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../service/axios-interceptor"
import axios from "axios"

export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue})=>{
    try {
        // console.log(data)
        const reponse = await axios.post('http://192.168.31.246:3500/auth/login', data)
        console.log(reponse.data.accessToken)

        return reponse.data.accessToken
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue("Network Error");
        }
    }
})