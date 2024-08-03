import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour, getTourByProvider } from '../Controllers/tourControllers.js'

import { verifyAdmin, verifyProvider } from '../utils/verifyToken.js'

const router = express.Router()

//Create new tour 
router.post('/:id',verifyProvider, createTour)

//getTourByProvider
router.get('/provider/:id', getTourByProvider)

//Update tour 
router.put('/:id', verifyAdmin, updateTour)

//Delete tour 
router.delete('/:id', deleteTour)

//Get single tour 
router.get('/:id', getSingleTour)

//Get all tour 
router.get('/', getAllTour)

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getFeaturedTour", getFeaturedTour)
router.get("/search/getTourCount", getTourCount)




export default router