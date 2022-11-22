import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const { sortBy, order, category, search, currentPage } = params

        const { data } = await axios.get(
            `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )

        return data
    }
)

const initialState = {
    items: [],
    status: 'loading' //? loading | succcess | error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading'
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = 'succcess'
            state.items = action.payload
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'error'
            state.items = []
        })
    }
})

export const pizzasDataSelector = (state) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
