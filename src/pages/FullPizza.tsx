import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://636cf37291576e19e31a7e18.mockapi.io/react_pizza/items/' +
                        id
                )

                setPizza(data)
            } catch (error) {
                console.log('Ошибка при получении отдельной пиццы', error)
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='' />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
            <Link to={'/'}>
                <button className='button button--outline button--add'>
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    )
}

export default FullPizza
