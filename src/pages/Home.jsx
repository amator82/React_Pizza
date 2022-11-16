import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filter.categoryId)

    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isItemsLoading, setIsItemsLoading] = useState(true)
    // const [categoryId, setCaregoryId] = useState(0)
    const [currentPage, setCarrentPage] = useState(1)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setIsItemsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(
            `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => {
                return res.json()
            })
            .then((arr) => {
                setItems(arr)
                setIsItemsLoading(false)
            })
            .catch((err) => {
                console.log('Ошибка при получении данных' + err)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

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
                <Sort
                    value={sortType}
                    onClickSortType={(id) => setSortType(id)}
                />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isItemsLoading ? sceletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCarrentPage(number)} />
        </>
    )
}

export default Home
