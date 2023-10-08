import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { searchMovie } from '../../features/currentGenreOrCategory'

const Search = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const {searchQuery } = useSelector((state) => state.currentGenreOrCategory)
    const classes = useStyles()
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchMovie(query))
            setQuery('')
        }
    }
    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyDown={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant='standard'
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}

            />
        </div>
    )
}

export default Search