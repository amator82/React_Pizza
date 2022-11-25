import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            )

            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const cartSelector = (state) => state.cart
export const cartItemByIdSelector = (id) => (state) =>
    state.cart.items.find((obj) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
