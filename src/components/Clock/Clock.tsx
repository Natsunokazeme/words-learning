import './Clock.scss'
import React, {useState} from 'react'
import {useEffect} from 'react'

const Clock = () => {
  const [curTime, setCurTime] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setCurTime(new Date())
    }, 1000)
  }, [])

  const circleElements = (
    size: number,
    radius: number,
    accurate: number,
    label?: string
  ) =>
    Array.from({length: size}, (_, index) => (
      <span
        className='inline-block bg-transparent w-16 h-4 absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform border-0'
        style={{
          color: index === accurate ? 'white' : 'grey',
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
      </span>
    ))

  return (
    <div className='clock-wrapper'>
      <h1>{curTime.toISOString()}</h1>
      {curTime.getSeconds()}
      <div className='clock'>
        <div className='seconds'>
          {circleElements(60, 200, curTime.getSeconds(), '秒')}
        </div>
        <div className='minutes'>
          {circleElements(60, 150, curTime.getMinutes(), '分')}
        </div>
        <div className='hours'>
          {circleElements(24, 100, curTime.getHours(), '时')}
        </div>
      </div>
    </div>
  )
}

export default Clock
