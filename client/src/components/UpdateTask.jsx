import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { updateTask } from '../redux/slices/taskSlice'

const UpdateTask = ({ showModal, setShowModal, taskId }) => {
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

  const handleUpdateTask = async (e) => {
    e.preventDefault()
    const formData = { title, description, priority, status }
    const token = localStorage.getItem('auth')

    await axios
      .put(`${serverUrl}/tasks/${taskId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const currentTask = result.data
        dispatch(updateTask(currentTask))
        toast.success('Task Updated Successfully', toastProperty)
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

        <form
          className='flex flex-col gap-4'
          method='POST'
          onSubmit={handleUpdateTask}>
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
            value='Update Task'
          />
        </form>
      </div>
    </div>
  )
}

export default UpdateTask
