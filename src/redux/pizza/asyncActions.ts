import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItem, SearchPizzaParams } from './types'

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
