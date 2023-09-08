import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import { Home, Login, Register, NotFound } from './pages/pages'
import { Header, Footer } from './components/components'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/`)
      .then((_response) => {
        const token = localStorage.getItem('token')
        if (token) {
          setIsLoggedIn(response.data.isLoggedIn)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path='/' element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path='/login'
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
