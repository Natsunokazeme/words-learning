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
import * as apis from '../../api/api'

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
    apis
      .post('/login', {
        username,
        password,
      })
      .then((response: any) => {
        const data = response.data
        avatar = data.imgurl
        localStorage.setItem('avatar', avatar ?? '')
        showSnackbarCallback({
          message: 'Login successfully',
          type: 'success',
        })
        setShowLogin(false)
      })
      .catch((error) => {
        console.log(error)
        showSnackbarCallback({
          message: error.message,
          type: 'error',
        })
      })
  }

  const handleNavigation = () => {
    apis.get('/IPAdress').then((response) => {
      console.log(response)
      setShowNavigation(!showNavigation)
    })
  }

  const handleSearch = (value: string) => {
    if (!value || value.trim() === '') {
      return
    }
    // TODO: search api
    apis.get(`/search?id=${value}`).then((response: any) => {
      console.log(response)
      if (response.result.code === 404) {
        showSnackbarCallback({
          message: 'search failed, word not found',
          type: 'error',
        })
      }
    })
  }

  const handleImportBook = () => {
    console.warn('import book')
    apis
      .post(
        '/word/create',
        {
          text: 'hello',
          enTranslation: 'hello',
          zhTranslation: '你好',
          pronunciation: 'hello',
          example: 'hello world',
          imageUrl: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
          audioSrc: 'https://www.w3school.com.cn/i/song.mp3',
          extra: 'extra',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response)
        // if (response.result.code === 404) {
        //   showSnackbarCallback({
        //     message: 'search failed, word not found',
        //     type: 'error',
        //   })
        // }
      })
  }
  const showSnackbarCallback = (config: SnackbarConfig) => {
    setSnackConfig(config)
    setShowSnackbar(true)
  }

  return (
    <>
      <AppBar position='sticky'>
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
              onClick={() => handleImportBook()}
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
