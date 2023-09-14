import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className='bg-white'>
        <div className='container mx-auto lg:w-1/2 md:w-3/4 sm:w-3/4 text-center my-24 bg-slate-200 border border-spacing-2 px-5 py-6 rounded-3xl'>
          <h4 className='text-4xl font-semibold mb-2'>Login</h4>
          <span className='text-gray-500'>Login to your account</span>
          <form
            className='mt-4'
            method='POST'
            onSubmit={(e) => handleLogin({ email, password }, e)}>
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
            <p className='sm:text-md md:text-md lg:text-lg'>
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
