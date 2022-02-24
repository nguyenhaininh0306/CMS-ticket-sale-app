import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Checkbox, Radio } from 'antd'
import 'antd/dist/antd.css'
import './FilterModal.scss'
import DayPicker from '../calendar/DayPicker'

const FilterModal = (props: any) => {
  const [checkAll, setCheckAll] = React.useState(false)
  const [disable, setDisable] = React.useState(false)

  const [status, setStatus] = React.useState('')

  const onCheckAllChange = (e: any) => {
    setCheckAll(e.target.checked)
    setDisable(!disable)
  }

  const getValue = (e: any) => {
    setStatus(e.target.value)
  }

  const handleSubmitFilter = () => {
    props.statusValue(status)
    props.onHideFilter()
    setDisable(false)
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
          <div className='title'>Lọc vé</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='filter-date'>
          <div className='currentDay'>
            <div className='day'>Từ ngày</div>
            <DayPicker />
          </div>
          <div className='currentDay'>
            <div className='day'>Đến ngày</div>
            <DayPicker />
          </div>
        </div>
        <div className='filter-status'>
          <div className='title'>Tình trạng sử dụng</div>
          <div className='status'>
            <Radio.Group onChange={(e) => getValue(e)}>
              <Radio value=''>Tất cả</Radio>
              <Radio value='Đã sử dụng'>Đã sử dụng</Radio>
              <Radio value='Chưa sử dụng'>Chưa sử dụng</Radio>
              <Radio value='Hết hạn'>Hết hạn</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className='filter-checkin'>
          <div className='title'>Cổng Check-in</div>
          <div className='checkin'>
            <Checkbox onChange={onCheckAllChange}>Tất cả</Checkbox>
            <Checkbox disabled={disable}>Cổng 1</Checkbox>
            <Checkbox disabled={disable}>Cổng 2</Checkbox>
            <Checkbox disabled={disable}>Cổng 3</Checkbox>
            <Checkbox disabled={disable}>Cổng 4</Checkbox>
            <Checkbox disabled={disable}>Cổng 5</Checkbox>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmitFilter}>Lọc</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FilterModal
