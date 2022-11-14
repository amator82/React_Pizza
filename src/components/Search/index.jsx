import React, { useContext } from 'react'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext)

    return (
        <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type='text'
            placeholder='Поиск пиццы...'
            className={styles.root}
        />
    )
}

export default Search
