import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import 'antd/dist/antd.css'
import './ChangeDateUse.scss'
import DayPicker from '../calendar/DayPicker'

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
          <table>
            <tbody>
              <tr>
                <td>Số vé</td>
                <td>
                  <span>PK123456789</span>
                </td>
              </tr>
              <tr>
                <td>Loại</td>
                <td>
                  <span>Vé cổng - Gói sự kiện</span>
                </td>
              </tr>
              <tr>
                <td>Tên sự kiện</td>
                <td>
                  <span>Hội chợ triển lãm tiêu dùng 2022</span>
                </td>
              </tr>
              <tr>
                <td>Hạn sử dụng</td>
                <td>
                  <span>
                    <DayPicker />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
