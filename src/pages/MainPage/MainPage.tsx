import Header from '../../components/Header/Header'
import './MainPage.scss'
import Clock from '../../components/Clock/Clock'
import {useEffect, useState} from 'react'
import dayjs from './../../utils/dayjs'

const MainPage = (props: any) => {
  const [formattedTime, setFormattedTime] = useState('')
  useEffect(() => {
    const lastTime =
      localStorage.getItem('lastTime') ?? new Date().toISOString()
    setFormattedTime(dayjs(lastTime).format('llll'))
  }, [])

  return (
    <>
      <Header></Header>
      <div className='main-body'>
        <div>上一次打开时间:{formattedTime}</div>
        <Clock></Clock>
        {/* <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>magic</a> */}
      </div>
    </>
  )
}
export default MainPage
