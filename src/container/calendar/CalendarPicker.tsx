// import React, { useState } from 'react'
// import {
//   CalendarOutlined,
//   LeftOutlined,
//   RightOutlined,
// } from '@ant-design/icons'
// import { Calendar, Select, Radio, Col, Row, Popover } from 'antd'
// import moment from 'moment'

// import 'antd/dist/antd.css'
// import './Calendar.scss'

// const CalendarPicker = () => {
//   const [date, setDate] = useState(moment())
//   const [value, setValue] = useState<Number>(1)
//   const datePicker = moment(new Date()).format('MM, YYYY')

//   moment.updateLocale('en', {
//     weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
//   })

//   const onPanelChange = (value: any, mode: any) => {
//     console.log(value, mode)
//   }

//   const changeValue = (e: any) => {
//     setValue(e.target.value)
//     console.log(value)
//   }

//   const content = (
//     <div className='site-calendar-customize-header-wrapper'>
//       <Calendar
//         fullscreen={false}
//         headerRender={({ value, type, onChange, onTypeChange }) => {
//           const start = 0
//           const end = 12
//           const monthOptions = []

//           const current = value.clone()
//           const localeData = value.localeData()

//           const currentMonth = value.format('M').toString()
//           const currentYear = value.format('Y').toString()

//           const months = []
//           for (let i = start; i < end; i++) {
//             current.month(i)
//             months.push(localeData.monthsShort(current))
//           }

//           for (let index = start; index < end; index++) {
//             monthOptions.push(
//               <Select.Option className='month-item' key={`${index}`}>
//                 {months[index]}
//               </Select.Option>
//             )
//           }
//           const month = value.month()
//           const year = value.year()
//           const options = []
//           for (let i = year - 10; i < year + 10; i += 1) {
//             options.push(
//               <Select.Option key={i} value={i} className='year-item'>
//                 {i}
//               </Select.Option>
//             )
//           }
//           return (
//             <div style={{ padding: 8 }}>
//               <Row gutter={8}>
//                 <Col>
//                   <LeftOutlined />
//                 </Col>

//                 <Col style={{ fontSize: '18px', fontWeight: 'bold' }}>
//                   Tháng {currentMonth}, {currentYear}
//                 </Col>

//                 <Col>
//                   <Select
//                     size='small'
//                     dropdownMatchSelectWidth={false}
//                     value={String(month)}
//                     showArrow={false}
//                     onChange={(selectedMonth) => {
//                       const newValue = value.clone()
//                       newValue.month(parseInt(selectedMonth, 10))
//                       onChange(newValue)
//                     }}
//                   >
//                     {monthOptions}
//                   </Select>
//                 </Col>

//                 <Col>
//                   <RightOutlined
//                     onClick={() => setDate(date.add(1, 'month'))}
//                   />
//                 </Col>
//               </Row>

//               <Row>
//                 <Col span={24}>
//                   <Radio.Group
//                     name='radiogroup'
//                     defaultValue={1}
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       margin: '14px 0',
//                       gap: '5px',
//                     }}
//                     onChange={(e) => changeValue(e)}
//                   >
//                     <Radio value={1}>Theo ngày</Radio>
//                     <Radio value={2}>Theo tuần</Radio>
//                   </Radio.Group>
//                 </Col>
//               </Row>
//             </div>
//           )
//         }}
//         onPanelChange={onPanelChange}
//       />
//     </div>
//   )

//   return (
//     <Popover placement='bottomRight' content={content} trigger='click'>
// <div className='calendarPicker'>
//   <div className='title-month'>Tháng {datePicker}</div>
//   <CalendarOutlined />
// </div>
//     </Popover>
//   )
// }

// export default CalendarPicker

import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Col, Popover, Radio, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import {
  dayOfWeekStyle,
  daySelectedStyle,
  dayStyle,
  formatMonthAndYear,
  setup,
  weekStyle,
  formatDayMonthYear,
} from './setup'
import './Calendar.scss'

const weekDay = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

const CalendarPicker = () => {
  const [calendar, setCalendar] = useState<any>([])
  const [value, setValue] = useState(moment())
  const [valueDay, setValueDay] = useState()

  const [valueSave, setValueSave] = useState(moment())
  const [buttonRadio, setButtonRadio] = useState<String>('theongay')

  const handleDayClick = (day: any) => {
    setValue(day)
    setValueSave(day)
    setValueDay(day.format('MM/DD/YYYY'))
  }
  useEffect(() => {
    setCalendar(setup(value))
  }, [value])

  const content = (
    <div className='Calendar'>
      <Row gutter={8} style={{ fontSize: 18, fontWeight: 'bold' }}>
        <Col>
          <LeftOutlined
            onClick={() => setValue(value.clone().subtract(1, 'month'))}
          />
        </Col>

        <Col>{formatMonthAndYear(value)}</Col>

        <Col>
          <RightOutlined
            onClick={() => setValue(value.clone().add(1, 'month'))}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Radio.Group
            name='radiogroup'
            value={buttonRadio}
            onChange={(e: any) => setButtonRadio(e.target.value)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '14px 0',
            }}
          >
            <Radio value={'theongay'}>Theo ngày</Radio>
            <Radio value={'theotuan'}>Theo tuần</Radio>
          </Radio.Group>
        </Col>

        <Col span={24}>
          <div className='Calendar-wrap'>
            <div className='Calendar-header'>
              {weekDay.map((day: any, index: any) => (
                <div className='Calendar-header-item' key={index}>
                  {day}
                </div>
              ))}
            </div>

            {calendar.map((week: any, index: any) => (
              <div
                className={`Calendar-week Calendar-week-${weekStyle(
                  valueSave,
                  week,
                  buttonRadio
                )}`}
                key={index}
              >
                {week.map((day: any, index: any) => (
                  <div onClick={() => handleDayClick(day)} key={index}>
                    <div
                      className={`Calendar-day Calendar-day-${dayStyle(
                        value,
                        day
                      )} Calendar-day-${daySelectedStyle(
                        valueSave,
                        day,
                        buttonRadio
                      )} Calendar-week-${dayOfWeekStyle(
                        valueSave,
                        day,
                        buttonRadio
                      )} `}
                    >
                      {day.format('D').toString()}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )

  return (
    <div>
      <Popover placement='bottomRight' content={content} trigger='click'>
        <div className='calendarPicker'>
          <div className='title-month'>{formatMonthAndYear(value)}</div>
          <CalendarOutlined />
        </div>
      </Popover>
    </div>
  )
}

export default CalendarPicker
