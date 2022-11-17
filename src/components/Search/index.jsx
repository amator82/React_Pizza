import React, { useContext, useRef } from 'react'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

import cross from '../../assets/img/cross.svg'

const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext)
    const inputRef = useRef()

    const onClickCross = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    return (
        <div className={styles.wrapper}>
            <input
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type='text'
                placeholder='Поиск пиццы...'
                className={styles.root}
            />
            {searchValue && (
                <img
                    className={styles.cross}
                    src={cross}
                    alt='cross'
                    onClick={onClickCross}
                />
            )}
        </div>
    )
}

export default Search
