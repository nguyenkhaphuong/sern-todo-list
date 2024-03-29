import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { addTask } from '../redux/slices/taskSlice'

const CreateTask = ({ isLoggedIn, showModal, setShowModal }) => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [priority, setPriority] = React.useState('normal' || 'high' || 'medium')
  const [status, setStatus] = React.useState('To do' || 'Done')

  const dispatch = useDispatch()

  const serverUrl = import.meta.env.VITE_SERVER_URL

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

  if (!showModal) {
    return null
  }

  const createTask = async (e) => {
    e.preventDefault()
    const formData = { title, description, priority, status }
    const token = localStorage.getItem('auth')

    await axios
      .post(`${serverUrl}/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const newTask = result.data
        dispatch(addTask(newTask))
        toast.success('Task Added Successfully', toastProperty)
        setShowModal(false)
      })
      .catch((err) => {
        toast.error('Failed to add task', toastProperty)
        console.error(err.response)
      })
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
      <div className='container p-5 bg-slate-200 rounded shadow-lg w-3/4 mx-auto'>
        <button
          onClick={() => setShowModal(false)}
          className='text-lg mb-4 self-end text-red-600 font-bold'>
          ❌Close
        </button>
        {isLoggedIn ? (
          <form
            className='flex flex-col gap-4'
            method='POST'
            onSubmit={createTask}>
            <div className='form-group mb-4'>
              <input
                className='w-full p-6 rounded-xl'
                type='text'
                name='title'
                value={title}
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='w-full p-6 rounded-xl'
                type='text'
                name='description'
                value={description}
                placeholder='Task Description'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='w-full p-6 rounded-xl'
                type='text'
                name='priority'
                value={priority}
                placeholder='Priority'
                onChange={(e) => setPriority(e.target.value)}
                required
              />
            </div>
            <div className='form-group mb-4'>
              <input
                className='w-full p-6 rounded-xl'
                type='text'
                name='status'
                value={status}
                placeholder='Task Status'
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
            <input
              className='bg-slate-600 text-lg text-white w-full p-5 rounded-xl hover:cursor-pointer'
              type='submit'
              value='Create Task'
            />
          </form>
        ) : (
          <h1 className='text-xl'>You must be logged in to create a task.</h1>
        )}
      </div>
    </div>
  )
}

export default CreateTask
