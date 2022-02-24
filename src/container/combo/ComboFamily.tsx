import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchTickets } from '../../store/actions/ticketFamilyActions'
import FilterModal from '../modal/FilterModal'
import { Popover } from 'antd'
import db from '../../firebase/config'
import ChangeDateUse from '../modal/ChangeDateUse'
import moment from 'moment'

const ComboFamily = ({ ticketData, fetchTickets }: any) => {
  const [dataFamily, setDataFamily] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [ticketDateData, setTicketDateData] = useState({})

  //Lọc vé theo status
  const ref = db.collection('ticket')
  const filterStatus = (status: String) => {
    ref.where('status', '==', status).onSnapshot((querySnapshot) => {
      const tickets: any = []
      querySnapshot.forEach((doc) => {
        tickets.push(doc.data())
      })
      setDataFamily(tickets)
    })
  }

  const statusValue = (status: any) => {
    if (status !== '') {
      filterStatus(status)
    } else {
      setDataFamily(ticketData.tickets)
    }
  }

  const handleOpen = () => {
    setIsOpenModal(true)
  }

  const content = (
    <div className='change-ticket'>
      <div>Sử dụng vé</div>
      <div onClick={() => handleOpen()}>Đổi ngày sử dụng</div>
      {isOpenModal && isOpenModal === true ? (
        <ChangeDateUse
          show={isOpenModal}
          onHideDateUse={() => setIsOpenModal(false)}
          ticketDateData={ticketDateData}
        />
      ) : (
        ''
      )}
    </div>
  )

  const handleGetDataTicket = (ticketData: any) => {
    setTicketDateData(ticketData)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  useEffect(() => {
    setDataFamily(ticketData.tickets)
  }, [ticketData.tickets])
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
          {modalShow && modalShow === true ? (
            <FilterModal
              show={modalShow}
              onHideFilter={() => setModalShow(false)}
              statusValue={statusValue}
            />
          ) : (
            ''
          )}

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
          {dataFamily && dataFamily.length
            ? dataFamily.map((item: any, index: any) => {
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
                    <td>
                      {moment(item.ticketDate.toDate()).format('DD/MM/YYYY')}
                    </td>
                    <td>
                      {moment(item.ticketReleaseDate.toDate()).format(
                        'DD/MM/YYYY'
                      )}
                    </td>
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
                          }}
                        >
                          <div onClick={() => handleGetDataTicket(item)}>
                            <i className='fas fa-ellipsis-v'></i>
                          </div>
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
    ticketData: state.ticket,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTickets: () => dispatch(fetchTickets()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboFamily)
