import {AppBar, IconButton, Toolbar, Tooltip} from '@mui/material'
import './Header.scss'
import {useEffect, useState} from 'react'
import {AccountCircle, CameraAlt, NearMe, Upload} from '@mui/icons-material'
import SearchWrapper from '../SearchWrapper/SearchWrapper'
import LoginDialog from '../LoginDialog/LoginDialog'

const Header = (props: any) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)

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
      .then((response) => response.text())
      .then((response) => {
        console.log(response)
        setShowLogin(false)
      })
  }

  const handleNavigation = (status?: boolean) => {
    setShowNavigation(status ?? !showNavigation)
  }

  const handleSearch = (value: string) => {
    // TODO: search api
    fetch(`http://localhost:3010/search?id=${value}`, {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response)
      })
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
            onMouseEnter={() => handleNavigation(true)}
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
              <CameraAlt />
            </IconButton>
          </Tooltip>
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
          <LoginDialog
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            handleLogin={handleLogin}
          ></LoginDialog>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header
