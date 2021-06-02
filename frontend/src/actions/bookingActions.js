import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_REQUEST,
  BOOKING_PAY_FAIL,
  BOOKING_PAY_SUCCESS,
  BOOKING_PAY_REQUEST,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_REQUEST,
  BOOKING_CONFIRM_FAIL,
  BOOKING_CONFIRM_SUCCESS,
  BOOKING_CONFIRM_REQUEST,
} from '../constants/bookingConstants'
import { logout } from './userActions'

export const createBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/buses`, booking , config)

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getBookingDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bookings/${id}`, config)

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payBooking = (bookingId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKING_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/bookings/${bookingId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: BOOKING_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_PAY_FAIL,
      payload: message,
    })
  }
}

export const confirmBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CONFIRM_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/bookings/${booking._id}/confirm`,
      {},
      config
    )

    dispatch({
      type: BOOKING_CONFIRM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_CONFIRM_FAIL,
      payload: message,
    })
  }
}

export const listMyBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bookings/mybookings`, config)

    dispatch({
      type: BOOKING_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bookings`, config)

    dispatch({
      type: BOOKING_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: message,
    })
  }
}
