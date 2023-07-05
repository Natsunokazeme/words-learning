import Header from '../../components/Header/Header'
import './MainPage.scss'
import Clock from '../../components/Clock/Clock'

const MainPage = (props: any) => {
  const lastTime = localStorage.getItem('lastTime') ?? ''

  const formatTime = (time: string) => {
    const date = new Date(time)
    if (date.toString() === 'Invalid Date') {
      return ''
    }
    return date.toISOString()
  }

  // useEffect(() => {
  //   lastTime = localStorage.getItem('lastTime') ?? ''
  //   if (lastTime) {
  //     new Date(lastTime)
  //   }
  // }, [])
  // const wordsData: Models.Word[] = [
  //   {
  //     id: 1,
  //     text: 'hello',
  //     enTranslation: 'hello',
  //     zhTranslation: '你好',
  //     pronunciation: '[həˈləʊ]',
  //     imageUrl:
  //       'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074__340.jpg',
  //     audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  //     example: 'Hello, how are you?',
  //     extra: '',
  //     createdTime: new Date(),
  //     updatedTime: new Date(),
  //   },
  //   {
  //     id: 2,
  //     text: 'world',
  //     enTranslation: 'world',
  //     zhTranslation: '世界',
  //     pronunciation: '[wɜːld]',
  //     imageUrl: 'https://cdn2.thecatapi.com/images/2a5.jpg',
  //     audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  //     example: 'Hello, world.',
  //     extra: '',
  //     createdTime: new Date(),
  //     updatedTime: new Date(),
  //   },
  // ]

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
      <div>上一次打开时间:{formatTime(lastTime)}</div>

      <div className='main-body'>
        <Clock></Clock>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>magic</a>
      </div>
    </>
  )
}
export default MainPage
