import React, { useState, useEffect } from 'react'

const Home = ({ isLoggedIn }) => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('normal' || 'high' || 'medium')
  const [status, setStatus] = useState('Todo' || 'Done')

  useEffect(() => {}, [])

  return (
    <div className='p-5'>
      {isLoggedIn ? (
        <h1 className='lg:text-5xl font-bold p-6 md:text-4xl sm:text-3xl'>
          Dashboard
        </h1>
      ) : (
        <h1 className='lg:text-5xl font-bold p-6 md:text-4xl sm:text-3xl'>
          Please sign in to continue
        </h1>
      )}
    </div>
  )
}

export default Home
