import {
  Alert,
  AppBar,
  Avatar,
  IconButton,
  Snackbar,
  Toolbar,
  Tooltip,
} from '@mui/material'
import './Header.scss'
import {useEffect, useState} from 'react'
import {AccountCircle, CameraAlt, NearMe, Upload} from '@mui/icons-material'
import SearchWrapper from '../SearchWrapper/SearchWrapper'
import LoginDialog from '../LoginDialog/LoginDialog'
import {NavLink} from 'react-router-dom'

interface SnackbarConfig {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

const Header = (props: any) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackConfig, setSnackConfig] = useState<SnackbarConfig>({
    message: '',
    type: 'success',
  })
  let avatar = localStorage.getItem('avatar')

  useEffect(() => {
    console.log('showNavigation', showNavigation)
  }, [showNavigation])

  const handleLogin = (username: string, password: string) => {
    //TODO: login api
    fetch('http://localhost:3010/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        avatar = response.imgurl
        localStorage.setItem('avatar', avatar ?? '')
        showSnackbarCallback({
          message: 'Login successfully',
          type: 'success',
        })
        setShowLogin(false)
      })
  }

  const handleNavigation = () => {
    fetch('http://realip.cc', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setShowNavigation(!showNavigation)
      })
  }

  const handleSearch = (value: string) => {
    // TODO: search api
    fetch(`http://localhost:3010/search?id=${value}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.result.code === 404) {
          showSnackbarCallback({
            message: 'search failed, word not found',
            type: 'error',
          })
        }
      })
  }

  const showSnackbarCallback = (config: SnackbarConfig) => {
    setSnackConfig(config)
    setShowSnackbar(true)
  }

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='show navigation'
            sx={{mr: 2}}
            onClick={() => handleNavigation()}
          >
            <NearMe />
          </IconButton>
          <SearchWrapper
            searchCallback={(value) => {
              handleSearch(value)
            }}
          />
          <Tooltip arrow title='import book'>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='import book'
              onClick={() => console.warn('import book')}
            >
              <Upload />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title='scan words'>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='scan words'
              onClick={() => console.warn('scan words')}
            >
              <NavLink className={'text-xs'} to='camera' end>
                <CameraAlt />
              </NavLink>
            </IconButton>
          </Tooltip>
          {avatar && avatar !== '' ? (
            <Avatar alt='user avatar' src={avatar}></Avatar>
          ) : (
            <Tooltip arrow title='login'>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='login'
                onClick={() => setShowLogin(true)}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          )}
          <LoginDialog
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            handleLogin={handleLogin}
          ></LoginDialog>
        </Toolbar>
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          autoHideDuration={4000}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity={snackConfig.type}
            sx={{width: '100%'}}
          >
            {snackConfig.message}
          </Alert>
        </Snackbar>
      </AppBar>
    </>
  )
}
export default Header
