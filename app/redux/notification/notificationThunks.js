import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../service/axios-interceptor"

export const getNoticationById = createAsyncThunk('notification/getNoticationById', async(_, {rejectWithValue})=>{
    try {
        const reponse = await http.get(`/notifications`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})