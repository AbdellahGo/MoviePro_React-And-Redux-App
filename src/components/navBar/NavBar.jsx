import React, { useContext, useEffect, useState } from "react"
import { AccountCircle, Brightness4, Brightness7, Menu } from "@mui/icons-material"
import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import useStyles from './styles'
import { SideBar, Search } from '..'
import { fetchToken, moviesApi, createSessionId } from "../../utils"
import { useDispatch, useSelector } from "react-redux"
import { setUser, userSelector } from "../../features/auth"

import { ColorModeContext } from "../../utils/ToggleColorMode"

const NavBar = () => {
  const {user, isAuthenticated} = useSelector(userSelector)
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  const dispatch = useDispatch()
  const token = localStorage.getItem('request_token')
  const sessionIdFromLocalStorage = localStorage.getItem('session_id')

  const colorMode = useContext(ColorModeContext)

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
          dispatch(setUser(userData))
        } else {
          const sessionId = await createSessionId()
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)
          dispatch(setUser(userData))
        }
      }
    }
    logInUser()
  }, [token])


  return (
    <nav>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: '1' }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Link to={`/profile/${user.id}`} style={{ color: 'inherit' }}>
                <Button color="inherit" className={classes.linkButton} onClick={() => { }}>
                  {!isMobile && <>{user.name} &nbsp;</>}
                  <Avatar style={{ width: 30, height: 30 }} alt="Profile" src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`} />
                </Button>
              </Link>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer variant="temporary" anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </nav>
  )
}

export default NavBar