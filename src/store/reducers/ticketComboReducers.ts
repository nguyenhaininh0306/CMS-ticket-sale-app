import { COMBO_REQUEST, COMBO_SUCCESS, COMBO_ERROR } from '../types'

const initialState = {
  ticketCombo: [],
  error: '',
  loading: false,
}

const ticketComboReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COMBO_REQUEST:
      return {
        ...state,
      }
    case COMBO_SUCCESS:
      return {
        ...state,
        ticketCombo: action.payload,
        loading: !state.loading,
      }
    case COMBO_ERROR:
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
