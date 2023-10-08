import alanBtn from '@alan-ai/alan-sdk-web';
import { useContext, useEffect } from 'react';
import { ColorModeContext } from '../utils/ToggleColorMode';


import { fetchToken } from "../utils"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';

const useAlan = () => {
    const { setMode } = useContext(ColorModeContext)
    const navigate = useNavigate ()
    const dispatch = useDispatch()

    useEffect(() => {
        alanBtn({
            key: 'd77f7c28ad221ae21cbf254c789067052e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode, genres, genre, query}) => {
                if (command === 'chooseGenre') {
                    const FoundGenres = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase())
                    if (FoundGenres) {
                        navigate('/')
                        dispatch(selectGenreOrCategory(FoundGenres.id))
                    }
                } else if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light')
                    } else {
                        setMode('dark')
                    }
                } else if (command === 'login') {
                    fetchToken()
                } else if (command === 'logout') {
                    localStorage.clear()
                    window.location.href = '/'
                } else if (command === 'search') {
                    dispatch(searchMovie(query))
                }
            }
        });
    }, []);

}

export default useAlan