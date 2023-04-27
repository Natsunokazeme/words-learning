import React, {useEffect} from 'react'
import './App.scss'
import './styles/tailwind.scss'
import MainPage from './pages/MainPage/MainPage'
import Loading from './components/Loading/Loading'

function App() {
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
    <div className='App bg-slate-400'>
      {loading ? <Loading /> : null}
      <MainPage></MainPage>
    </div>
  )
}

export default App
