import express from 'express'

import { createBooking, getOccupidedSeats } from '../controllers/bookingControles.js'

const bookingRoute = express.Router()


bookingRoute.post('/create',createBooking)

bookingRoute.get('/seats/:showId',getOccupidedSeats)

export default bookingRoute