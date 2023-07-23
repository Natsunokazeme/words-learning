import './CreateAccountPage.scss'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'

const CreateAccountPage = () => {
  //todo api call
  return (
    <section className=' forms create-account'>
      {/* <div className='form login'>
        <div className='form-content'>
          <header>Login</header>
          <form action='#'>
            <div className='field input-field'>
              <input type='email' placeholder='Email' className='input' />
            </div>
            <div className='field input-field'>
              <input
                type='password'
                placeholder='Password'
                className='password'
              />
              <i className='bx bx-hide eye-icon'></i>
            </div>
            <div className='form-link'>
              <a href='#' className='forgot-pass'>
                Forgot password?
              </a>
            </div>
            <div className='field button-field'>
              <button>Login</button>
            </div>
          </form>
          <div className='form-link'>
            <span>
              Don't have an account?{' '}
              <a href='#' className='link signup-link'>
                Signup
              </a>
            </span>
          </div>
        </div>
        <div className='line'></div>
        <div className='media-options'>
          <a href='#' className='field facebook'>
            <i className='bx bxl-facebook facebook-icon'></i>
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className='media-options'>
          <a href='#' className='field google'>
            <img src='#' alt='' className='google-img' />
            <span>Login with Google</span>
          </a>
        </div>
      </div> */}
      {/* <!-- Signup Form --> */}
      <div className='form signup'>
        <div className='form-content'>
          <header>Signup</header>
          <form action='#'>
            <div className='field input-field'>
              <input type='email' placeholder='Email' className='input' />
            </div>
            <div className='field input-field'>
              <input
                type='password'
                placeholder='Create password'
                className='password'
              />
            </div>
            <div className='field input-field'>
              <input
                type='password'
                placeholder='Confirm password'
                className='password'
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
    </section>
  )
}

export default CreateAccountPage
