import { Button, Typography } from '@mui/material'
import React from 'react'

import useStyles from './styles'
const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles()
  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1)
  }
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (totalPages === 0) return null
  return (
    <div className={classes.container}>
      <Button disabled={currentPage === 1 ? true : false} variant="contained" color="primary" type='button' className={classes.button} onClick={handlePrev}>
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
      <Button disabled={currentPage === totalPages ? true : false} variant="contained" color="primary" type='button' className={classes.button} onClick={handleNext}>
        Next
      </Button>

    </div>
  )
}

export default Pagination