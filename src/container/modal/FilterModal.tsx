import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Checkbox, Radio } from 'antd'
import 'antd/dist/antd.css'
import Calendar from '../calendar/Calendar'
import './FilterModal.scss'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5']
const defaultCheckedList = ['']

const FilterModal = (props: any) => {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = React.useState(true)
  const [checkAll, setCheckAll] = React.useState(false)
  const [disable, setDisable] = React.useState(false)

  const onChange = (list: any) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
    setDisable(!disable)
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
            <Calendar />
          </div>
          <div className='currentDay'>
            <div className='day'>Đến ngày</div>
            <Calendar />
          </div>
        </div>
        <div className='filter-status'>
          <div className='title'>Tình trạng sử dụng</div>
          <div className='status'>
            <Radio.Group>
              <Radio value='Tất cả'>Tất cả</Radio>
              <Radio value='Đã sử dụng'>Đã sử dụng</Radio>
              <Radio value='Chưa sử dụng'>Chưa sử dụng</Radio>
              <Radio value='Hết hạn'>Hết hạn</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className='filter-checkin'>
          <div className='title'>Cổng Check-in</div>
          <div className='checkin'>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Tất cả
            </Checkbox>
            <CheckboxGroup
              disabled={disable}
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Lọc</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FilterModal
