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
  const countDownInitTime = 4
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream>()
  const [cameras, setCameras] = useState<CustomMediaDeviceInfo[]>([])
  const [countDownNumber, setCountDownNumber] = useState(countDownInitTime)

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

  useEffect(() => {
    let timeoutRef: NodeJS.Timeout
    const countDown = () => {
      if (countDownNumber > 0) {
        timeoutRef = setTimeout(() => {
          setCountDownNumber(countDownNumber - 1)
        }, 1000)
      } else {
        setCountDownNumber(countDownInitTime)
        takePhoto()
      }
    }

    if (countDownNumber !== countDownInitTime) {
      countDown()
    }

    return () => {
      clearTimeout(timeoutRef)
    }
  }, [countDownNumber])

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
      <div
        className={`${
          prop.show ? '' : 'invisible'
        } camera-modal py-20 bg-black`}
      >
        {loading ? (
          <CircularProgress size={100} className='fixed left-1/2 top-1/2' />
        ) : null}
        <div
          className={`camera-wrapper relative flex justify-center items-center gap-5 ${
            loading ? 'hidden' : ''
          }`}
        >
          <video
            id='video'
            ref={videoRef}
            className={`max-w-full camera`}
          ></video>
          {countDownNumber < countDownInitTime && countDownNumber >= 0 ? (
            <span className='count-down font-bold absolute text-white text-5xl'>
              {countDownNumber}
            </span>
          ) : null}
        </div>
        <div className='actions flex justify-center mt-10'>
          <button
            disabled={countDownNumber !== countDownInitTime}
            className={`${
              countDownNumber !== countDownInitTime
                ? 'hover:cursor-not-allowed'
                : ''
            }  `}
            onClick={() => {
              setCountDownNumber(countDownInitTime - 1)
            }}
          >
            <CameraRoundedIcon
              fontSize='large'
              color='primary'
            ></CameraRoundedIcon>
          </button>
        </div>
        <div className='camera-options flex flex-col justify-center items-center py-10 '>
          {cameras.map((camera) => (
            <li
              onClick={() => {
                changeCamera(camera.deviceId)
              }}
              className={`${
                camera.active ? 'text-red-500' : 'text-white '
              } list-none hover:text-red-300 hover:cursor-pointer`}
              key={camera.deviceId}
            >
              {camera.label.split('(')[0]}
            </li>
          ))}
        </div>
      </div>
      {/* ) : null} */}
    </>
  )
}

export default CameraScan
