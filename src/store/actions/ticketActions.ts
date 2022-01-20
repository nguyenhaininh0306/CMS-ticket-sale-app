import { REQUEST, SUCCESS, ERROR } from '../types'
import db from '../../firebase/config'

export const fetchREQUEST = () => {
  return {
    type: REQUEST,
  }
}

export const fetchSUCCESS = (tickets: any) => {
  return {
    type: SUCCESS,
    payload: tickets,
  }
}

export const fetchERROR = (error: any) => {
  return {
    type: ERROR,
    payload: error,
  }
}

export const fetchTickets = () => {
  return async (dispatch: any) => {
    dispatch(fetchREQUEST)
    const res = await db.collection('ticket')
    res
      .get()
      .then((response) => {
        const tickets: any = []
        response.docs.forEach((item) => {
          tickets.push(item.data())
        })
        dispatch(fetchSUCCESS(tickets))
      })
      .catch((error) => {
        dispatch(fetchERROR(error.message))
      })
  }
}
