import { FAMILY_REQUEST, FAMILY_SUCCESS, FAMILY_ERROR } from '../types'
import db from '../../firebase/config'

export const fetchFamilyREQUEST = () => {
  return {
    type: FAMILY_REQUEST,
  }
}

export const fetchFamilySUCCESS = (tickets: any) => {
  return {
    type: FAMILY_SUCCESS,
    payload: tickets,
  }
}

export const fetchFamilyERROR = (error: any) => {
  return {
    type: FAMILY_ERROR,
    payload: error,
  }
}

export const fetchTickets = () => {
  return async (dispatch: any) => {
    dispatch(fetchFamilyREQUEST)
    const res = await db.collection('ticket')
    res
      .get()
      .then((response) => {
        const tickets: any = []
        response.docs.forEach((item) => {
          tickets.push({ ...item.data(), id: item.id })
        })
        dispatch(fetchFamilySUCCESS(tickets))
      })
      .catch((error) => {
        dispatch(fetchFamilyERROR(error.message))
      })
  }
}
