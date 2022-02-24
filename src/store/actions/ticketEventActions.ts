import { EVENT_REQUEST, EVENT_SUCCESS, EVENT_ERROR } from '../types'
import db from '../../firebase/config'

export const fetchEventREQUEST = () => {
  return {
    type: EVENT_REQUEST,
  }
}

export const fetchEventSUCCESS = (tickets: any) => {
  return {
    type: EVENT_SUCCESS,
    payload: tickets,
  }
}

export const fetchEventERROR = (error: any) => {
  return {
    type: EVENT_ERROR,
    payload: error,
  }
}

export const fetchTicketsEvent = () => {
  return async (dispatch: any) => {
    dispatch(fetchEventREQUEST)
    const res = await db.collection('ticketEvent')
    res
      .get()
      .then((response) => {
        const tickets: any = []
        response.docs.forEach((item) => {
          tickets.push({ ...item.data(), id: item.id })
        })
        dispatch(fetchEventSUCCESS(tickets))
      })
      .catch((error) => {
        dispatch(fetchEventERROR(error.message))
      })
  }
}
