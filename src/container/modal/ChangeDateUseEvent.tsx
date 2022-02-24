import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Modal, Row } from 'antd'
import 'antd/dist/antd.css'
import './ChangeDateUse.scss'
import moment from 'moment'
import { connect } from 'react-redux'
import { updateTicketEvent } from '../../store/actions/ticketActions'

const ChangeDateUseEvent = (props: any) => {
  const [itemTicketEvent, setItemTicketEvent] = useState(
    props.ticketDateDataEvent
  )

  const [ticketDateEvent, setTicketDateEvent] = useState(
    moment(itemTicketEvent.ticketDate.toDate()).format('DD/MM/YYYY')
  )
  const handleSubmitUpdateEvent = () => {
    props.updateTicketDataEvent({
      id: itemTicketEvent.id,
      ticketDate: ticketDateEvent,
    })
    props.onHideDateUseEvent()
  }

  const handleOnChangeDateUse = (date: any) => {
    setTicketDateEvent(date.toDate())
  }

  useEffect(() => {
    setItemTicketEvent(props.ticketDateDataEvent)
  }, [props.ticketDateDataEvent])

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
          <span>{itemTicketEvent.bookingcode}</span>
        </Col>
      </Row>

      <Row className='row-content'>
        <Col span={5} className='row-title-A'>
          <span>Loại</span>
        </Col>
        <Col span={19} className='row-title-B'>
          <span>{itemTicketEvent.type} - Gói sự kiện</span>
        </Col>
      </Row>

      {itemTicketEvent.event ? (
        <Row className='row-content'>
          <Col span={5} className='row-title-A'>
            <span>Tên sự kiện</span>
          </Col>
          <Col span={19} className='row-title-B'>
            <span>{itemTicketEvent.event}</span>
          </Col>
        </Row>
      ) : (
        ''
      )}

      <Row className='row-content'>
        <Col span={5} className='row-title-A'>
          <span>Hạn sử dụng</span>
        </Col>
        <Col span={19}>
          <DatePicker
            format='DD/MM/YYYY'
            placeholder={ticketDateEvent}
            onChange={(date) => handleOnChangeDateUse(date)}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24} className='btn'>
          <Button className='cancel' onClick={() => props.onHideDateUseEvent()}>
            Hủy
          </Button>
          <Button className='submit' onClick={handleSubmitUpdateEvent}>
            Lưu
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTicketDataEvent: (data: any) => dispatch(updateTicketEvent(data)),
  }
}

export default connect(null, mapDispatchToProps)(ChangeDateUseEvent)
