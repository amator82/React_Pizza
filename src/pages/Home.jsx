import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
    const dispatch = useDispatch()
    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    )

    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isItemsLoading, setIsItemsLoading] = useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangeCurrentPage = (number) => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        setIsItemsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios
            .get(
                `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            .then((response) => {
                setItems(response.data)
                setIsItemsLoading(false)
            })
            .catch((err) => {
                console.log('Ошибка при получении данных' + err)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const sceletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isItemsLoading ? sceletons : pizzas}
            </div>
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangeCurrentPage}
            />
        </>
    )
}

export default Home
