import React, { useState } from 'react'

const Categories = () => {
    const [activeCategory, setActiveCaregory] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    function onClickActiveCategory(index) {
        setActiveCaregory(index)
    }

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li
                            onClick={() => onClickActiveCategory(index)}
                            className={activeCategory === index ? 'active' : ''}
                            key={index}
                        >
                            {category}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories
