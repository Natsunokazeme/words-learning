import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material'
import React, {FC, useState} from 'react'
import './LoginDialog.scss'

interface LoginDialogProps {
  showLogin: boolean
  setShowLogin: (status: boolean) => void
  handleLogin: (username: string, password: string) => void
}

const LoginDialog: FC<LoginDialogProps> = (prop) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Dialog
      open={prop.showLogin}
      onClose={() => {
        prop.setShowLogin(false)
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='username'
          label='Username'
          type='text'
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            prop.setShowLogin(false)
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => prop.handleLogin(username, password)}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
