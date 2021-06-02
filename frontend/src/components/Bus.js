import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Bus = ({ bus }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/bus/${bus._id}`}>
        <Card.Img src={bus.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/bus/${bus._id}`}>
          <Card.Title as='div'>
            <strong>{bus.destination}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={bus.rating}
            text={`${bus.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${bus.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Bus
