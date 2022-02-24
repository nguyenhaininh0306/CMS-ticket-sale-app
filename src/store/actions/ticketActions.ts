import db from '../../firebase/config'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

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
      toast.success('Add ticket success')
    } else {
      dispatch({ type: 'CREATE_TICKET_FAILED' })
      toast.error('Add ticket failed')
    }
  }
}

export const updateTicket = (data: any) => {
  return async (dispatch: any) => {
    const itemTicket = doc(db, 'ticketCombo', data.id)
    // console.log(data)

    const result = {
      price: data.price,
      priceCombo: data.priceCombo,
      status: data.status,
      ticketNumber: data.ticketNumber,
      timeUse: data.timeUse,
      timeExpired: data.timeExpired,
    }

    if (data.id) {
      await updateDoc(itemTicket, result)
      dispatch({ type: 'UPDATE_TICKET_SUCCESS', payload: result })
      toast.success('Update done !!!')
    } else {
      dispatch({ type: 'UPDATE_TICKET_FAILED' })
      toast.error('Update failed !!!')
    }
  }
}

export const updateTicketFamily = (data: any) => {
  return async (dispatch: any) => {
    const itemTicketFamily = doc(db, 'ticket', data.id)

    const result = {
      ticketDate: data.ticketDate,
    }

    if (data.id) {
      await updateDoc(itemTicketFamily, result)
      dispatch({ type: 'UPDATE_TICKET_FAMILY_SUCCESS', payload: result })
      toast.success('Update done !!!')
    } else {
      dispatch({ type: 'UPDATE_TICKET_FAMILY_FAILED' })
      toast.error('Update failed !!!')
    }
  }
}

export const updateTicketEvent = (data: any) => {
  return async (dispatch: any) => {
    const itemTicketEvent = doc(db, 'ticketEvent', data.id)

    const result = {
      ticketDate: data.ticketDate,
    }

    if (data.id) {
      await updateDoc(itemTicketEvent, result)
      dispatch({ type: 'UPDATE_TICKET_EVENT_SUCCESS', payload: result })
      toast.success('Update done !!!')
    } else {
      dispatch({ type: 'UPDATE_TICKET_EVENT_FAILED' })
      toast.error('Update failed !!!')
    }
  }
}
