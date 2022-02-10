import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import FilterModal from '../modal/FilterModal'
import { Popover } from 'antd'
import db from '../../firebase/config'
import { fetchTicketsEvent } from '../../store/actions/ticketEventActions'

const ComboEvent = ({ ticketEventData, fetchTicketsEvent }: any) => {
  const [data, setData] = useState([])
  const [modalShow, setModalShow] = useState(false)

  console.log('ninh: ', ticketEventData)

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
      setData(ticketEventData.ticketsEvent)
    }
  }

  const content = (
    <div className='change-ticket'>
      <div>Sử dụng vé</div>
      <div>Đổi ngày sử dụng</div>
    </div>
  )

  useEffect(() => {
    fetchTicketsEvent()
  }, [])

  useEffect(() => {
    setData(ticketEventData.ticketsEvent)
  }, [ticketEventData.ticketsEvent])

  useEffect(() => {}, [])
  return (
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
            <th>Tên sự kiện</th>
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
                    <td>{item.event}</td>
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
                          overlayInnerStyle={{
                            background: '#ffd2a8',
                            borderRadius: '8px',
                            width: '159px',
                            height: '59px',
                            padding: '8px 16px',
                          }}
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
  )
}

const mapStateToProps = (state: any) => {
  return {
    ticketEventData: state.ticketEvent,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketsEvent: () => dispatch(fetchTicketsEvent()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboEvent)
