import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ToDoList = () => {
  const [tasks, setTasks] = useState([])

  const serverUrl = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${serverUrl}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` },
      })
      setTasks(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='p-5'>
      {tasks.map((task) => (
        <>
          <div key={task.id}>{task.title}</div>
          <div>{task.description}</div>
          <div>{task.priority}</div>
          <div>{task.status}</div>
        </>
      ))}
    </div>
  )
}

export default ToDoList
