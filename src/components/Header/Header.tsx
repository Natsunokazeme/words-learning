import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  createSvgIcon,
} from '@mui/material'
import './Header.scss'
import {useEffect, useState} from 'react'
import {AccountCircle, CameraAlt, NearMe, Upload} from '@mui/icons-material'
import SearchWrapper from '../SearchWrapper/SearchWrapper'
import LoginDialog from '../LoginDialog/LoginDialog'
import {NavLink, useNavigate} from 'react-router-dom'
import * as apis from '../../api/api'
import CryptoJS from 'crypto-js'
import * as Enums from '../../enums'
import SnackAlert from '../SnackAlert/SnackAlert'
import TranslateIcon from '@mui/icons-material/Translate'
import BrushIcon from '@mui/icons-material/Brush'
import {ReactComponent as WeChat} from '../../assets/icons/weChat.svg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
interface SnackbarConfig {
  message: string
  type: Enums.AlertType
  show: boolean
}

const Header = (props: any) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [alertConfig, setAlertConfig] = useState<SnackbarConfig>({
    message: '',
    type: Enums.AlertType.SUCCESS,
    show: false,
  })
  const navigate = useNavigate()
  // let avatar = localStorage.getItem('avatar')

  useEffect(() => {
    console.log('showNavigation', showNavigation)
  }, [showNavigation])

  const handleLogin = (username: string, password: string) => {
    const hashToken = CryptoJS.MD5(password).toString()

    apis
      .post('user/login', {
        username,
        password: hashToken,
      })
      .then((response: any) => {
        const data = response.data
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
        console.log(error)
        setAlertConfig({
          message: error.message,
          type: Enums.AlertType.ERROR,
          show: true,
        })
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

  const WeChatIcon = createSvgIcon(<WeChat />, 'WeChatIcon')

  return (
    <>
      <AppBar position='sticky'>
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
          {/* {avatar && avatar !== '' ? (
            <Avatar alt='user avatar' src={avatar}></Avatar>
          ) : ( */}
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
        <SnackAlert
          show={alertConfig.show}
          onClose={() => setAlertConfig({...alertConfig, show: false})}
          message={alertConfig.message}
          type={alertConfig.type}
        ></SnackAlert>
      </AppBar>
    </>
  )
}
export default Header
