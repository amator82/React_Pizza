import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock/index'
import Skeleton from './components/PizzaBlock/Skeleton'

import './scss/app.scss'

function App() {
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
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <div className='container'>
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
                            : items.map((obj) => (
                                <PizzaBlock key={obj.id} {...obj} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
