import React, { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'

const Home = () => {
    const [items, setItems] = useState([])
    const [isItemsLoading, setIsItemsLoading] = useState(true)
    const [categoryId, setCaregoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    useEffect(() => {
        setIsItemsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(
            `https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items?${category}&sortBy=${sortBy}&order=${order}`
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
    }, [categoryId, sortType])

    return (
        <>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => setCaregoryId(id)}
                />
                <Sort
                    value={sortType}
                    onClickSortType={(id) => setSortType(id)}
                />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isItemsLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </>
    )
}

export default Home
