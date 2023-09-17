import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setTasks } from '../redux/slices/taskSlice'

const ToDoList = ({ tasks }) => {
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

  return (
    <div className='mt-4'>
      <table className='border-2 p-5'>
        <thead className='bg-slate-600 text-white'>
          <tr>
            <th className='px-4 py-2'>Task</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Priority</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <tbody key={task.id}>
              <tr>
                <td className='p-2'>{task.title}</td>
                <td className='p-2'>{task.description}</td>
                <td className='p-2'>{task.priority}</td>
                <td className='p-2'>{task.status}</td>
                <td className='p-2'>
                  <button className='mr-2 border-none bg-slate-400'>✏</button>
                  <button className='mr-2 border-none bg-slate-400'>❌</button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default ToDoList
