import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopBuses } from '../actions/busActions'

const BusCarousel = () => {
  const dispatch = useDispatch()

  const busTopRated = useSelector((state) => state.busTopRated)
  const { loading, error, buses } = busTopRated

  useEffect(() => {
    dispatch(listTopBuses())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {buses.map((bus) => (
        <Carousel.Item key={bus._id}>
          <Link to={`/bus/${bus._id}`}>
            <Image src={bus.image} alt={bus.destination} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {bus.destination} (${bus.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BusCarousel
