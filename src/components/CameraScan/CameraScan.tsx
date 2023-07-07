import React, {FC, useRef, useState} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import DownloadIcon from '@mui/icons-material/Download'
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import UploadIcon from '@mui/icons-material/Upload'

import 'cropperjs/dist/cropper.css'
import CropperModal from '../CropperModal/CropperModal'

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
  const [cropperImg, setCropperImg] = useState('')
  const [stream, setStream] = useState<MediaStream>()
  const [cameras, setCameras] = useState<CustomMediaDeviceInfo[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('getUserMedia not supported')
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
    drawCanvas(video, true)
    video.hidden = true
    setOpen(true)
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

  const convertFileToImage = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        setCropperImg(img.src)
        setOpen(true)
      }
    }
  }

  const drawCanvas = (
    element: HTMLImageElement | HTMLVideoElement,
    mirror?: boolean
  ) => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.height = element.height
      canvas.width = element.width
      ctx.drawImage(element, 0, 0)
      if (mirror) {
        ctx.save()
        ctx.scale(-1, 1)
        ctx.drawImage(element, -element.width, 0)
        // restore to original state
        ctx.restore()
      }
    }
    setCropperImg(canvas.toDataURL())
    return canvas
  }

  const updateCanvas = (element: HTMLImageElement | HTMLVideoElement) => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(element, 0, 0)
    }
  }

  const cropImage = (imgUrl: string) => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const img = new Image()
      img.src = imgUrl
      img.onload = () => {
        drawCanvas(img)
        setOpen(false)
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
        <CropperModal
          show={open}
          setShow={setOpen}
          cropperImg={cropperImg}
          afterCrop={cropImage}
        ></CropperModal>
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
      <div className='canvas-container'>
        <p>Preview</p>
        <canvas ref={canvasRef} className='max-w-full'></canvas>
      </div>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        ref={uploadRef}
        onChange={(e) => {
          let files = e.target.files
          if (files && files.length > 0) {
            // only one file now
            convertFileToImage(files[0])
            ;(uploadRef.current as HTMLInputElement).value = ''
          } else {
            // todo empty files
          }
        }}
      />
    </>
  )
}

export default CameraScan
