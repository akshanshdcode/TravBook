import express from 'express'
import { createBooking, getAllBooking, getBooking, getBookingsByUserId, getBookingsByProviderId } from '../Controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/', getAllBooking)
router.get('/:id', getBookingsByUserId)
router.get('/provider/:id', getBookingsByProviderId)

export default router