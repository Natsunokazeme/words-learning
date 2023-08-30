import {Modal, Button, useMediaQuery} from '@mui/material'
import './CropperModal.scss'
import React, {useRef} from 'react'
import {useEffect} from 'react'
import Cropper, {ReactCropperElement} from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface CropperModalProps {
  cropperImg: string
  show: boolean
  setShow: (show: boolean) => void
  afterCrop: (imgUrl: string) => void
}

const CropperModal = (props: CropperModalProps) => {
  const cropperRef = useRef<ReactCropperElement>(null)
  useMediaQuery('(max-width: 768px)')

  useEffect(() => {}, [props.cropperImg])
  return (
    <Modal
      open={props.show}
      onClose={() => {
        props.setShow(false)
      }}
      className='custom-cropper-modal'
      hideBackdrop
    >
      <div className='p-5 pb-20'>
        <Cropper
          ref={cropperRef}
          style={{
            height: 'calc(100% - 100px)',
            width: '100%',
            maxHeight: '80vh',
            // maxWidth: '80vw',
          }}
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
          src={props.cropperImg}
          className='cropper custom-cropper'
          dragMode='crop'
        />
        <div className='flex gap-4 justify-center mt-10'>
          <Button
            variant='contained'
            onClick={() => {
              props.afterCrop(
                (cropperRef.current as ReactCropperElement).cropper
                  .getCroppedCanvas()
                  .toDataURL()
              )
            }}
          >
            Confirm
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              props.setShow(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
    // </div>
  )
}

export default CropperModal
