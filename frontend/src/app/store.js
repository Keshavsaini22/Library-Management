import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../features/Auth/Auth.slice'
import BookSlice from '../features/Book/Book.slice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        book:BookSlice,
    }
})
