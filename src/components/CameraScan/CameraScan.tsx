import React, {FC, useRef, useState} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import DownloadIcon from '@mui/icons-material/Download'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
interface CameraScanProps {}

const CameraScan: FC<CameraScanProps> = () => {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream>()
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia not supported')
      return
    }
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      setCameras(
        mediaDevices.filter((devices) => devices.kind === 'videoinput')
      )
    })
    startCamera({
      video: true,
    })
  }, [])

  const startCamera = (constraints: MediaStreamConstraints) => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      setStream(stream)
      const video = videoRef.current as HTMLVideoElement
      video.srcObject = stream
      video.onloadeddata = () => {
        setLoading(false)
        video.play()
        video.height = video.videoHeight
        video.width = video.videoWidth
      }
    })
  }

  const takePhoto = () => {
    const video = videoRef.current as HTMLVideoElement
    const canvas = canvasRef.current as HTMLCanvasElement
    canvas.height = video.height
    canvas.width = video.width
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0)
      ctx.save()
      ctx.scale(-1, 1)
      ctx.drawImage(video, -video.width, 0)
      // restore to original state
      ctx.restore()
    }
  }

  const savePhoto = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const url = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = url
    link.download = new Date().toISOString() + '.png'
    link.click()
  }

  const changeCamera = async (id: string) => {
    await stopCamera()
    startCamera({
      video: {
        deviceId: {exact: id},
      },
    })
  }

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop())
  }

  return (
    <>
      <div className='camera-wrapper flex gap-5'>
        {loading && <CircularProgress size={100} />}
        <video id='video' ref={videoRef} className='max-w-full  camera'></video>
        <canvas ref={canvasRef} className='max-w-full'></canvas>
      </div>
      <div className='actions flex justify-center mt-10'>
        <button
          onClick={() => {
            takePhoto()
          }}
        >
          <PhotoCameraIcon fontSize='large' color='primary'></PhotoCameraIcon>
        </button>
        <button
          onClick={() => {
            savePhoto()
          }}
        >
          <DownloadIcon fontSize='large' color='primary'></DownloadIcon>
        </button>
        {/* <button
          onClick={() => {
            changeCamera()
          }}
        >
          <ChangeCircleIcon fontSize='large' color='primary'></ChangeCircleIcon>{' '}
        </button> */}
      </div>
      {cameras.map((camera) => (
        <div
          onClick={() => {
            changeCamera(camera.deviceId)
          }}
          key={camera.deviceId}
        >
          {camera.label}
        </div>
      ))}
    </>
  )
}

export default CameraScan
