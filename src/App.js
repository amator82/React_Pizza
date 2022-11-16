import React, { useState, useEffect, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

import { decrement, increment } from './redux/slices/counterSlice'

import './scss/app.scss'

export const SearchContext = createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('')
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className='wrapper'>
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className='content'>
                    <div className='container'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App
