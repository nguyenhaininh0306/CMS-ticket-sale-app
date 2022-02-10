import React from 'react'
import { Tabs } from 'antd'
import './TicketManage.scss'
import ComboFamily from './combo/ComboFamily'
import ComboEvent from './combo/ComboEvent'

const TicketManage = () => {
  return (
    <div className='home-container'>
      <div className='title'>
        <h1>Danh sách vé</h1>
      </div>
      <div className='nav'>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Gói gia đình' key='1'>
            <ComboFamily />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Gói sự kiện' key='2'>
            <ComboEvent />
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className='foot-content'></div>
    </div>
  )
}

export default TicketManage
