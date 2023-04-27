import React, {FC} from 'react'
import './Loading.scss'

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => (
  <div className='loading-wrapper'>
    <div className='loading'></div>
  </div>
)

export default Loading
