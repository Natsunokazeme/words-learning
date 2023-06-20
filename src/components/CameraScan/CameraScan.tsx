import React, {FC, useRef, useState} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import DownloadIcon from '@mui/icons-material/Download'
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import UploadIcon from '@mui/icons-material/Upload'
import Cropper, {ReactCropperElement} from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface CameraScanProps {}

interface CustomMediaDeviceInfo
  extends Pick<MediaDeviceInfo, Exclude<keyof MediaDeviceInfo, 'toJSON'>> {
  active: boolean
}

const CameraScan: FC<CameraScanProps> = () => {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [imgUrl, setImgUrl] = useState('')
  const [stream, setStream] = useState<MediaStream>()
  const [cameras, setCameras] = useState<CustomMediaDeviceInfo[]>([])

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia not supported')
      return
    }
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      setCameras(
        mediaDevices
          .filter((devices: MediaDeviceInfo) => devices.kind === 'videoinput')
          .map((device, index) => ({
            kind: device.kind,
            label: device.label,
            deviceId: device.deviceId,
            groupId: device.groupId,
            active: index === 0 ? true : false,
          }))
      )
    })
  }, [])

  useEffect(() => {
    // update custom camera
    startCamera({
      video: {
        deviceId: {exact: cameras.find((camera) => camera.active)?.deviceId},
      },
    })
  }, [cameras])

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
    setCameras(
      cameras.map((camera) => ({
        ...camera,
        active: camera.deviceId === id,
      }))
    )
  }

  const stopCamera = () => {
    setLoading(true)
    stream?.getTracks().forEach((track) => track.stop())
  }

  const uploadImage = () => {
    const upload = uploadRef.current as HTMLInputElement
    upload.click()
  }

  const drawCanvas = (uploadedImage: File) => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx && uploadedImage) {
      const img = new Image()
      img.src = URL.createObjectURL(uploadedImage)
      img.onload = () => {
        setImgUrl(img.src)
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
      }
    }
  }

  //todo cropper for canvas
  //todo use second canvas for cropper and compress them into one
  //todo count down for camera
  // todo empty image
  //todo hide camera after canvas is loaded

  return (
    <>
      {loading ? (
        <CircularProgress size={100} className='fixed left-1/2 top-1/2' />
      ) : null}
      <div
        className={`camera-wrapper flex items-center gap-5 ${
          loading ? 'hidden' : ''
        }`}
      >
        <video
          id='video'
          ref={videoRef}
          className={`max-w-full camera`}
        ></video>
        <canvas ref={canvasRef} className='max-w-full'></canvas>
        <Cropper
          ref={cropperRef}
          style={{height: 400, width: '100%'}}
          zoomTo={0.5}
          initialAspectRatio={16 / 9}
          preview='.img-preview'
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={true}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          src={imgUrl}
          className='cropper'
          dragMode='crop'
        />
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
            uploadImage()
          }}
        >
          <UploadIcon fontSize='large' color='primary'></UploadIcon>
        </button>
        <button
          onClick={() => {
            savePhoto()
          }}
        >
          <DownloadIcon fontSize='large' color='primary'></DownloadIcon>
        </button>
      </div>
      {cameras.map((camera) => (
        <li
          onClick={() => {
            changeCamera(camera.deviceId)
          }}
          className={`${camera.active ? 'bg-pink-100' : ''}`}
          key={camera.deviceId}
        >
          {camera.label.split('(')[0]}
        </li>
      ))}
      <input
        type='file'
        accept='image/*'
        className='hidden'
        ref={uploadRef}
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) {
            drawCanvas(files[0])
          } else {
            // todo empty image
          }
        }}
      />
    </>
  )
}

export default CameraScan
