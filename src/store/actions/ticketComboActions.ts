import { REQUEST, SUCCESS, ERROR } from '../types'
import db from '../../firebase/config'

export const fetchREQUEST = () => {
  return {
    type: REQUEST,
  }
}

export const fetchSUCCESS = (ticketCombo: any) => {
  return {
    type: SUCCESS,
    payload: ticketCombo,
  }
}

export const fetchERROR = (error: any) => {
  return {
    type: ERROR,
    payload: error,
  }
}

export const fetchTicketCombo = () => {
  return async (dispatch: any) => {
    dispatch(fetchREQUEST)
    const res = await db.collection('ticketCombo')
    res
      .get()
      .then((response) => {
        const ticketCombos: any = []
        response.docs.forEach((item) => {
          ticketCombos.push({ ...item.data(), id: item.id })
        })
        dispatch(fetchSUCCESS(ticketCombos))
      })
      .catch((err) => {
        dispatch(fetchERROR(err.message))
      })
  }
}
