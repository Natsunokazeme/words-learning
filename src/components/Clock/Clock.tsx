import './Clock.scss'
import {useMemo, useRef, useState} from 'react'
import {useEffect} from 'react'
import dayjs from './../../utils/dayjs'

const Clock = () => {
  const [curTime, setCurTime] = useState(new Date())
  const maxSize = Math.max(
    window.innerWidth > window.innerHeight
      ? window.innerHeight
      : window.innerWidth,
    250
  )

  const currentTime = useRef(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurTime(new Date())
    }, 1000)
    return () => {
      clearInterval(intervalId)
      setCurTime((curTime) => {
        localStorage.setItem('curTime', curTime.toString())
        return curTime
      })
    }
  }, [])

  const circleElements = (
    size: number,
    radius: number,
    initIndex: number,
    config?: {
      label?: string
      highLightIndex?: number
      hightLightColor?: string
      color?: string
    }
  ) =>
    Array.from({length: size}, (_, index) => (
      <div
        className='inline-block bg-transparent w-16 h-4 absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform border-0 duration-[1s] will-change-transform'
        style={{
          color:
            index === config?.highLightIndex
              ? config?.hightLightColor ?? 'white'
              : config?.color ?? 'grey',
          transform: `translate(${
            Math.sin(((index - initIndex) / size + 1 / 4) * 2 * Math.PI) *
            radius
          }px,${
            Math.cos(((index - initIndex) / size + 1 / 4) * 2 * Math.PI) *
            -radius
          }px) rotate(${(index - initIndex) / size}turn)`,
        }}
        key={index}
      >
        {index.toString().padStart(2, '0')}
        {config?.label}
      </div>
    ))

  const formattedDate = useMemo(() => {
    return dayjs(curTime).format('LLLL')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curTime.getMinutes()])

  const seconds = useMemo(() => {
    return circleElements(
      60,
      (40 / 100) * maxSize,
      currentTime.current.getSeconds(),
      {
        label: '秒',
        highLightIndex: curTime.getSeconds(),
        hightLightColor: 'var(--secondary-theme-color)',
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curTime.getSeconds(), maxSize])

  const minutes = useMemo(() => {
    // +1 to beautify the animation
    return circleElements(60, (32 / 100) * maxSize, curTime.getMinutes(), {
      label: '分',
      highLightIndex: curTime.getMinutes(),
      hightLightColor: 'var(--secondary-theme-color)',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curTime.getMinutes(), maxSize])

  const hours = useMemo(() => {
    // +1 to beautify the animation
    return circleElements(24, (16 / 100) * maxSize, curTime.getHours(), {
      label: '时',
      highLightIndex: curTime.getHours(),
      hightLightColor: 'var(--secondary-theme-color)',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curTime.getHours(), maxSize])

  return (
    <div className='clock-wrapper'>
      <h1 className='date'>{formattedDate}</h1>
      <div className='clock'>
        <div className='seconds'>{seconds}</div>
        <div className='minutes'>{minutes}</div>
        <div className='hours'>{hours}</div>
      </div>
    </div>
  )
}

export default Clock
