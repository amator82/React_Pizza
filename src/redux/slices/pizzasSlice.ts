import { RootState } from './../store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type PizzaItem = {
    id: number
    title: string
    price: number
    imageUrl: string
    types: number[]
    sizes: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[]
    status: Status
}

export type SearchPizzaParams = {
    sortBy: string
    order: string
    category: string
    search: string
    currentPage: string
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params

        const { data } = await axios.get<PizzaItem[]>(
            `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )

        return data
    }
)

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING //? loading | succcess | error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const pizzasDataSelector = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
