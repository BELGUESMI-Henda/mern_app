import axios from 'axios'
import {
  BUS_LIST_REQUEST,
  BUS_LIST_SUCCESS,
  BUS_LIST_FAIL,
  BUS_DETAILS_REQUEST,
  BUS_DETAILS_SUCCESS,
  BUS_DETAILS_FAIL,
  BUS_DELETE_SUCCESS,
  BUS_DELETE_REQUEST,
  BUS_DELETE_FAIL,
  BUS_CREATE_REQUEST,
  BUS_CREATE_SUCCESS,
  BUS_CREATE_FAIL,
  BUS_UPDATE_REQUEST,
  BUS_UPDATE_SUCCESS,
  BUS_UPDATE_FAIL,
  BUS_CREATE_REVIEW_REQUEST,
  BUS_CREATE_REVIEW_SUCCESS,
  BUS_CREATE_REVIEW_FAIL,
  BUS_TOP_REQUEST,
  BUS_TOP_SUCCESS,
  BUS_TOP_FAIL,
} from '../constants/busConstants'
import { logout } from './userActions'

export const listBuses = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BUS_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/buses?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: BUS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BUS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBusDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BUS_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/buses/${id}`)

    dispatch({
      type: BUS_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BUS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBus = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/buses/${id}`, config)

    dispatch({
      type: BUS_DELETE_SUCCESS,
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
      type: BUS_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createBus = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/buses`, {}, config)

    dispatch({
      type: BUS_CREATE_SUCCESS,
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
      type: BUS_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateBus = (bus) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUS_UPDATE_REQUEST,
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
      `/api/buses/${bus._id}`,
      bus,
      config
    )

    dispatch({
      type: BUS_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: BUS_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BUS_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createBusReview = (busId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BUS_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/buses/${busId}/reviews`, review, config)

    dispatch({
      type: BUS_CREATE_REVIEW_SUCCESS,
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
      type: BUS_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopBuses = () => async (dispatch) => {
  try {
    dispatch({ type: BUS_TOP_REQUEST })

    const { data } = await axios.get(`/api/buses/top`)

    dispatch({
      type: BUS_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BUS_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
