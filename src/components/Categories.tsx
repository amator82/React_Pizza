import React from 'react'

type CategoriesProps = {
    value: number
    onClickCategory: any
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li
                            onClick={() => onClickCategory(index)}
                            className={value === index ? 'active' : ''}
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
