import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, MovieDetails, Movies, NavBar, Profile } from "./components";
import useStyles from './styles'
import useAlan from "./components/Alan";
import {useRef} from 'react'

const App = () => {
  useAlan()
  const classes = useStyles()
  const alanBtnContainer = useRef()
  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route path='/' element={<Movies/>} />
            <Route path='/approved' element={<Movies/>} />
            <Route path="/movie/:id" element={<MovieDetails/>} />
            <Route path="/actors/:id" element={<Actors/>} />
            <Route path="/profile/:id" element={<Profile/>} />
          </Routes>
        </main>
        <div ref={alanBtnContainer}></div>
      </div>
  );
};

export default App;
