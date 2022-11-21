import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useCallback
} from 'react'
import axios from 'axios'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    setCategoryId,
    setCurrentPage,
    setFilters
} from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    )

    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isItemsLoading, setIsItemsLoading] = useState(true)

    const onChangeCategory = useCallback((idx) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangeCurrentPage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => {
        setIsItemsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        try {
            const res = await axios.get(
                `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            setItems(res.data)

            window.scrollTo(0, 0)
        } catch (error) {
            console.log('Произошла ошибка при получении данных', error)
        } finally {
            setIsItemsLoading(false)
        }
    }

    //! Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    //! Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(
                (obj) => obj.sortProperty === params.sortProperty
            )

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
        }
        isSearch.current = true
    }, [])

    //! Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        fetchPizzas()
        if (!isSearch.current) {
        }

        isSearch.current = false
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
