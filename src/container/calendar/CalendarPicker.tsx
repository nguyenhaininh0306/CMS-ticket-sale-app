import React, { useState } from 'react'
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Calendar, Select, Radio, Col, Row, Popover } from 'antd'
import moment from 'moment'

import 'antd/dist/antd.css'
import './Calendar.scss'

const CalendarPicker = () => {
  const [date, setDate] = useState(moment())
  const [value, setValue] = useState<Number>(1)
  const datePicker = moment(new Date()).format('MM, YYYY')

  const startWeek = moment().startOf('week')
  const endWeek = moment().endOf('week')

  moment.updateLocale('en', {
    weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  })

  const onPanelChange = (value: any, mode: any) => {
    console.log(value, mode)
  }

  const changeValue = (e: any) => {
    setValue(e.target.value)
    console.log(value)
  }

  const content = (
    <div className='site-calendar-customize-header-wrapper'>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0
          const end = 12
          const monthOptions = []

          const current = value.clone()
          const localeData = value.localeData()

          const currentMonth = value.format('M').toString()
          const currentYear = value.format('Y').toString()

          const months = []
          for (let i = start; i < end; i++) {
            current.month(i)
            months.push(localeData.monthsShort(current))
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className='month-item' key={`${index}`}>
                {months[index]}
              </Select.Option>
            )
          }
          const month = value.month()
          const year = value.year()
          const options = []
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className='year-item'>
                {i}
              </Select.Option>
            )
          }
          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col>
                  <LeftOutlined />
                </Col>

                <Col style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Tháng {currentMonth}, {currentYear}
                </Col>

                <Col>
                  <Select
                    size='small'
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    showArrow={false}
                    onChange={(selectedMonth) => {
                      const newValue = value.clone()
                      newValue.month(parseInt(selectedMonth, 10))
                      onChange(newValue)
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>

                <Col>
                  <RightOutlined
                    onClick={() => setDate(date.add(1, 'month'))}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Radio.Group
                    name='radiogroup'
                    defaultValue={1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '14px 0',
                      gap: '5px',
                    }}
                    onChange={(e) => changeValue(e)}
                  >
                    <Radio value={1}>Theo ngày</Radio>
                    <Radio value={2}>Theo tuần</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          )
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  )

  return (
    <Popover placement='bottomRight' content={content} trigger='click'>
      <div className='calendarPicker'>
        <div className='title-month'>Tháng {datePicker}</div>
        <CalendarOutlined />
      </div>
    </Popover>
  )
}

export default CalendarPicker
