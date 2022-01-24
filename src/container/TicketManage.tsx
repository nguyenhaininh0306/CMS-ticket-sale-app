import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchTickets } from '../store/actions/ticketActions'
import FilterModal from './modal/FilterModal'
import './TicketManage.scss'

const TicketManage = ({ ticketData, fetchTickets }: any) => {
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <div className='home-container'>
      <div className='title'>
        <h1>Danh sách vé</h1>
      </div>
      <div className='body-content'>
        <div className='body-title'>
          <div className='search'>
            <input type='text' placeholder='Tìm bằng số vé' />
            <i className='fas fa-search'></i>
          </div>
          <div className='filter-container'>
            <div className='filter' onClick={() => setModalShow(true)}>
              <i className='fas fa-filter'></i>Lọc
            </div>
            <FilterModal show={modalShow} onHide={() => setModalShow(false)} />
            <div className='export'>Xuất file(.csv)</div>
          </div>
        </div>
        <div className='body-table'>
          <table>
            <tr>
              <th>STT</th>
              <th>Booking code</th>
              <th>Số vé</th>
              <th>Tình trạng sử dụng</th>
              <th>Ngày sử dụng</th>
              <th>Ngày xuất vé</th>
              <th>Cổng check-in</th>
              <th></th>
            </tr>
            {ticketData.tickets.map((item: any, index: any) => {
              return (
                <tr key={index} className='row-table'>
                  <td>{index + 1}</td>
                  <td>{item.bookingcode}</td>
                  <td>{item.ticketId}</td>
                  <td
                    className={
                      item.status && item.status === 'Chưa sử dụng'
                        ? 'unused'
                        : 'used'
                    }
                  >
                    <i className='fas fa-circle'></i>
                    {item.status}
                  </td>
                  <td>{item.ticketDate}</td>
                  <td>{item.ticketReleaseDate}</td>
                  <td>{item.checkin}</td>
                  <th>
                    {item.status === 'Chưa sử dụng' ? (
                      <i className='fas fa-ellipsis-v'></i>
                    ) : (
                      ''
                    )}
                  </th>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
      <div className='foot-content'></div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ticketData: state.ticket,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTickets: () => dispatch(fetchTickets()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketManage)
