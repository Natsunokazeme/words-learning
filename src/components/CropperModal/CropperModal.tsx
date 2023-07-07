import {Modal, Button} from '@mui/material'
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

  useEffect(() => {}, [props.cropperImg])
  return (
    // <div className='cropper-modal'>
    <Modal
      open={props.show}
      onClose={() => {
        props.setShow(false)
      }}
      hideBackdrop
    >
      <>
        <div>
          <Cropper
            ref={cropperRef}
            style={{
              height: '400px',
              width: '100%',
              maxHeight: '80vh',
              maxWidth: '80vw',
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
            className='cropper'
            dragMode='crop'
          />
          <div className='flex justify-evenly mt-5'>
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
      </>
    </Modal>
    // </div>
  )
}

export default CropperModal
