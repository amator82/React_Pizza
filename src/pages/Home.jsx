import React, { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'

const Home = () => {
    const [items, setItems] = useState([])
    const [isItemsLoading, setIsItemsLoading] = useState(true)

    useEffect(() => {
        setIsItemsLoading(true)
        fetch('https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items')
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
    }, [])

    return (
        <>
            <div className='content__top'>
                <Categories />
                <Sort />
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
