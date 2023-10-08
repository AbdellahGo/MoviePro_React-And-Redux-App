import { Grid } from '@mui/material'
import React from 'react'
import useStyles from './styles'

import {Movie} from '..'


const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles
  const startFrom = excludeFirst ? 1 : 0
  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i}/>
      )).slice(startFrom, numberOfMovies)}
    </Grid>
  )
}

export default MovieList