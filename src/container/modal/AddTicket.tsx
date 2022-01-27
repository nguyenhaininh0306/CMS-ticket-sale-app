import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Checkbox, Radio } from 'antd'
import 'antd/dist/antd.css'
import Calendar from '../calendar/Calendar'

const AddTicket = (props: any) => {
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
          <div className='title'>Thêm gói vé</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='name-ticket'>
          <div className='title'>Tên gói vé</div>
          <input type='text' placeholder='Nhập tên gói vé' />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Hủy</Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTicket
