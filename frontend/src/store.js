import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  busListReducer,
  busDetailsReducer,
  busDeleteReducer,
  busCreateReducer,
  busUpdateReducer,
  busReviewCreateReducer,
  busTopRatedReducer,
} from './reducers/busReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingConfirmReducer,
  bookingListMyReducer,
  bookingListReducer,
} from './reducers/bookingReducers'

const reducer = combineReducers({
  busList: busListReducer,
  busDetails: busDetailsReducer,
  busDelete: busDeleteReducer,
  busCreate: busCreateReducer,
  busUpdate: busUpdateReducer,
  busReviewCreate: busReviewCreateReducer,
  busTopRated: busTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingConfirm: bookingConfirmReducer,
  bookingListMy: bookingListMyReducer,
  bookingList: bookingListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const ticketAddressFromStorage = localStorage.getItem('ticketAddress')
  ? JSON.parse(localStorage.getItem('ticketAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    ticketAddress: ticketAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
