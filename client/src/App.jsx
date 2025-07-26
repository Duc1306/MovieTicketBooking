import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeaLayout from './pages/SeaLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeaLayout/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/favorite' element={<Favorite/>} />
      </Routes>
    </>
  )
}

export default App