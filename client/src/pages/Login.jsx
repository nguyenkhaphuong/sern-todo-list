import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const toastProperty = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  }

  const handleLogin = (e) => {
    e.preventDefault()
    try {
      axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
        email,
        password,
      })
      toast.success('Login Successful', toastProperty)
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Error logging in', toastProperty)
    }
  }

  return (
    <div>
      <div className=' bg-white'>
        <div className='container mx-auto lg:w-1/2 w-3/4 text-center my-24 bg-slate-200 border border-spacing-2 px-5 py-6 rounded-3xl'>
          <h4 className='text-4xl font-semibold mb-2'>Login</h4>
          <span className='text-gray-500'>Login to your account</span>
          <form className='mt-4' method='POST' onSubmit={handleLogin}>
            <div className='form-group mb-4'>
              <input
                className='sm:w-3/4 w-3/4 p-6 rounded-xl'
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                autoComplete='on'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='sm:w-3/4 w-3/4 p-6 rounded-xl'
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                minLength='8'
                required
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='bg-slate-600 p-5 text-white text-lg w-1/2 rounded-xl hover:cursor-pointer'
                type='submit'
                value='Login'
              />
            </div>
            <p>
              Don't have an account?
              <a
                className='text-gray-600 text-md font-medium ml-1'
                href='/register'>
                Register an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
