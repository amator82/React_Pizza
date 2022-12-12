import React, { memo } from 'react'
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
    value: number
    onClickCategory: (index: number) => void
}

const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
]

const Categories: React.FC<CategoriesProps> = memo(
    ({ value, onClickCategory }) => {
        useWhyDidYouUpdate('Categories', { value, onClickCategory })

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
)

export default Categories
