import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { UpdateTask } from '../components/components'
import { setTasks, deleteTask } from '../redux/slices/taskSlice'

const ToDoList = ({ tasks }) => {
  const [taskIdToUpdate, setTaskIdToUpdate] = React.useState(null)

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

  const openModal = (taskId) => {
    setTaskIdToUpdate(taskId)
  }

  const closeModal = () => {
    setTaskIdToUpdate(null)
  }

  const dispatch = useDispatch()
  const serverUrl = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const token = localStorage.getItem('auth')

    try {
      const res = await axios.get(`${serverUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(setTasks(res.data))
    } catch (error) {
      console.error(error.response)
    }
  }

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('auth')

    await axios
      .delete(`${serverUrl}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success('Task Deleted Successfully', toastProperty)
        dispatch(deleteTask(id))
      })
      .catch((error) => {
        toast.error('Error deleting task', toastProperty)
        console.error(error.response)
      })
  }

  return (
    <div className='mt-4'>
      <table className='border-2 p-5'>
        <thead className='bg-slate-600 text-white'>
          <tr>
            <th className='border-2 px-4 py-2'>Task</th>
            <th className='border-2 px-4 py-2'>Description</th>
            <th className='border-2 px-4 py-2'>Priority</th>
            <th className='border-2 px-4 py-2'>Status</th>
            <th className='border-2 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <tbody className='border-2' key={task.id}>
              <tr>
                <td className='border-2 p-2'>{task.title}</td>
                <td className='border-2 p-2'>{task.description}</td>
                <td className='border-2 p-2'>{task.priority}</td>
                <td className='border-2 p-2'>{task.status}</td>
                <td className='border-2 p-2'>
                  <button
                    onClick={() => openModal(task.id)}
                    className='p-2 mr-2 border-none bg-slate-400 hover:bg-slate-500'>
                    ✏
                  </button>
                  {taskIdToUpdate === task.id && (
                    <UpdateTask
                      showModal={true}
                      setShowModal={closeModal}
                      taskId={task.id}
                    />
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className='p-2 mr-2 border-none bg-slate-400 hover:bg-slate-500'>
                    ❌
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default ToDoList
