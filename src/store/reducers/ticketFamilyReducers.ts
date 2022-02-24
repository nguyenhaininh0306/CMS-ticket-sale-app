import { FAMILY_REQUEST, FAMILY_SUCCESS, FAMILY_ERROR } from '../types'

const initialState = {
  loading: true,
  error: '',
  tickets: [],
}

const ticketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FAMILY_REQUEST:
      return {
        ...state,
      }
    case FAMILY_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload,
      }
    case FAMILY_ERROR:
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
