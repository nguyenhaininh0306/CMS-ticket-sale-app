import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Checkbox, TimePicker, DatePicker, Select } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import './AddTicket.scss'

const AddTicket = (props: any) => {
  const [disable, setDisable] = useState(true)
  const { Option } = Select
  const handleSubmit = () => {
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
          <input type='text' placeholder='Nhập tên gói vé' />
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
            <Select defaultValue='1' onChange={handleChange}>
              <Option value='1'>Đang sử dụng</Option>
              <Option value='2'>Tắt</Option>
            </Select>
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

export default AddTicket
