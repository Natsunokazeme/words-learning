import React, {useEffect} from 'react'
import './App.scss'
import './styles/tailwind.scss'
import MainPage from './pages/MainPage/MainPage'
import Loading from './components/Loading/Loading'
import {ThemeProvider, createTheme} from '@mui/material'

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
    <div className='App'>
      <ThemeProvider theme={customTheme}>
        {loading ? <Loading /> : null}
        <MainPage></MainPage>
      </ThemeProvider>
    </div>
  )
}

export default App
