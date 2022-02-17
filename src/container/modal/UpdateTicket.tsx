import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Checkbox, TimePicker, DatePicker, Select } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import './UpdateTicket.scss'
import _ from 'lodash'

const UpdateTicket = (props: any) => {
  const [disable, setDisable] = useState(true)
  const [ticket, setTicket] = useState(props.currentTicket)
  const format = moment().format('dd/mm/yyyy')

  const handleUpdateSubmit = () => {
    props.onHideUpdate(false)
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

  useEffect(() => {
    setTicket(props.currentTicket)
  }, [props.currentTicket])

  // useEffect(() => {
  //   const ticketId = props.currentTicket
  //   if (ticketId && !_.isEmpty(ticketId)) {
  //     setTicket(ticketId.bookingcode)
  //   }
  // }, [])

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      dialogClassName='my-modal'
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          <div className='title'>Cập nhật thông tin gói vé</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='ticket-content'>
          <div className='event-id'>
            <div className='title'>Mã sự kiện</div>
            <input
              type='text'
              value={ticket.bookingcode ? ticket.bookingcode : ''}
            />
          </div>
          {ticket.name && ticket.name === 'Gói sự kiện' ? (
            <div className='event-name'>
              <div className='title'>Tên sự kiện</div>
              <input
                type='text'
                value={ticket.nameEvent ? ticket.nameEvent : ''}
              />
            </div>
          ) : (
            ''
          )}
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
              <DatePicker />
              <TimePicker placeholder='hh:mm:ss' />
            </div>
          </div>
        </div>

        <div className='price'>
          <div className='title'>Giá vé áp dụng</div>
          <Checkbox onChange={changeDisable}>
            Vé lẻ (vnđ/vé) với giá{' '}
            <input type='text' placeholder='Giá vé' disabled={disable} /> / vé
          </Checkbox>
          <Checkbox onChange={changeDisable}>
            Combo vé với giá{' '}
            <input type='text' placeholder='Giá vé' disabled={disable} /> /{' '}
            <input
              className='number-ticket'
              type='text'
              placeholder='Số vé'
              disabled={disable}
            />{' '}
            vé
          </Checkbox>
        </div>

        <div className='status'>
          <div className='title'>Tình trạng</div>
          <div className='select'>
            <select value={ticket.status}>
              <option>Đang sử dụng</option>
              <option>Tắt</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateSubmit}>Hủy</Button>
        <Button className='submit' onClick={handleUpdateSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTicket
