import React, {FC, useRef} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'

interface CameraScanProps {}

const CameraScan: FC<CameraScanProps> = () => {
  const [loading, setLoading] = React.useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia not supported')
      return
    }

    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      const video = videoRef.current as HTMLVideoElement
      video.srcObject = stream
      video.onloadeddata = () => {
        setLoading(false)
        video.play()
        video.height = video.videoHeight
        video.width = video.videoWidth
      }
    })
  }, [])

  const takePhoto = () => {
    const video = videoRef.current as HTMLVideoElement
    const canvas = canvasRef.current as HTMLCanvasElement
    canvas.height = video.height
    canvas.width = video.width
    const cxs = canvas.getContext('2d')
    cxs?.restore()
    cxs?.drawImage(video, 0, 0)
  }

  const savePhoto = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const url = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = url
    link.download = new Date().toISOString() + '.png'
    link.click()
  }

  return (
    <div className=''>
      {loading && <CircularProgress size={100} />}
      <video id='video' ref={videoRef} className=''></video>
      <button
        onClick={() => {
          takePhoto()
        }}
      >
        Take photo
      </button>
      <button
        onClick={() => {
          savePhoto()
        }}
      >
        save
      </button>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default CameraScan
