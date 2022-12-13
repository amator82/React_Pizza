import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filterSlice'
import pizzasSlice from './slices/pizzasSlice'
import cartSlice from './slices/cart/slice'

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
