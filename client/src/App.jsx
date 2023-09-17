import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Home, Login, Register, NotFound } from './pages/pages'
import { Header, Footer } from './components/components'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useSelector, useDispatch } from 'react-redux'

import { login, logout } from './redux/slices/authSlice'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  useEffect(() => {
    const storedAuthState = localStorage.getItem('auth')
    if (storedAuthState) {
      dispatch(login())
    }
  }, [dispatch])

  const handleLogin = async ({ email, password }, e) => {
    e.preventDefault()

    await axios
      .post(`${serverUrl}/login`, {
        email,
        password,
      })
      .then((result) => {
        localStorage.setItem('auth', result.data.token)
        toast.success('Login Successful', toastProperty)
        dispatch(login())
        navigate('/')
      })
      .catch((err) => {
        toast.error('Error logging in', toastProperty)
        console.error(err.response)
      })
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await axios.get(`${serverUrl}/logout`)
      dispatch(logout())
      toast.success('Logout Successful', toastProperty)
      navigate('/login')
      localStorage.removeItem('auth')
    } catch (error) {
      console.log(error)
      toast.error('Error logging out', toastProperty)
    }
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home tasks={tasks} isLoggedIn={isLoggedIn} />}
        />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
