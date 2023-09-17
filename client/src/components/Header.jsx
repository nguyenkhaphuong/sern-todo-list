import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreateTask } from '../components/components'

const Header = ({ isLoggedIn, handleLogout }) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap bg-slate-600 p-5'>
        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <div className='text-sm lg:flex-grow'>
            <Link
              to='/'
              className='block lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
              Home
            </Link>
            <button
              onClick={openModal}
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
              Create Task
            </button>
            <CreateTask
              isLoggedIn={isLoggedIn}
              showModal={showModal}
              setShowModal={setShowModal}
            />
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
              <>
                <button
                  className='block w-fit lg:inline-block text-md px-4 py-2 border rounded text-white border-white hover:border-transparent hover:bg-red-500 mt-5 lg:mt-0'
                  onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
