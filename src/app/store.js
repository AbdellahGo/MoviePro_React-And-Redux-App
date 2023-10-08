import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import authSlice from "../features/auth";
export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user : authSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})