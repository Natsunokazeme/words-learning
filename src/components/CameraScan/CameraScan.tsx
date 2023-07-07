import React, {FC, useRef, useState} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'
import {CircularProgress} from '@mui/material'
import CameraRoundedIcon from '@mui/icons-material/CameraRounded'

interface CameraScanProps {
  show: boolean
  drawCanvas: (video: HTMLVideoElement, hidden: boolean) => void
  setShow: (show: boolean) => void
}

interface CustomMediaDeviceInfo
  extends Pick<MediaDeviceInfo, Exclude<keyof MediaDeviceInfo, 'toJSON'>> {
  active: boolean
}

const CameraScan: FC<CameraScanProps> = (prop: CameraScanProps) => {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  // const canvasRef = useRef<HTMLCanvasElement>(null)
  // const uploadRef = useRef<HTMLInputElement>(null)
  // const [cropperImg, setCropperImg] = useState('')
  const [stream, setStream] = useState<MediaStream>()
  const [cameras, setCameras] = useState<CustomMediaDeviceInfo[]>([])
  // const [open, setOpen] = useState(false)

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
      // todo when show is false,  video is false
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
    prop.drawCanvas(video, true)
    prop.setShow(false)
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

  //todo count down for camera
  // todo empty image
  //todo hide camera after canvas is loaded

  return (
    <>
      {/* {prop.show ? ( */}
      <div className={`${prop.show ? '' : 'invisible'} camera-modal`}>
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
        </div>
        <div className='actions flex justify-center mt-10'>
          <button
            onClick={() => {
              takePhoto()
            }}
          >
            <CameraRoundedIcon
              fontSize='large'
              color='primary'
            ></CameraRoundedIcon>
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
      </div>
      {/* ) : null} */}
    </>
  )
}

export default CameraScan
