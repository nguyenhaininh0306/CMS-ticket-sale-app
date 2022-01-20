import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTickets } from '../store/actions/ticketActions'
import './TicketManage.scss'

const Home = ({ ticketData, fetchTickets }: any) => {
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
            <div className='filter'>
              <i className='fas fa-filter'></i>Lọc
            </div>
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
            </tr>
            {ticketData.loading ? (
              <h1>Loading...</h1>
            ) : (
              ticketData.tickets.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.bookingcode}</td>
                    <td>{item.ticketId}</td>
                    <td>{item.status}</td>
                    <td>{item.ticketDate}</td>
                    <td>{item.ticketReleaseDate}</td>
                    <td>{item.checkin}</td>
                  </tr>
                )
              })
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
