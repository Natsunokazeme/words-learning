import './Clock.scss'
import React, {useMemo, useState} from 'react'
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

  const formattedDate = useMemo(() => {
    return dayjs(curTime).format('LLLL')
    //todo: 优化,curTime只展示到分钟
  }, [curTime])

  const circleElements = (
    size: number,
    radius: number,
    accurate: number,
    label?: string
  ) =>
    Array.from({length: size}, (_, index) => (
      <div
        className='inline-block bg-transparent w-16 h-4 absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform border-0 will-change-transform'
        style={{
          color: index === accurate ? 'white' : 'grey',
          transitionDuration: accurate === 0 ? '0s' : '1s',
          transform: `translate(${
            Math.sin(((index - accurate) / size + 1 / 4) * 2 * Math.PI) * radius
          }px,${
            Math.cos(((index - accurate) / size + 1 / 4) * 2 * Math.PI) *
            -radius
          }px) rotate(${(index - accurate) / size}turn)`,
        }}
        key={index}
      >
        {index.toString().padStart(2, '0')}
        {label}
      </div>
    ))

  return (
    <div className='clock-wrapper'>
      <h1 className='date'>{formattedDate}</h1>
      <div className='clock'>
        <div className='seconds'>
          {circleElements(60, (40 / 100) * maxSize, curTime.getSeconds(), '秒')}
        </div>
        <div className='minutes'>
          {circleElements(60, (32 / 100) * maxSize, curTime.getMinutes(), '分')}
        </div>
        <div className='hours'>
          {circleElements(24, (16 / 100) * maxSize, curTime.getHours(), '时')}
        </div>
      </div>
    </div>
  )
}

export default Clock
