import React from 'react'
import { ToDoList } from '../components/components'

const Home = ({ isLoggedIn }) => {
  return (
    <div className='p-5'>
      {isLoggedIn ? (
        <>
          <h1 className='lg:text-5xl font-bold py-2 md:text-4xl sm:text-3xl'>
            Dashboard
          </h1>
          <ToDoList />
        </>
      ) : (
        <h1 className='lg:text-5xl font-bold py-2 5d:text-4xl sm:text-3xl'>
          Please sign in to continue
        </h1>
      )}
    </div>
  )
}

export default Home
