import { REQUEST, SUCCESS, ERROR } from '../types'

const initialState = {
  ticketCombo: [],
  error: '',
  loading: true,
}

const ticketComboReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
      }
    case SUCCESS:
      return {
        ...state,
        ticketCombo: action.payload,
        loading: false,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        ticketCombo: [],
      }

    default:
      return state
  }
}

export default ticketComboReducer
