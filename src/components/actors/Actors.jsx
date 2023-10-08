import React, { useState } from 'react'
import useStyles from './styles'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB'
import {MovieList, Pagination} from '..'


const Actors = () => {
  const [page, setPage] = useState(1)
  const { id } = useParams()
  const classes = useStyles()
  const [] = useState()
  const { data, isFetching, error } = useGetActorDetailsQuery(id)
  const navigate = useNavigate()
  const {data: movies} = useGetMoviesByActorIdQuery({id, page})

  console.log(movies);
  if (isFetching) return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size='4rem' />
    </Box>
  )

  if (error) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color='primary'>Go back</Button>
    </Box>
  )


  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} className={classes.image} alt="data.name" />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant='h2' gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='center' paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
          <Button variant='contained' color='primary' target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
          <Button  startIcon={<ArrowBack />} onClick={() => navigate(-1)} color='primary'>Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
      </Box>
    </>
  )
}

export default Actors