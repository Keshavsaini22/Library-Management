import { createSlice } from "@reduxjs/toolkit";
import { createBook, deleteBook, getBooks, getHomeBooks } from "./Book.action";
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
    isLoading: false,
    error: null,
    book: null,
    allbooks: null,
    homebooks: null,
}

export const BookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createBook.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload;
                //console.log('action.payload: ', action.payload);
                state.allbooks = [action.payload, ...state.allbooks]

            })
            .addCase(createBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
        builder.addCase(getBooks.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allbooks = action.payload;

            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
                console.log('action.payload: ', action.payload);
            })

        builder.addCase(getHomeBooks.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getHomeBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.homebooks = action.payload;
            })
            .addCase(getHomeBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

        builder.addCase(deleteBook.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload;
                const allbook = state.allbooks.filter((item) => item._id != action.payload._id)
                state.allbooks = allbook
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
                console.log('action.payload: ', action.payload);
            })

    }
})

export default BookSlice.reducer