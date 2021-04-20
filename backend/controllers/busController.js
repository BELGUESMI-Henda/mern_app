import asyncHandler from 'express-async-handler'
import Bus from '../models/busModel.js'

// @desc    Fetch all buses
// @route   GET /api/buses
// @access  Public
const getBuses = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Bus.countDocuments({ ...keyword })
  const buses = await Bus.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ buses, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single bus
// @route   GET /api/buses/:id
// @access  Public
const getBusById = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id)

  if (bus) {
    res.json(bus)
  } else {
    res.status(404)
    throw new Error('Bus not found')
  }
})

// @desc    Delete a bus
// @route   DELETE /api/buses/:id
// @access  Private/Admin
const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id)

  if (bus) {
    await bus.remove()
    res.json({ message: 'Bus removed' })
  } else {
    res.status(404)
    throw new Error('Bus not found')
  }
})

// @desc    Create a bus
// @route   POST /api/buses
// @access  Private/Admin
const createBus = asyncHandler(async (req, res) => {
  const bus = new Bus({
    destination: ' bus destination',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    seats: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdBus = await bus.save()
  res.status(201).json(createdBus)
})

// @desc    Update a bus
// @route   PUT /api/buses/:id
// @access  Private/Admin
const updateBus = asyncHandler(async (req, res) => {
  const {
    destination,
    price,
    description,
    image,
    brand,
    category,
    seats,
  } = req.body

  const bus = await Bus.findById(req.params.id)

  if (bus) {
    bus.destination = destination
    bus.price = price
    bus.description = description
    bus.image = image
    bus.brand = brand
    bus.category = category
    bus.seats = seats

    const updatedBus = await bus.save()
    res.json(updatedBus)
  } else {
    res.status(404)
    throw new Error('BUS not found')
  }
})

// @desc    Create new review
// @route   POST /api/buses/:id/reviews
// @access  Private
const createBusReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const bus = await Bus.findById(req.params.id)

  if (bus) {
    const alreadyReviewed = bus.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('BUS already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    bus.reviews.push(review)

    bus.numReviews = bus.reviews.length

    bus.rating =
      bus.reviews.reduce((acc, item) => item.rating + acc, 0) /
      bus.reviews.length

    await bus.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('BUS not found')
  }
})

// @desc    Get top rated buses
// @route   GET /api/buses/top
// @access  Public
const getTopBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find({}).sort({ rating: -1 }).limit(3)

  res.json(buses)
})

export {
  getBuses,
  getBusById,
  deleteBus,
  createBus,
  updateBus,
  createBusReview,
  getTopBuses,
}
