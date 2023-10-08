import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie as MovieIcon, PlusOne, Remove, Theaters } from '@mui/icons-material'
import { Box, Button, ButtonGroup, CircularProgress, Fade, Grid, Modal, Rating, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB'
import { useEffect, useState } from 'react'
import useStyles from './styles'
import genresIcons from '../../assets/genres'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { MovieList } from '..'
import { userSelector } from '../../features/auth'





const MovieDetails = () => {
  const { user } = useSelector(userSelector)
  const dispatch = useDispatch()
  const { id } = useParams()
  const classes = useStyles()

  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id })
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);


  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);
  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size='4rem' />
    </Box>
  )

  if (error) return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Link to='/'>
        Something has gone wrong - Go back</Link>
    </Box>
  )

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid className={classes.imageBox} item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>{data?.title} ({data?.release_date.split('-')[0]})</Typography>
        <Typography variant='h5' align='center' gutterBottom>{data?.tagline}</Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display='flex' align='center'>
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average.toFixed(1)} / 10</Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min {data?.spoken_languages.length > 1 ? `/ ${data?.spoken_languages[0]?.name}` : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres.map((genre) => (
            <Link key={genre.name} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genresIcons[genre.name.toLowerCase()]} alt="genre icon" className={classes.genreImage} height={30} />
              <Typography color='textPrimary' variant='subtitle1'>{genre.name}</Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom >
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (
            character?.profile_path && (<Grid item key={i} xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`} alt={character.name} />
              <Typography color='textPrimary'>{character?.name}</Typography>
              <Typography color='textSecondary'>{character?.character.split('/')[0]}</Typography>
            </Grid>)
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(!open)} href='#' endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}>
                  {isMovieFavorited ? 'Favorite' : 'Unfavorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }} onClick={() => navigate(-1)}>
                  <Typography style={{ textDecoration: 'none' }} color='inherit' variant='subtitle2'>Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box>
      {data?.videos?.results.length > 0 && (
        <Modal closeAfterTransition className={classes.modal} open={open}
          onClose={() => setOpen(false)}>
          <iframe className={classes.video} style={{ border: '0' }} title='Trailer'
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}?autoplay=1&mute=1`}></iframe>
        </Modal>
      )}
    </Grid>

  )
}

export default MovieDetails