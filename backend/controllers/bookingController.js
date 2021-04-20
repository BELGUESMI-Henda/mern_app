import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const addBookingItems = asyncHandler(async (req, res) => {
  const {
    bookingItems,
    ticketAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    ticketPrice,
    totalPrice,
  } = req.body

  if (bookingItems && bookingItems.length === 0) {
    res.status(400)
    throw new Error('No booking ')
    return
  } else {
    const booking = new Booking({
      bookingItems,
      user: req.user._id,
      ticketAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      ticketPrice,
      totalPrice,
    })

    const createdBooking = await booking.save()

    res.status(201).json(createdBooking)
  }
})

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (booking) {
    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Update booking to paid
// @route   GET /api/bookings/:id/pay
// @access  Private
const updateBookingToPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isPaid = true
    booking.paidAt = Date.now()
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Update booking
// @route   GET /api/booking/:id/user
// @access  Private/Admin
const updateBookingConfirmed = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isConfirmed = true
    booking.confirmedAt = Date.now()

    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Get logged in user bookings
// @route   GET /api/booking/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
  res.json(bookings)
})

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({}).populate('user', 'id name')
  res.json(bookings)
})

export {
  addBookingItems,
  getBookingById,
  updateBookingToPaid,
  updateBookingConfirmed,
  getMyBookings,
  getBookings,
}
