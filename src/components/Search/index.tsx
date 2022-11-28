import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

import cross from '../../assets/img/cross.svg'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickCross = () => {
        dispatch(setSearchValue(''))
        setValue('')

        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 350),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
