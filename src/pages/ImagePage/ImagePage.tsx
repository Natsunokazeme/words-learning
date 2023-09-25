import {useRef, useState} from 'react'
import CameraScan from '../../components/CameraScan/CameraScan'
import './ImagePage.scss'
import CropperModal from '../../components/CropperModal/CropperModal'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'

const ImagePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)
  const [cropperImg, setCropperImg] = useState('')
  const [openCropper, setOpenCropper] = useState(false)
  const [openCamera, setOpenCamera] = useState(false)

  const uploadImage = () => {
    const upload = uploadRef.current as HTMLInputElement
    upload.click()
  }

  const saveCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const url = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = url
    link.download = new Date().toISOString() + '.png'
    link.click()
  }

  const convertFileToImage = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        setCropperImg(img.src)
        setOpenCropper(true)
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
    const elementWidth = element.width
    // const elementHeight = element.height
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ctx = canvas.getContext('2d')
    //todo assign start position
    if (ctx) {
      ctx.drawImage(element, canvasWidth - elementWidth, canvasHeight / 10)
    }
  }

  const cropImage = (imgUrl: string) => {
    //todo fix bug for cropped image
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const img = new Image()
      img.src = imgUrl
      img.onload = () => {
        if (canvas.height !== 0) {
          updateCanvas(img)
        } else {
          drawCanvas(img)
        }
        setOpenCropper(false)
      }
    }
  }
  return (
    <div className='image-page'>
      <div className='canvas-container'>
        <p>Preview</p>
        <canvas ref={canvasRef} className='max-w-full'></canvas>
      </div>
      <div className='actions flex gap-4 justify-center mt-10'>
        <button
          onClick={() => {
            setOpenCamera(true)
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
            saveCanvas()
          }}
        >
          <DownloadIcon fontSize='large' color='primary'></DownloadIcon>
        </button>
      </div>
      <CameraScan
        show={openCamera}
        drawCanvas={drawCanvas}
        setShow={setOpenCamera}
      ></CameraScan>
      <CropperModal
        show={openCropper}
        setShow={setOpenCropper}
        cropperImg={cropperImg}
        afterCrop={cropImage}
      ></CropperModal>
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
          }
        }}
      />
    </div>
  )
}

export default ImagePage
