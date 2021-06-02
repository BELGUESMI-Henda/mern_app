import {
  BUS_LIST_REQUEST,
  BUS_LIST_SUCCESS,
  BUS_LIST_FAIL,
  BUS_DETAILS_REQUEST,
  BUS_DETAILS_SUCCESS,
  BUS_DETAILS_FAIL,
  BUS_DELETE_REQUEST,
  BUS_DELETE_SUCCESS,
  BUS_DELETE_FAIL,
  BUS_CREATE_RESET,
  BUS_CREATE_FAIL,
  BUS_CREATE_SUCCESS,
  BUS_CREATE_REQUEST,
  BUS_UPDATE_REQUEST,
  BUS_UPDATE_SUCCESS,
  BUS_UPDATE_FAIL,
  BUS_UPDATE_RESET,
  BUS_CREATE_REVIEW_REQUEST,
  BUS_CREATE_REVIEW_SUCCESS,
  BUS_CREATE_REVIEW_FAIL,
  BUS_CREATE_REVIEW_RESET,
  BUS_TOP_REQUEST,
  BUS_TOP_SUCCESS,
  BUS_TOP_FAIL,
} from '../constants/busConstants'

export const busListReducer = (state = { buses: [] }, action) => {
  switch (action.type) {
    case BUS_LIST_REQUEST:
      return { loading: true, buses: [] }
    case BUS_LIST_SUCCESS:
      return {
        loading: false,
        buses: action.payload.buses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case BUS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const busDetailsReducer = (
  state = { bus: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BUS_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BUS_DETAILS_SUCCESS:
      return { loading: false, bus: action.payload }
    case BUS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const busDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_DELETE_REQUEST:
      return { loading: true }
    case BUS_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BUS_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const busCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_CREATE_REQUEST:
      return { loading: true }
    case BUS_CREATE_SUCCESS:
      return { loading: false, success: true, bus: action.payload }
    case BUS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BUS_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const busUpdateReducer = (state = { bus: {} }, action) => {
  switch (action.type) {
    case BUS_UPDATE_REQUEST:
      return { loading: true }
    case BUS_UPDATE_SUCCESS:
      return { loading: false, success: true, bus: action.payload }
    case BUS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BUS_UPDATE_RESET:
      return { bus: {} }
    default:
      return state
  }
}

export const busReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUS_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case BUS_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BUS_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case BUS_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const busTopRatedReducer = (state = { buses: [] }, action) => {
  switch (action.type) {
    case BUS_TOP_REQUEST:
      return { loading: true, buses: [] }
    case BUS_TOP_SUCCESS:
      return { loading: false, buses: action.payload }
    case BUS_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
