import React, {FC, useRef} from 'react'
import './CameraScan.scss'
import {useEffect} from 'react'

interface CameraScanProps {}

const CameraScan: FC<CameraScanProps> = () => {
  // const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia not supported')
      return
    }

    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      const video = document.getElementById('video') as HTMLVideoElement
      video.srcObject = stream
      video.onloadeddata = () => {
        video.play()
      }
      console.log('CameraScan Component')
    })
  }, [])
  return (
    <>
      <div>CameraScan Component</div>
      <video id='video'></video>
    </>
  )
}

export default CameraScan
