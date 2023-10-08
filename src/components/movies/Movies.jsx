import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useGetMoviesQuery } from '../../services/TMDB'
import { useSelector } from 'react-redux'
import { MovieList, Pagination } from '..'
import {FeaturedMovie} from '..'



const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })

  if (isFetching) return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size='4rem' />
    </Box>
  )
  if (!data.results.length) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: '20px' }}>
      <Typography variant='h4'>
        No movies that match that name.
        <br />
        Please search for something else.
      </Typography>
    </Box>
  )
  if (error) return 'An error has occurred.'

  return (
    <div>
      <FeaturedMovie movie={data?.results[0]}/>
      <MovieList movies={data} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages}/>
    </div>
  )
}

export default Movies