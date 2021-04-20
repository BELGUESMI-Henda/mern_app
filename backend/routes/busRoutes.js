import express from 'express'
const router = express.Router()
import {
 // getBuses,
  getBusById,
  deleteBus,
  createBus,
  updateBus,
  createBusReview,
  getTopBuses,
  getBuses,
} from '../controllers/busController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBuses).post(protect, admin, createBus)
router.route('/:id/reviews').post(protect, createBusReview)
router.get('/top', getTopBuses)
router
  .route('/:id')
  .get(getBusById)
  .delete(protect, admin, deleteBus)
  .put(protect, admin, updateBus)

export default router
