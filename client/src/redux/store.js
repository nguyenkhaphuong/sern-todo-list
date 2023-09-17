import { configureStore } from '@reduxjs/toolkit'
import { authReducer, tasksReducer, userReducer } from './slices/slices'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
})

export default store
