import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Checkbox, TimePicker, DatePicker, Select } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import './AddTicket.scss'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import db from '../../firebase/config'

const AddTicket = (props: any) => {
  const [disable, setDisable] = useState(true)
  const { Option } = Select
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [timeUse, setTimeUse] = useState('')
  const [timeExpired, setTimeExpired] = useState('')
  const [price, setPrice] = useState(0)
  const [priceCombo, setPriceCombo] = useState(0)
  const [status, setStatus] = useState('Đang sử dụng')
  const [ticketNumber, setTicketNumber] = useState(0)

  const ticketCollectionRef = collection(db, 'ticketCombo')
  const BookingCode = 'ALT' + Number(Math.random().toPrecision(8)) * 100000000

  const addTicket = async () => {
    if (name === '') {
      alert('Tên gói vé không được để trống')
      return
    }
    await addDoc(ticketCollectionRef, {
      name: name,
      bookingcode: BookingCode,
      price: price,
      priceCombo: priceCombo,
      status: status,
      ticketNumber: ticketNumber,
      timeUse: timeUse,
      timeExpired: timeExpired,
    })
    navigate('/setting/service')
    props.onHide()
  }

  const handleHideModal = () => {
    props.onHide()
  }

  const handleChange = (value: String) => {
    console.log(`selected ${value}`)
  }

  const changeDisable = (e: any) => {
    if (e.target.checked === true) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      dialogClassName='my-modal'
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div className='title'>Thêm gói vé</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='name-ticket'>
          <div className='title'>
            Tên gói vé <span>*</span>
          </div>
          <input
            type='text'
            placeholder='Nhập tên gói vé'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='day'>
          <div className='day-use'>
            <div className='title'>Ngày áp dụng</div>
            <div className='day-picker'>
              <DatePicker placeholder='dd/mm/yy' />
              <TimePicker placeholder='hh:mm:ss' />
            </div>
          </div>
          <div className='day-use'>
            <div className='title'>Ngày hết hạn</div>
            <div className='day-picker'>
              <DatePicker placeholder='dd/mm/yy' />
              <TimePicker placeholder='hh:mm:ss' />
            </div>
          </div>
        </div>

        <div className='price'>
          <div className='title'>Giá vé áp dụng</div>
          <Checkbox onChange={changeDisable}>
            Vé lẻ (vnđ/vé) với giá{' '}
            <input
              type='number'
              placeholder='Giá vé'
              disabled={disable}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />{' '}
            / vé
          </Checkbox>
          <Checkbox onChange={changeDisable}>
            Combo vé với giá{' '}
            <input
              type='number'
              placeholder='Giá vé'
              disabled={disable}
              onChange={(e) => setPriceCombo(parseInt(e.target.value))}
            />{' '}
            /{' '}
            <input
              className='number-ticket'
              type='number'
              placeholder='Số vé'
              disabled={disable}
              onChange={(e) => setTicketNumber(parseInt(e.target.value))}
            />{' '}
            vé
          </Checkbox>
        </div>

        <div className='status'>
          <div className='title'>Tình trạng</div>
          <div className='select'>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value='Đang sử dụng'>Đang sử dụng</option>
              <option value='Tắt'>Tắt</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleHideModal}>Hủy</Button>
        <Button className='submit' onClick={addTicket}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTicket
