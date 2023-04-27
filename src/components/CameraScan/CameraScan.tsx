import React, {FC} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'

interface CameraScanProps {}

const CameraScan: FC<CameraScanProps> = () => {
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia not supported')
      return
    }

    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      const video = document.getElementById('video') as HTMLVideoElement
      video.srcObject = stream
      video.onloadeddata = () => {
        setLoading(false)
        video.play()
      }
    })
  }, [])

  return (
    <div className='flex items-center justify-center'>
      {loading && <CircularProgress size={100} />}
      <video id='video' className='h-screen w-screen'></video>
    </div>
  )
}

export default CameraScan
