import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slices/userSlice'

const Register = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
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

  const handleRegister = (e) => {
    e.preventDefault()
    try {
      axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
        username,
        email,
        password,
      })
      dispatch(
        addUser({ username: username, email: email, password: password })
      )
      toast.success('Registration Successful', toastProperty)
      navigate('/login')
    } catch (err) {
      console.log(err)
      toast.error('Error registering user', toastProperty)
    }
  }

  return (
    <div>
      <div className=' bg-white'>
        <div className='container mx-auto lg:w-1/2 w-3/4 text-center my-24 bg-slate-200 border border-spacing-2 px-5 py-6 rounded-3xl'>
          <h4 className='text-4xl font-semibold mb-2'>Register</h4>
          <span className='text-gray-500'>Register a new account</span>
          <form className='mt-4' method='POST' onSubmit={handleRegister}>
            <div className='form-group mb-4'>
              <input
                className='sm:w-3/4 w-3/4 p-6 rounded-xl'
                type='Username'
                name='Username'
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='sm:w-3/4 w-3/4 p-6 rounded-xl'
                type='email'
                name='email'
                value={email}
                placeholder='Email'
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
                className='bg-slate-600 p-5 hover:cursor-pointer text-white text-lg w-1/2 rounded-xl'
                type='submit'
                value='Register'
              />
            </div>
            <p>
              Already have an account?
              <a
                className='text-gray-600 text-md font-medium ml-1'
                href='/login'>
                Login to your account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
