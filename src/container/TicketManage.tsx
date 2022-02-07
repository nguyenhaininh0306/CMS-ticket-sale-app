import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import db from '../firebase/config'
import { fetchTickets } from '../store/actions/ticketActions'
import FilterModal from './modal/FilterModal'
import { Popover, Button } from 'antd'
import './TicketManage.scss'

const TicketManage = ({ ticketData, fetchTickets }: any) => {
  const [data, setData] = useState([])
  const [modalShow, setModalShow] = useState(false)

  //Lọc vé theo status
  const ref = db.collection('ticket')
  const filterStatus = (status: String) => {
    ref.where('status', '==', status).onSnapshot((querySnapshot) => {
      const tickets: any = []
      querySnapshot.forEach((doc) => {
        tickets.push(doc.data())
      })
      setData(tickets)
    })
  }

  const statusValue = (status: any) => {
    if (status !== '') {
      filterStatus(status)
    } else {
      setData(ticketData.tickets)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  useEffect(() => {
    setData(ticketData.tickets)
  }, [ticketData.tickets])

  const content = (
    <div className='change-ticket'>
      <div>Sử dụng vé</div>
      <div>Đổi ngày sử dụng</div>
    </div>
  )

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
            <FilterModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              statusValue={statusValue}
            />
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
            {data && data.length
              ? data.map((item: any, index: any) => {
                  return (
                    <tr key={index} className='row-table'>
                      <td>{index + 1}</td>
                      <td>{item.bookingcode}</td>
                      <td>{item.ticketId}</td>
                      <td
                        className={
                          item.status && item.status === 'Chưa sử dụng'
                            ? 'unused'
                            : item.status === 'Đã sử dụng'
                            ? 'used'
                            : 'expired'
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
                          <Popover
                            content={content}
                            trigger='click'
                            placement='left'
                          >
                            <i className='fas fa-ellipsis-v'></i>
                          </Popover>
                        ) : (
                          ''
                        )}
                      </th>
                    </tr>
                  )
                })
              : ''}
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
