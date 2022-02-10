import { REQUEST, SUCCESS, ERROR } from '../types'

const initialState = {
  loading: true,
  error: '',
  ticketsEvent: [],
}

const ticketEventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
      }
    case SUCCESS:
      return {
        ...state,
        loading: false,
        ticketsEvent: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        ticketsEvent: [],
      }

    default:
      return state
  }
}

export default ticketEventReducer
