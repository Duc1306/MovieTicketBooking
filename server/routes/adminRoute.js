import express from 'express'
import { protectAdmin } from '../middleware/auth.js'
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controllers/adminControlles.js'

const adminRoute = express.Router()

adminRoute.get('/is-admin',protectAdmin,isAdmin)
adminRoute.get('dashboard',protectAdmin,getDashboardData)
adminRoute.get('/all-shows',protectAdmin,getAllShows)
adminRoute.get('/all-bookings',protectAdmin, getAllBookings)

export default adminRoute

