import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  TimePicker,
  DatePicker,
  Select,
  Modal,
  Button,
  Row,
  Col,
  Form,
} from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import './UpdateTicket.scss'
import { connect } from 'react-redux'
import { updateTicket } from '../../store/actions/ticketActions'

const UpdateTicket = (props: any) => {
  const [disableA, setDisableA] = useState(true)
  const [disableB, setDisableB] = useState(true)
  const [ticket, setTicket] = useState(props.currentTicket)
  const { Option } = Select

  const [nameEvent, setNameEvent] = useState(ticket.nameEvent)
  const [timeUse, setTimeUse] = useState(
    moment(ticket.timeUse.toDate()).format('DD/MM/YYYY')
  )
  const [timeExpired, setTimeExpired] = useState(
    moment(ticket.timeExpired.toDate()).format('DD/MM/YYYY')
  )
  const [price, setPrice] = useState(ticket.price)
  const [priceCombo, setPriceCombo] = useState(ticket.priceCombo)
  const [status, setStatus] = useState(ticket.status)
  const [ticketNumber, setTicketNumber] = useState(ticket.ticketNumber)

  const handleUpdateSubmit = () => {
    const dataUpdate = {
      id: ticket.id,
      nameEvent: nameEvent,
      timeUse: timeUse,
      timeExpired: timeExpired,
      price: price,
      priceCombo: priceCombo,
      status: status,
      ticketNumber: ticketNumber,
    }

    props.updateTicketData(dataUpdate)
    props.onHideUpdate()
  }

  const handleHideModal = () => {
    props.onHideUpdate()
  }

  const handleChange = (value: any) => {
    setStatus(value)
    console.log(`selected ${value}`)
  }

  const changeDisableA = (e: any) => {
    if (e.target.checked === true) {
      setDisableA(false)
    } else {
      setDisableA(true)
    }
  }

  const changeDisableB = (e: any) => {
    if (e.target.checked === true) {
      setDisableB(false)
    } else {
      setDisableB(true)
    }
  }

  const handleOnChangeDateUse = (date: any) => {
    setTimeUse(date.toDate())
  }

  const handleOnChangeDateExpired = (date: any) => {
    setTimeExpired(date.toDate())
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
    <>
      <Modal
        title='Cập nhật thông tin gói vé'
        visible={props.show}
        footer={null}
        width={758}
        centered
      >
        <Row className='info-ticket'>
          <Col span={12} className='info-title'>
            <Col span={24} className='title'>
              Mã sự kiện<span className='warning'>*</span>
            </Col>

            <Col span={24} className='info-input'>
              <input
                type='text'
                value={ticket.bookingcode ? ticket.bookingcode : ''}
                disabled
              />
            </Col>
          </Col>

          <Col span={12} className='info-title'>
            {ticket.name && ticket.name === 'Gói sự kiện' ? (
              <>
                <Col span={24} className='title'>
                  Tên sự kiện
                </Col>
                <Col span={24} className='info-input event'>
                  <input
                    type='text'
                    value={nameEvent ? nameEvent : ''}
                    onChange={(e) => setNameEvent(e.target.value)}
                  />
                </Col>
              </>
            ) : (
              ''
            )}
          </Col>
        </Row>

        <Row className='day'>
          <Col span={12}>
            <Row>
              <Col span={24} className='title'>
                Ngày áp dụng
              </Col>
              <Col span={12}>
                <DatePicker
                  placeholder={timeUse}
                  format='DD/MM/YYYY'
                  onChange={(date) => handleOnChangeDateUse(date)}
                />
              </Col>
              <Col span={12}>
                <TimePicker placeholder='hh:mm:ss' />
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24} className='title'>
                Ngày hết hạn
              </Col>
              <Col span={12}>
                <DatePicker
                  placeholder={timeExpired}
                  format='DD/MM/YYYY'
                  onChange={(date) => handleOnChangeDateExpired(date)}
                />
              </Col>
              <Col span={12}>
                <TimePicker placeholder='hh:mm:ss' />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='ticket-price'>
          <Col span={24} className='title'>
            Giá vé áp dụng
          </Col>

          <Col span={24} className='one-ticket'>
            <Checkbox onChange={changeDisableA}>
              Vé lẻ (vnđ/vé) với giá{' '}
              <input
                className='one-ticket-input'
                type='number'
                placeholder='Giá vé'
                disabled={disableA}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />{' '}
              / vé
            </Checkbox>
          </Col>

          <Col span={24} className='combo-ticket'>
            <Checkbox onChange={changeDisableB}>
              Combo vé với giá{' '}
              <input
                className='combo-ticket-input'
                type='number'
                placeholder='Giá vé'
                disabled={disableB}
                value={priceCombo}
                onChange={(e) => setPriceCombo(parseInt(e.target.value))}
              />{' '}
              /{' '}
              <input
                className='number-ticket'
                type='number'
                placeholder='Số vé'
                disabled={disableB}
                value={ticketNumber}
                onChange={(e) => setTicketNumber(parseInt(e.target.value))}
              />{' '}
              vé
            </Checkbox>
          </Col>
        </Row>

        <Row className='status'>
          <Col span={24} className='title'>
            Tình trạng
          </Col>

          <Col span={24} className='select'>
            <Select
              value={status}
              style={{ width: 176 }}
              onChange={handleChange}
            >
              <Option value='Đang sử dụng'>Đang sử dụng</Option>
              <Option value='Tắt'>Tắt</Option>
            </Select>
          </Col>

          <Col span={24}>
            <span className='warning'>*</span>
            <span className='info-warning'>
              <i>là thông tin bắt buộc</i>
            </span>
          </Col>
        </Row>

        <Row>
          <Col span={24} className='button'>
            <Button className='cancel' onClick={handleHideModal}>
              Hủy
            </Button>
            <Button className='submit' onClick={handleUpdateSubmit}>
              Lưu
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTicketData: (data: any) => dispatch(updateTicket(data)),
  }
}

export default connect(null, mapDispatchToProps)(UpdateTicket)
