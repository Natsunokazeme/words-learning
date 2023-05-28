import './Clock.scss'
import React, {useState} from 'react'

const Clock = () => {
  const [curTime, setCurTime] = useState(new Date())
  setTimeout(() => {
    setCurTime(new Date())
  }, 1000)

  const circleElements = (size: number, radius: number) =>
    Array.from({length: size}, (_, index) => (
      <span
        className='inline-block bg-white w-8 h-8 border-2 absolute top-0 bottom-0 left-0 right-0 m-auto'
        style={{
          transform: `translate(${
            Math.sin(((index + 1) / size) * 2 * Math.PI) * radius
          }px,${Math.cos(((index + 1) / size) * 2 * Math.PI) * -radius}px)`,
        }}
        key={index}
      >
        {index + 1}
      </span>
    ))

  return (
    <div className='clock'>
      <h1>{curTime.toISOString()}</h1>
      {curTime.getSeconds()}
      <div className='clock'>
        <div className='seconds'>{circleElements(60, 400)}</div>
        <div className='minutes'>{circleElements(60, 300)}</div>
        <div className='hours'>{circleElements(12, 150)}</div>
      </div>
    </div>
  )
}

export default Clock
