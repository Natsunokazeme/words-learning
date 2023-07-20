import Header from '../../components/Header/Header'
import './MainPage.scss'
import Clock from '../../components/Clock/Clock'
import {useEffect} from 'react'
import dayjs from 'dayjs'
import localFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'

const MainPage = (props: any) => {
  const lastTime = localStorage.getItem('lastTime') ?? new Date().toISOString()
  useEffect(() => {
    dayjs.extend(localFormat)
    dayjs.locale('zh-cn')
  }, [])

  return (
    <>
      <Header></Header>
      {/* {wordsData.map((word: Models.Word) => {
        return (
          <div key={word.id} className='word-wrapper'>
            <div className='word'>
              <span className='word-image'>
                <img src={word.imageUrl} alt='' />
              </span>
              <span className='word-text'>{word.text}</span>
              <span className='word-translation'>{word.enTranslation}</span>
              <span className='word-translation'>{word.zhTranslation}</span>
              <span className='word-pronunciation'>{word.pronunciation}</span>

              <span className='word-example'>{word.example}</span>
            </div>
          </div>
        )
      })} */}
      <div className='main-body'>
        <div>上一次打开时间:{dayjs(lastTime).format('LLLL')}</div>
        <Clock></Clock>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>magic</a>
      </div>
    </>
  )
}
export default MainPage
