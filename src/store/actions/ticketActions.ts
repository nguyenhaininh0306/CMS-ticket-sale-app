import db from '../../firebase/config'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore'

const BookingCode = 'ALT' + Number(Math.random().toPrecision(8)) * 100000000

export const createTicket = (data: any) => {
  return async (dispatch: any) => {
    const result = {
      ...data,
      bookingcode: BookingCode,
      name: data.name,
      price: data.price,
      priceCombo: data.priceCombo,
      status: data.status,
      ticketNumber: data.ticketNumber,
      timeUse: data.timeUse,
      timeExpired: data.timeExpired,
    }
    const ticketCollectionRef = collection(db, 'ticketCombo')

    if (data.name === '') {
      alert('Tên gói vé không được để trống')
      return
    }

    if (data) {
      await addDoc(ticketCollectionRef, result)
      dispatch({ type: 'CREATE_TICKET_SUCCESS', payload: result })
    } else {
      dispatch({ type: 'CREATE_TICKET_FAILED' })
    }
  }
}

export const updateTicket = (data: any) => {
  return async (dispatch: any) => {
    const itemTicket = doc(db, 'ticketCombo', data.id)
    console.log(data)

    const result = {
      nameEvent: data.nameEvent,
      price: data.price,
      priceCombo: data.priceCombo,
      status: data.status,
      ticketNumber: data.ticketNumber,
      timeUse: data.timeUse,
      timeExpired: data.timeExpired,
    }

    if (data.id) {
      await updateDoc(itemTicket, {
        ...result,
        id: arrayUnion(data.id),
      })
      dispatch({ type: 'UPDATE_TICKET_SUCCESS', payload: result })
    } else {
      dispatch({ type: 'UPDATE_TICKET_FAILED' })
    }
  }
}
