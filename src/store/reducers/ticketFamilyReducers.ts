import { REQUEST, SUCCESS, ERROR } from '../types'

const initialState = {
  loading: true,
  error: '',
  tickets: [],
}

const ticketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
      }
    case SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        tickets: [],
      }

    default:
      return state
  }
}

export default ticketReducer
