import React, {useEffect} from 'react'
import './App.scss'
import './styles/tailwind.scss'
import MainPage from './pages/MainPage/MainPage'
import Loading from './components/Loading/Loading'
import {ThemeProvider, createTheme} from '@mui/material'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage'
import ImagePage from './pages/ImagePage/ImagePage'
import CreationPage from './pages/CreationPage/CreationPage'
import WeChatPage from './pages/WeChatPage/WeChatPage'
import NotebookPage from './pages/NotebookPage/NotebookPage'
import LanguageLearningPage from './pages/LanguageLearningPage/LanguageLearningPage'
import AccountPage from './pages/AccountPage/AccountPage'

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#673ab7',
      },
      secondary: {
        main: '#8561c5',
      },
    },
  })

  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    document.addEventListener('ShowLoading', (event) => {
      setLoading((event as CustomEvent).detail)
    })
    return () => {
      document.removeEventListener('ShowLoading', () => {})
    }
  }, [])
  return (
    <ThemeProvider theme={customTheme}>
      <div className='App'>
        {loading ? <Loading /> : null}
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/camera' element={<ImagePage />}></Route>
            <Route
              path='/create-account'
              element={<CreateAccountPage />}
            ></Route>
            <Route path='/my-account' element={<AccountPage />}></Route>
            <Route path='/wechat-settings' element={<WeChatPage />}></Route>
            <Route path='computer-notebook' element={<NotebookPage />}></Route>
            <Route
              path='/language-learning'
              element={<LanguageLearningPage />}
            ></Route>
            <Route path='/creation' element={<CreationPage />}></Route>
            <Route path='*' element={<div>404</div>}></Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
