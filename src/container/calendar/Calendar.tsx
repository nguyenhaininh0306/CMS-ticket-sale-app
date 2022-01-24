import React, { useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

import 'antd/dist/antd.css'
import './Calendar.scss'

const Calendar = () => {
  const dateFormat = 'DD/MM/YYYY'
  const now = moment().toDate()
  function onChange(date: any, dateString: any) {
    console.log(date, dateString)
    console.log(dateFormat)
    console.log('Now: ', now)
  }

  return (
    <div className='calendar'>
      <Space direction='vertical'>
        <DatePicker
          onChange={onChange}
          defaultValue={moment()}
          format={dateFormat}
        />
      </Space>
    </div>
  )
}

export default Calendar
