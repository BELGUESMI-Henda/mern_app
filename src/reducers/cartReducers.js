import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_TICKET_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], ticketAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.bus === item.bus)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.bus === existItem.bus ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.bus !== action.payload),
      }
    case CART_SAVE_TICKET_ADDRESS:
      return {
        ...state,
        ticketAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
