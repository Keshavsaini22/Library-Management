import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { createBookType, deleteBookType, getBookType, getHomeBookType, updateBookType } from "./Book.type";

export const createBook = createAsyncThunk(createBookType, async (data, { rejectWithValue, getState }) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await axios.post(`http://localhost:8080/book`, data, config)
        return res.data
    }
    catch (error) {
        console.log('error: ', error.response.data);
        return rejectWithValue(error.response.data.message)
    }
})

export const getBooks = createAsyncThunk(getBookType, async ({ search }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        var url = `http://localhost:8080/book?`
        if (search) {
            url = url + `&search=${search}`
            console.log('url: ', url);
        }
        const res = await axios.get(url, config)
        console.log('res.data: ', res.data);
        return res.data;
    }
    catch (error) {
        //console.log('error: ', error.response.data);
        return rejectWithValue(error.response.data)
    }
})

export const getHomeBooks = createAsyncThunk(getHomeBookType, async ({ search }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        var url = `http://localhost:8080/book/home?`

        if (search) {
            url = url + `&search=${search}`
            console.log('url: ', url);
        }
        const res = await axios.get(url, config)
        // console.log('res.data: ', res.data);
        return res.data;
    }
    catch (error) {
        console.log('error: ', error.response.data);
        return rejectWithValue(error.response.data)
    }
})
export const updateBook = createAsyncThunk(updateBookType, async ({ data, id }, { rejectWithValue, getState }) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        console.log('data: ', data);
        const res = await axios.put(`http://localhost:8080/book?bookId=${id}`, data, config)
        return res.data
    }
    catch (error) {
        console.log('error: ', error.response.data);
        return rejectWithValue(error.response.data.message)
    }
})

export const deleteBook = createAsyncThunk(deleteBookType, async (id, { rejectWithValue, getState }) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await axios.delete(`http://localhost:8080/book?bookId=${id}`, config)
        return res.data
    }
    catch (error) {
        console.log('error: ', error.response.data);
        return rejectWithValue(error.response.data.message)
    }
})