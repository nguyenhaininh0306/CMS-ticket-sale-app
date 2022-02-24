import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Modal, Row } from 'antd'
import 'antd/dist/antd.css'
import './ChangeDateUse.scss'
import moment from 'moment'
import { connect } from 'react-redux'
import { updateTicketFamily } from '../../store/actions/ticketActions'

const ChangeDateUse = (props: any) => {
  const [itemTicket, setItemTicket] = useState(props.ticketDateData)

  const [ticketDateFamily, setTicketDateFamily] = useState(
    moment(itemTicket.ticketDate.toDate()).format('DD/MM/YYYY')
  )
  const handleSubmitUpdate = () => {
    props.updateTicketDataFamily({
      id: itemTicket.id,
      ticketDate: ticketDateFamily,
    })
    props.onHideDateUse()
  }

  const handleOnChangeDateUse = (date: any) => {
    setTicketDateFamily(date.toDate())
  }

  useEffect(() => {
    setItemTicket(props.ticketDateData)
  }, [props.ticketDateData])

  return (
    <Modal
      title='Đổi ngày sử dụng'
      centered
      visible={props.show}
      width={758}
      footer={null}
    >
      <Row className='row-content'>
        <Col span={5} className='row-title-A'>
          <span>Số vé</span>
        </Col>
        <Col span={19} className='row-title-B'>
          <span>{itemTicket.bookingcode}</span>
        </Col>
      </Row>

      <Row className='row-content'>
        <Col span={5} className='row-title-A'>
          <span>Loại</span>
        </Col>
        <Col span={19} className='row-title-B'>
          <span>{itemTicket.type} - Gói sự kiện</span>
        </Col>
      </Row>
      {/* 
      {itemTicket.event ? (
        <Row className='row-content'>
          <Col span={5} className='row-title-A'>
            <span>Tên sự kiện</span>
          </Col>
          <Col span={19} className='row-title-B'>
            <span>{itemTicket.event}</span>
          </Col>
        </Row>
      ) : (
        ''
      )} */}

      <Row className='row-content'>
        <Col span={5} className='row-title-A'>
          <span>Hạn sử dụng</span>
        </Col>
        <Col span={19}>
          <DatePicker
            format='DD/MM/YYYY'
            placeholder={ticketDateFamily}
            onChange={(date) => handleOnChangeDateUse(date)}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24} className='btn'>
          <Button className='cancel' onClick={() => props.onHideDateUse()}>
            Hủy
          </Button>
          <Button className='submit' onClick={() => handleSubmitUpdate()}>
            Lưu
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTicketDataFamily: (data: any) => dispatch(updateTicketFamily(data)),
  }
}

export default connect(null, mapDispatchToProps)(ChangeDateUse)
