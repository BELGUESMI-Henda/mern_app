import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getBookingDetails,
  payBooking,
  confirmBooking,
} from '../actions/bookingActions'
import {
  BOOKING_PAY_RESET,
  BOOKING_CONFIRM_RESET,
} from '../constants/bookingConstants'
//import BookingListScreen from './screens/BookingListScreen'

const BookingScreen = ({ match, history }) => {
  const bookingId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const bookingDetails = useSelector((state) => state.bookingDetails)
  const { booking, loading, error } = bookingDetails

  const bookingPay = useSelector((state) => state.bookingPay)
  const { loading: loadingPay, success: successPay } = bookingPay

  const bookingConfirm = useSelector((state) => state.bookingConfirm)
  const { loading: loadingConfirm, success: successConfirm } = bookingConfirm

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    booking.itemsPrice = addDecimals(
      booking.bookingItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!booking || successPay || successConfirm || booking._id !== bookingId) {
      dispatch({ type: BOOKING_PAY_RESET })
      dispatch({ type: BOOKING_CONFIRM_RESET })
      dispatch(getBookingDetails(bookingId))
    } else if (!booking.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, bookingId, successPay, successConfirm, booking])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payBooking(bookingId, paymentResult))
  }

  const confirmHandler = () => {
    dispatch(confirmBooking(booking))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1> BOOKING {booking._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>TICKET</h2>
              <p>
                <strong>Name: </strong> {booking.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${booking.user.email}`}>{booking.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {booking.ticketAddress.address}, {booking.ticketAddress.city}{' '}
                {booking.ticketAddress.postalCode},{' '}
                {booking.ticketAddress.country}
              </p>
              {booking.confirmed ? (
                <Message variant='success'>
                  Confirmed on {booking.confirmedAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Confirmed</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {booking.paymentMethod}
              </p>
              {booking.isPaid ? (
                <Message variant='success'>Paid on {booking.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Booking Items</h2>
              {booking.bookingItems.length === 0 ? (
                <Message>Booking is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {booking.bookingItems.map((item, index) => (
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
                            {item.destination}
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
                  <Col>${booking.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ticket</Col>
                  <Col>${booking.ticketPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${booking.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${booking.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!booking.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={booking.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingConfirm && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                booking.isPaid &&
                !booking.confirmed && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={confirmHandler}
                    >
                      Booking is confirmed
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default BookingScreen
