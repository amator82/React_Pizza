import React, { useCallback, useEffect, useRef } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { filterSelector } from '../redux/slices/filter/selectors'
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice'
import {
    fetchPizzas,
    pizzasDataSelector,
    SearchPizzaParams
} from '../redux/slices/pizzasSlice'

import Categories from '../components/Categories'
import SortPopup from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { items, status } = useSelector(pizzasDataSelector)
    const { categoryId, sort, currentPage, searchValue } =
        useSelector(filterSelector)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangeCurrentPage = (page: number) => {
        dispatch(setCurrentPage(page))
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
                currentPage: String(currentPage)
            })
        )

        window.scrollTo(0, 0)
    }

    //! Если изменили параметры и был первый рендер
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }

    //     isMounted.current = true
    // }, [categoryId, sort.sortProperty, currentPage])

    //! Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(
    //             window.location.search.substring(1)
    //         ) as unknown as SearchPizzaParams

    //         const sort = sortList.find(
    //             (obj) => obj.sortProperty === params.sortBy
    //         )

    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || sortList[0]
    //             })
    //         )
    //     }

    //     isMounted.current = true
    // }, [])

    //! Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        getPizzas()

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const sceletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <SortPopup value={sort} />
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
