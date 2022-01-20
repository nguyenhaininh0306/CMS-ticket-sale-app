import React from 'react'
import Home from '../container/Home'
import './Header.scss'
import Menu from './Menu/Menu'
import Navbar from './Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import TicketManage from '../container/TicketManage'
import CheckingTicket from '../container/CheckingTicket'
import Service from '../container/Service'

const Header = () => {
  return (
    <div className='header-container'>
      <div className='content-left'>
        <Menu />
      </div>
      <div className='content-right'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ticket-manage' element={<TicketManage />} />
          <Route path='/checking-ticket' element={<CheckingTicket />} />
          <Route path='/setting/service' element={<Service />} />
        </Routes>
      </div>
    </div>
  )
}

export default Header
