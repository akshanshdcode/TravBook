import express from 'express';
import { getTrips, addTrip, getSingleTrip } from '../Controllers/tripController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:userId', getTrips);
router.post('/:userId', verifyUser, addTrip);
router.get('/trip/:id', getSingleTrip)

export default router;