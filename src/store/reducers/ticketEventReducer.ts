import { EVENT_REQUEST, EVENT_SUCCESS, EVENT_ERROR } from '../types'

const initialState = {
  loading: true,
  error: '',
  ticketsEvent: [],
}

const ticketEventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EVENT_REQUEST:
      return {
        ...state,
      }
    case EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ticketsEvent: action.payload,
      }
    case EVENT_ERROR:
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
