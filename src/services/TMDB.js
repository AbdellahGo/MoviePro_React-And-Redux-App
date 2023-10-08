import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";




export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    //! get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // !fix
    //! get List
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
    // !fix
    //! get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //! get Movies by search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }
        //! get Movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }
        //! get Movies by genres
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }
        //! get popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
      }
    }),
    //! Get Movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),
    //! Get User Specific Lists
    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),
    //! Get Actor details
    getActorDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`
    }),
    //! Get Movies by Actor id
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorDetailsQuery, useGetMoviesByActorIdQuery, useGetListQuery } = tmdbApi
