import './CreateAccountPage.scss'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import {ChangeEvent, useState} from 'react'
import SnackAlert from '../../components/SnackAlert/SnackAlert'
import * as Enums from '../../enums'

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
}

const CreateAccountPage = () => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    message: '',
    type: Enums.AlertType.SUCCESS,
    show: false,
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
      })
      // call api
    }
  }

  return (
    <section className=' forms create-account'>
      <div className='form signup'>
        <div className='form-content'>
          <header className='title'>Sign up</header>
          <form onSubmit={handleSubmit}>
            <div className='field '>
              <input
                placeholder='Username'
                value={accountForm.username}
                name='username'
                onChange={handleInputChange}
              />
            </div>
            <div className='field '>
              <input
                type='email'
                placeholder='Email'
                value={accountForm.email}
                name='email'
                onChange={handleInputChange}
              />
            </div>
            <div className='field '>
              <input
                type='password'
                placeholder='Create password'
                className='password'
                value={accountForm.password}
                name='password'
                onChange={handleInputChange}
              />
            </div>
            <div className='field '>
              <input
                type='password'
                placeholder='Confirm password'
                className='password'
                value={accountForm.confirmPassword}
                name='confirmPassword'
                onChange={handleInputChange}
              />
              <i className='bx bx-hide eye-icon'></i>
            </div>
            <div className='field button-field'>
              <button>Signup</button>
            </div>
          </form>
          <div className='form-link'>
            <span>
              Already have an account?{' '}
              <a href='#' className='link login-link'>
                Login
              </a>
            </span>
          </div>
        </div>
        <div className='line'></div>
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
        </div>
      </div>
      <SnackAlert
        show={alertConfig.show}
        onClose={() => setAlertConfig({...alertConfig, show: false})}
        message={alertConfig.message}
        type={alertConfig.type}
      ></SnackAlert>
    </section>
  )
}

export default CreateAccountPage
