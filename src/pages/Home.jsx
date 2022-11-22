import React, {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    filterSelector,
    setCategoryId,
    setCurrentPage,
    setFilters
} from '../redux/slices/filterSlice'
import { fetchPizzas, pizzasDataSelector } from '../redux/slices/pizzasSlice'

import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { items, status } = useSelector(pizzasDataSelector)
    const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector)

    const onChangeCategory = useCallback((idx) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangeCurrentPage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            })
        )

        window.scrollTo(0, 0)
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
        getPizzas()
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
            {status === 'error' ? (
                <>
                    <h2>Произошла какая-то ошибка при загрузке </h2>
                    <p>Мы уже работаем над решением проблемы</p>
                </>
            ) : (
                <>
                    <div className='content__items'>
                        {status === 'loading' ? sceletons : pizzas}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        onChangePage={onChangeCurrentPage}
                    />
                </>
            )}
        </>
    )
}

export default Home
