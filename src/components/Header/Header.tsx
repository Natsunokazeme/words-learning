import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
} from '@mui/material'
import './Header.scss'
import {useEffect, useState} from 'react'
import {AccountCircle, CameraAlt, NearMe, Upload} from '@mui/icons-material'
import SearchWrapper from '../SearchWrapper/SearchWrapper'

const Header = (props: any) => {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showNavigation, setShowNavigation] = useState(false)

  useEffect(() => {
    console.log('showNavigation', showNavigation)
  }, [showNavigation])

  const handleClose = () => {
    setShowLogin(false)
  }

  const handleLogin = () => {
    //TODO: login api
    console.log('login', username, password)
    setShowLogin(false)
  }

  const handleNavigation = (status?: boolean) => {
    setShowNavigation(status ?? !showNavigation)
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
              console.warn(value)
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
          <Dialog
            open={showLogin}
            onClose={() => {
              setShowLogin(false)
            }}
          >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                id='username'
                label='Username'
                type='text'
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin='dense'
                id='password'
                label='Password'
                type='password'
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header
