import { COMBO_REQUEST, COMBO_SUCCESS, COMBO_ERROR } from '../types'
import db from '../../firebase/config'
import moment from 'moment'

export const fetchComboREQUEST = () => {
  return {
    type: COMBO_REQUEST,
  }
}

export const fetchComboSUCCESS = (ticketCombo: any) => {
  return {
    type: COMBO_SUCCESS,
    payload: ticketCombo,
    loading: false,
  }
}

export const fetchComboERROR = (error: any) => {
  return {
    type: COMBO_ERROR,
    payload: error,
  }
}

export const fetchTicketCombo = () => {
  return async (dispatch: any) => {
    dispatch(fetchComboREQUEST)
    const res = await db.collection('ticketCombo')
    res
      .get()
      .then((response) => {
        const ticketCombos: any = []
        response.docs.forEach((item) => {
          ticketCombos.push({ ...item.data(), id: item.id })
        })
        dispatch(fetchComboSUCCESS(ticketCombos))
      })
      .catch((err) => {
        dispatch(fetchComboERROR(err.message))
      })
  }
}
