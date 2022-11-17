import React, { useCallback, useContext, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

import cross from '../../assets/img/cross.svg'

const Search = () => {
    const [value, setValue] = useState('')
    const { setSearchValue } = useContext(SearchContext)
    const inputRef = useRef()

    const onClickCross = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 350),
        []
    )

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                type='text'
                placeholder='Поиск пиццы...'
                className={styles.root}
            />
            {value && (
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
