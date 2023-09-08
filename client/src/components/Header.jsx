import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Header = ({ setIsLoggedIn, isLoggedIn }) => {
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

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      axios.get(`${import.meta.env.VITE_BASE_URL}/logout`)
      toast.success('Logout Successful', toastProperty)
      setIsLoggedIn(false)
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error('Error logging out', toastProperty)
    }
  }

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-slate-600 p-5'>
        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <div className='text-sm lg:flex-grow'>
            <a
              href='/'
              className='block lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
              Home
            </a>
            <a
              href='#'
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
              Create Task
            </a>
            {!isLoggedIn ? (
              <>
                <a
                  href='/register'
                  className='block lg:inline-block text-md text-white border-white mt-4 mr-4 lg:mt-0'>
                  Register
                </a>
                <a
                  href='/login'
                  className='block w-fit lg:inline-block text-md px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-slate-600 hover:bg-white mt-5 lg:mt-0'>
                  Login
                </a>
              </>
            ) : (
              <button
                className='block w-fit lg:inline-block text-md px-4 py-2 border rounded text-white border-white hover:border-transparent hover:bg-red-500 mt-5 lg:mt-0'
                onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
