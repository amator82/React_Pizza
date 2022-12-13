export type PizzaItem = {
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

export interface PizzaSliceState {
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
