import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartSlice'
import tokenReducer from '../features/authTokenSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        token:tokenReducer
    }
})