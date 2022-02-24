import React, { useState } from 'react'
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
import './AddTicket.scss'
import { connect } from 'react-redux'
import { createTicket } from '../../store/actions/ticketActions'

const AddTicket = (props: any) => {
  const [disable, setDisable] = useState(true)
  const { Option } = Select

  const [name, setName] = useState('')
  const [timeUse, setTimeUse] = useState(moment())
  const [timeExpired, setTimeExpired] = useState(moment())
  const [price, setPrice] = useState(0)
  const [priceCombo, setPriceCombo] = useState(0)
  const [status, setStatus] = useState('')
  const [ticketNumber, setTicketNumber] = useState(0)

  const handleCreateTicket = () => {
    const ticketData = {
      name: name,
      timeUse: timeUse,
      timeExpired: timeExpired,
      price: price,
      priceCombo: priceCombo,
      status: status,
      ticketNumber: ticketNumber,
    }

    props.createTicketData(ticketData)
    props.onHide()
    setName('')
    setPrice(0)
    setPriceCombo(0)
    setStatus('Đang sử dụng')
    setTicketNumber(0)
    setTimeUse(moment())
    setTimeExpired(moment())
  }

  const handleHideModal = () => {
    props.onHide()
  }

  const changeDisable = (e: any) => {
    if (e.target.checked === true) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const handleChange = (value: any) => {
    setStatus(value)
    console.log(`selected ${value}`)
  }

  const handleOnChangeDateUse = (date: any) => {
    setTimeUse(date.toDate())
  }

  const handleOnChangeDateExpired = (date: any) => {
    setTimeExpired(date.toDate())
  }

  return (
    <Modal
      title='Thêm gói vé'
      visible={props.show}
      footer={null}
      width={758}
      centered
    >
      <Row className='info-ticket'>
        <Col span={12} className='info-title'>
          <Col span={24} className='title'>
            Tên gói vé<span className='warning'>*</span>
          </Col>

          <Col span={24} className='info-add-input'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
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
                placeholder='dd/mm/yy'
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
                placeholder='dd/mm/yy'
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
          <Checkbox onChange={changeDisable}>
            Vé lẻ (vnđ/vé) với giá{' '}
            <input
              className='one-ticket-input'
              type='number'
              placeholder='Giá vé'
              disabled={disable}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />{' '}
            / vé
          </Checkbox>
        </Col>

        <Col span={24} className='combo-ticket'>
          <Checkbox onChange={changeDisable}>
            Combo vé với giá{' '}
            <input
              className='combo-ticket-input'
              type='number'
              placeholder='Giá vé'
              disabled={disable}
              value={priceCombo}
              onChange={(e) => setPriceCombo(parseInt(e.target.value))}
            />{' '}
            /{' '}
            <input
              className='number-ticket'
              type='number'
              placeholder='Số vé'
              disabled={disable}
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
          <Select style={{ width: 176 }} onChange={handleChange}>
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
          <Button className='submit' onClick={() => handleCreateTicket()}>
            Lưu
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTicketData: (data: any) => dispatch(createTicket(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddTicket)
