import { useTheme } from '@mui/material/styles'
import {
    Box, CircularProgress, Divider, List, ListItemButton,
    ListItemIcon, ListItemText, ListSubheader
} from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useGetGenresQuery } from '../../services/TMDB'
import genresIcons from '../../assets/genres'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];


const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png'
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png'


const SideBar = ({ setMobileOpen }) => {
    const { data: demoCategories, isFetching } = useGetGenresQuery()
    const theme = useTheme()
    const classes = useStyles()
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        setMobileOpen(false)
    }, [genreIdOrCategoryName])


    return (
        <>
            <Link to='/' className={classes.imageLink}>
                <img src={theme.palette.mode === 'light' ? blueLogo : redLogo}
                    alt="Filmpire logo " className={classes.image}
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader> Categories </ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link className={classes.links} to='/' key={value}>
                        <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))} >
                            <ListItemIcon>
                                <img src={genresIcons[label.toLowerCase()]} alt="" className={classes.genreImages} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader> Genres </ListSubheader>
                {isFetching ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : demoCategories?.genres.map(({ id, name }) => (
                    <Link className={classes.links} to='/' key={id}>
                        <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))} >
                            <ListItemIcon>
                                <img src={genresIcons[name.toLowerCase()]} alt="" className={classes.genreImages} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </>
    )
}

export default SideBar




