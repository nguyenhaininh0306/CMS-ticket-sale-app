import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import db from '../firebase/config'
import { fetchTickets } from '../store/actions/ticketActions'
import './CheckingTicket.scss'
import { Radio, Input, Space } from 'antd'
import 'antd/dist/antd.css'
import Calendar from './calendar/CalendarPicker'

const CheckingTicket = ({ ticketData, fetchTickets }: any) => {
  const [data, setData] = useState([])
  const [control, setControl] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  useEffect(() => {
    setData(ticketData.tickets)
  }, [ticketData.tickets])

  const ref = db.collection('ticket')
  const filterControl = (control: String) => {
    ref.where('control', '==', control).onSnapshot((querySnapshot) => {
      if (control && control !== '') {
        const controls: any = []
        querySnapshot.forEach((doc) => {
          controls.push(doc.data())
        })
        setData(controls)
      } else {
        setData(ticketData.tickets)
      }
    })
  }

  const onChangeStatus = (e: any) => {
    setControl(e.target.value)
  }

  const handleFilter = () => {
    filterControl(control)
    // console.log(control)
  }

  return (
    <div className='container-content'>
      <div className='content-left'>
        <div className='title'>
          <h1>Đối soát vé</h1>
        </div>
        <div className='body-content'>
          <div className='body-title'>
            <div className='search'>
              <input type='text' placeholder='Tìm bằng số vé' />
              <i className='fas fa-search'></i>
            </div>
            <div
              className={
                control && control === 'Chưa đối soát'
                  ? 'control'
                  : control === 'Đã đối soát'
                  ? 'export'
                  : ''
              }
            >
              {control && control === 'Chưa đối soát'
                ? 'Chốt đối soát'
                : control === 'Đã đối soát'
                ? 'Xuất file (.csv)'
                : ''}
            </div>
          </div>
          <div className='body-table'>
            <table>
              <tr>
                <th>STT</th>
                <th>Số vé</th>
                <th>Ngày sử dụng</th>
                <th>Tên loại vé</th>
                <th>Cổng check-in</th>
                <th></th>
              </tr>
              {data && data.length
                ? data.map((item: any, index: any) => {
                    return (
                      <tr key={index} className='row-table'>
                        <td>{index + 1}</td>
                        <td>{item.ticketId}</td>
                        <td>{item.ticketDate}</td>
                        <td>{item.type}</td>
                        <td>{item.checkin}</td>
                        <td
                          className={
                            item.control && item.control === 'Chưa đối soát'
                              ? 'grey'
                              : 'red'
                          }
                        >
                          {item.control}
                        </td>
                      </tr>
                    )
                  })
                : ''}
            </table>
          </div>
        </div>
      </div>
      <div className='content-right'>
        <div className='title'>Lọc vé</div>
        <div className='status'>
          <div className='status-title'>Tình trạng đối soát</div>
          <div className='status-radio'>
            <Radio.Group onChange={(e) => onChangeStatus(e)}>
              <Space direction='vertical'>
                <Radio value=''>Tất cả</Radio>
                <Radio value='Chưa đối soát'>Chưa đối soát</Radio>
                <Radio value='Đã đối soát'>Đã đối soát</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className='type-ticket'>
          <div className='type-title'>Loại vé</div>
          <div className='type'>Vé cổng</div>
        </div>
        <div className='day-picker'>
          <div className='current'>
            <div className='day-title'>Từ ngày</div>
            <Calendar />
          </div>
          <div className='current'>
            <div className='day-title'>Đến ngày</div>
            <Calendar />
          </div>
        </div>

        <div className='button' onClick={handleFilter}>
          Lọc
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckingTicket)
