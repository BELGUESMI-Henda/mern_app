import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createBooking } from '../actions/bookingActions'
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceBookingScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.ticketAddress.address) {
    history.push('/ticket')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.ticketPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.ticketPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const bookingCreate = useSelector((state) => state.bookingCreate)
  const { booking, success, error } = bookingCreate

  useEffect(() => {
    if (success) {
      history.push(`/booking/${booking._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: BOOKING_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeBookingHandler = () => {
    dispatch(
      createBooking({
        bookingItems: cart.cartItems,
        ticketAddress: cart.ticketAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        ticketPrice: cart.ticketPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>TICKET</h2>
              <p>
                <strong>Address:</strong>
                {cart.ticketAddress.address}, {cart.ticketAddress.city}{' '}
                {cart.ticketAddress.postalCode},{' '}
                {cart.ticketAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Booking Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your booking is not confirmed</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/bus/${item.bus}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Booking Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ticket</Col>
                  <Col>${cart.ticketPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeBookingHandler}
                >
                  Place Booking
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceBookingScreen
