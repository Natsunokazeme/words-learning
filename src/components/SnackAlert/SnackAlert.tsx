import {Snackbar, Alert} from '@mui/material'
import * as Enums from '../../enums'

interface SnackAlertProps {
  message: string
  type: Enums.AlertType
  show: boolean
  onClose: () => void
}

const SnackAlert = ({message, type, show, onClose}: SnackAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={show}
      onClose={() => onClose()}
      autoHideDuration={3000}
    >
      <Alert onClose={() => onClose()} severity={type} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackAlert
