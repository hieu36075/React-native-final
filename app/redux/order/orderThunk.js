import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../service/axios-interceptor";


export const getOrderById = createAsyncThunk('order/getOrderById', async(id, {rejectWithValue}) =>{
    try{
       
        const reponse = await http.get(`/order/${id}`);
        return reponse
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getOrderByUserId = createAsyncThunk('order/getOrderByUserId', async(data, {rejectWithValue}) =>{
    try{
        const {page, perPage} = data
        const reponse = await http.get(`/order/getByUserId?page=${page}&perPage=${perPage}`);
        return reponse.data
    }catch(error){
        return rejectWithValue(error)
    }
})


export const createOrder = createAsyncThunk('order/createOrder', async(order, {rejectWithValue})=>{
    try {
        const reponse = await http.post(`/order`, order)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateOrder = createAsyncThunk('order/updateOrder', async(order, {rejectWithValue})=>{
   const {id} = order
    try {
        const reponse = await http.patch(`/order?id=${id}`, order)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const confirmOrder = createAsyncThunk('order/confirmOrder', async(id, {rejectWithValue})=>{
    try {
        const reponse = await http.patch(`/order/confirm-order/${id}`)
        return reponse
    } catch (error) {
        return rejectWithValue(error)
    }
})
