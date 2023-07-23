import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ImagePage from './pages/ImagePage/ImagePage'
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/camera' element={<ImagePage />}></Route>
        <Route path='/create-account' element={<CreateAccountPage />}></Route>
        <Route path='*' element={<div>404</div>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
