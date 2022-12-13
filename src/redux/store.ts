import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './filter/slice'
import pizzasSlice from './pizza/slice'
import cartSlice from './cart/slice'

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
