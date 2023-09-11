import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addUser } = userSlice.actions

export default userSlice.reducer
