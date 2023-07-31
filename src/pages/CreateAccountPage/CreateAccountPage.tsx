import './CreateAccountPage.scss'
import {ChangeEvent, useState} from 'react'
import SnackAlert from '../../components/SnackAlert/SnackAlert'
import * as Enums from '../../enums'
import {Button, TextField} from '@mui/material'
import * as apis from '../../api/api'
import {useNavigate} from 'react-router-dom'

interface AccountForm {
  email: string
  password: string
  confirmPassword: string
  username: string
}

interface AlertConfig {
  show: boolean
  message: string
  type: Enums.AlertType
  onClose: () => void
}

const CreateAccountPage = () => {
  const navigate = useNavigate()
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    message: '',
    type: Enums.AlertType.SUCCESS,
    show: false,
    onClose: () => {},
  })
  const [accountForm, setAccountForm] = useState<AccountForm>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setAccountForm({
      ...accountForm,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (accountForm.password !== accountForm.confirmPassword) {
      setAlertConfig({
        message: 'Password and confirm password do not match',
        type: Enums.AlertType.ERROR,
        show: true,
        onClose: () => setAlertConfig({...alertConfig, show: false}),
      })
    } else {
      apis
        .post(
          '/user/create',
          {
            userName: accountForm.username,
            password: accountForm.password,
            email: accountForm.email,
          },
          {
            withCredentials: true,
          }
        )
        .then((res: any) => {
          localStorage.setItem('token', res.data.token)
          setAlertConfig({
            message: res.data.message,
            type: Enums.AlertType.SUCCESS,
            show: true,
            onClose: () => {
              setAlertConfig({...alertConfig, show: false})
              navigate('/')
            },
          })
        })
    }
  }

  return (
    <section className=' forms create-account'>
      <div className='form signup'>
        <div className='form-content'>
          <header className='title'>Sign up</header>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Username'
              value={accountForm.username}
              onChange={handleInputChange}
              required
              name='username'
              sx={{mb: 2}}
            ></TextField>
            <TextField
              fullWidth
              label='Email'
              value={accountForm.email}
              onChange={handleInputChange}
              required
              type='email'
              name='email'
              sx={{mb: 2}}
            ></TextField>
            <TextField
              fullWidth
              label='Password'
              value={accountForm.password}
              onChange={handleInputChange}
              required
              error={accountForm.password !== accountForm.confirmPassword}
              type='password'
              name='password'
              helperText={
                accountForm.password !== accountForm.confirmPassword
                  ? 'Password and confirm password do not match'
                  : ''
              }
              sx={{mb: 2}}
            ></TextField>
            <TextField
              fullWidth
              label='Confirm Password'
              value={accountForm.confirmPassword}
              onChange={handleInputChange}
              required
              error={accountForm.password !== accountForm.confirmPassword}
              type='password'
              name='confirmPassword'
              helperText={
                accountForm.password !== accountForm.confirmPassword
                  ? 'Password and confirm password do not match'
                  : ''
              }
              sx={{mb: 2}}
            ></TextField>
            <Button variant='contained' color='primary' fullWidth type='submit'>
              Sign up
            </Button>
          </form>
          <div className='form-link'>
            <span>
              Already have an account?
              <a href='#' className='link login-link'>
                Login
              </a>
            </span>
          </div>
        </div>
        {/* <div className='line'></div>
        <div className='media-options'>
          <a href='#' className='field facebook'>
            <FacebookIcon></FacebookIcon>
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className='media-options'>
          <a href='#' className='field google'>
            <GoogleIcon></GoogleIcon>
            <span>Login with Google</span>
          </a>
        </div> */}
      </div>
      <SnackAlert
        show={alertConfig.show}
        onClose={alertConfig.onClose}
        message={alertConfig.message}
        type={alertConfig.type}
      ></SnackAlert>
    </section>
  )
}

export default CreateAccountPage
