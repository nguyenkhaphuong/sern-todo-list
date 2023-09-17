import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (_state, action) => {
      return action.payload
    },
    addTask: (state, action) => {
      state.push(action.payload)
    },
    updateTask: (state, action) => {
      const { id, title, description, priority, status } = action.payload
      const existingTask = state.find((task) => task.id === id)
      if (existingTask) {
        existingTask.title = title
        existingTask.description = description
        existingTask.priority = priority
        existingTask.status = status
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload
      const index = state.findIndex((task) => task.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { setTasks, addTask, deleteTask, updateTask } = taskSlice.actions

export default taskSlice.reducer
