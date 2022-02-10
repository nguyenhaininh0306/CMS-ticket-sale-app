import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import 'antd/dist/antd.css'
import './ChangeDateUse.scss'

const ChangeDateUse = (props: any) => {
  const handleSubmit = () => {
    props.onHide()
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
          <div className='title'>Đổi ngày sử dụng vé</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='content'>
          <div className='ticket-id'>
            Số vé <span>PK456789123</span>
          </div>
          <div className='type'>
            Loại <span>Vé cổng - Gói gia đình</span>
          </div>
          <div className='name'>
            Tên sự kiện <span>Hội chợ triển lãm tiêu dùng</span>
          </div>
          <div className='HSD'>
            Hạn sử dụng <span>123</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Hủy</Button>
        <Button className='submit' onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangeDateUse
