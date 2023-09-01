import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  createSvgIcon,
  styled,
} from '@mui/material'
import './Header.scss'
import {FC, useEffect, useRef, useState} from 'react'
import {AccountCircle, CameraAlt, NearMe, Upload} from '@mui/icons-material'
import SearchWrapper from '../SearchWrapper/SearchWrapper'
import LoginDialog from '../LoginDialog/LoginDialog'
import {useNavigate} from 'react-router-dom'
import * as apis from '../../api/api'
import CryptoJS from 'crypto-js'
import * as Enums from '../../enums'
import SnackAlert from '../SnackAlert/SnackAlert'
import TranslateIcon from '@mui/icons-material/Translate'
import BrushIcon from '@mui/icons-material/Brush'
import {ReactComponent as WeChat} from '../../assets/icons/weChat.svg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import {ReactComponent as DayMode} from '../../assets/icons/daymode.svg'
import {ReactComponent as NightMode} from '../../assets/icons/moon.svg'

interface SnackbarConfig {
  message: string
  type: Enums.AlertType
  show: boolean
}

interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [alertConfig, setAlertConfig] = useState<SnackbarConfig>({
    message: '',
    type: Enums.AlertType.SUCCESS,
    show: false,
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const root = document.getElementsByClassName('App')[0]
    if (theme === 'dark') {
      root.classList.remove('light-mode')
    } else {
      root.classList.add('light-mode')
    }
  }, [theme])

  // const MaterialUISwitch = styled(Switch)(() => ({
  //   width: 62,
  //   height: 34,
  //   padding: 7,
  //   '& .MuiSwitch-switchBase': {
  //     margin: 1,
  //     padding: 0,
  //     transform: 'translateX(6px)',
  //     '&.Mui-checked': {
  //       color: '#fff',
  //       transform: 'translateX(22px)',
  //       '& .MuiSwitch-thumb:before': {
  //         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //           '#fff'
  //         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
  //       },
  //       '& + .MuiSwitch-track': {
  //         opacity: 1,
  //         backgroundColor: theme === 'dark' ? '#8796A5' : '#fff',
  //       },
  //     },
  //   },
  //   '& .MuiSwitch-thumb': {
  //     backgroundColor: theme === 'dark' ? '#003892' : '#001e3c',
  //     width: 32,
  //     height: 32,
  //     '&:before': {
  //       content: "''",
  //       position: 'absolute',
  //       width: '100%',
  //       height: '100%',
  //       left: 0,
  //       top: 0,
  //       backgroundRepeat: 'no-repeat',
  //       backgroundPosition: 'center',
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //         '#fff'
  //       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
  //     },
  //   },
  //   '& .MuiSwitch-track': {
  //     opacity: 1,
  //     backgroundColor: theme === 'dark' ? '#8796A5' : '#aab4be',
  //     borderRadius: 20 / 2,
  //   },
  // }))

  const handleLogin = (username: string, password: string) => {
    const hashToken = CryptoJS.MD5(password).toString()

    apis
      .post('user/login', {
        username,
        password: hashToken,
      })
      .then((response: any) => {
        const data = response.data
        setAvatar(data.avatar ?? data.username)
        // avatar = data.imgurl
        // localStorage.setItem('avatar', avatar ?? '')
        setAlertConfig({
          message: data.message,
          type: Enums.AlertType.SUCCESS,
          show: true,
        })
        setShowLogin(false)
      })
      .catch((error) => {
        if (error.response.data.message) {
          setAlertConfig({
            message: error.response.data.message,
            type: Enums.AlertType.ERROR,
            show: true,
          })
        }
      })
  }

  const handleNavigation = () => {
    apis
      .get('/IPAdress', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        setShowNavigation(!showNavigation)
      })
  }

  const handleSearch = (value: string) => {
    if (!value || value.trim() === '') {
      return
    }
    // // TODO: search api
    // apis.get(`/search?id=${value}`).then((response: any) => {
    //   console.log(response)
    //   if (response.result.code === 404) {
    //     showSnackbarCallback({
    //       message: 'search failed, word not found',
    //       type: 'error',
    //     })
    //   }
    // })

    // mdj text2img api
    apis
      .post(`/createImage`, {
        prompt: value,
        steps: 100,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      })
      .then((response: any) => {
        const image = new Image()
        image.src = 'data:image/png;base64,' + response.data.data
        image.onload = () => {
          document.body.appendChild(image)
          //download image
          // const a = document.createElement('a')
          // a.href = image.src
          // a.download = `${value}.png`
          // a.click()
        }
        // if (response.result.code === 404) {
        //   showSnackbarCallback({
        //     message: 'search failed, word not found',
        //     type: 'error',
        //   })
        // }
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
  // const showSnackbarCallback = (config: SnackbarConfig) => {
  //   setAlertConfig(config)
  // }

  const menuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setShowMenu(true)
  }

  const menuClose = () => {
    setShowMenu(false)
  }

  const handleLogout = () => {
    apis.post('/user/logout', {}).then((response: any) => {
      const data = response.data
      if (data.code === 200) {
        setAlertConfig({
          message: data.message,
          type: Enums.AlertType.SUCCESS,
          show: true,
        })
      }
      menuClose()
    })
  }

  const WeChatIcon = createSvgIcon(<WeChat />, 'WeChatIcon')

  return (
    <AppBar className='header' position='sticky'>
      <Toolbar>
        <Tooltip arrow title='language learning'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='language learning'
            onClick={() => navigate('/language-learning')}
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='creation'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='creation'
            onClick={() => navigate('/creation')}
          >
            <BrushIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='weChat settings'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='weChat settings'
            onClick={() => navigate('/wechat-settings')}
          >
            <WeChatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title='computer notebook'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='computer notebook'
            onClick={() => navigate('/computer-notebook')}
          >
            <AutoStoriesIcon />
          </IconButton>
        </Tooltip>
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
        <Tooltip arrow title='camera'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='camera'
            onClick={() => navigate('/camera')}
          >
            {/* <NavLink className={'text-xs'} to='camera' end> */}
            <CameraAlt />
            {/* </NavLink> */}
          </IconButton>
        </Tooltip>
        {avatar && avatar !== '' ? (
          <>
            <Avatar
              alt={avatar}
              src={avatar}
              onClick={(e) => {
                menuOpen(e)
              }}
            ></Avatar>
            <Menu anchorEl={anchorEl} open={showMenu} onClose={menuClose}>
              <MenuItem onClick={() => navigate('/my-account')}>
                My account
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          </>
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
        <Switch
          checked={theme === 'dark'}
          checkedIcon={<NightMode />}
          icon={<DayMode />}
          disableRipple
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        />
      </Toolbar>
      <LoginDialog
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        handleLogin={handleLogin}
      ></LoginDialog>
      <SnackAlert
        show={alertConfig.show}
        onClose={() => setAlertConfig({...alertConfig, show: false})}
        message={alertConfig.message}
        type={alertConfig.type}
      ></SnackAlert>
    </AppBar>
  )
}
export default Header
