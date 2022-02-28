import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import db from '../firebase/config'
import { fetchTickets } from '../store/actions/ticketFamilyActions'
import './CheckingTicket.scss'
import { Radio, Space, Table } from 'antd'
import 'antd/dist/antd.css'
import DayPicker from './calendar/DayPicker'
import moment from 'moment'

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
    filterControl(e.target.value)
  }

  // const handleFilter = () => {
  //   filterControl(control)
  //   // console.log(control)
  // }

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
            {/* <table>
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
                        <td>
                          {moment(item.ticketDate.toDate()).format(
                            'DD/MM/YYYY'
                          )}
                        </td>
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
            </table> */}
            <Table
              dataSource={data}
              pagination={{ pageSize: 12, position: ['bottomCenter'] }}
              rowKey='id'
            >
              <Table.Column
                title='STT'
                dataIndex='id'
                key='id'
                render={(text: any, record: any, index: any) => (
                  <div>{index + 1}</div>
                )}
              />

              <Table.Column
                title='Số vé'
                dataIndex='ticketId'
                key='ticketId'
                render={(text: any) => <div>{text}</div>}
              />

              <Table.Column
                title='Ngày sử dụng'
                dataIndex='ticketDate'
                key='ticketDate'
                render={(text: any) => (
                  <div>{moment(text.toDate()).format('DD/MM/YYYY')}</div>
                )}
              />

              <Table.Column
                title='Tên loại'
                dataIndex='type'
                key='type'
                render={(text: any) => <div>{text}</div>}
              />

              <Table.Column
                title='Cổng Check-in'
                dataIndex='checkin'
                key='checkin'
                render={(text: any) => <div>{text}</div>}
              />

              <Table.Column
                dataIndex='control'
                key='control'
                render={(text: any) => (
                  <div
                    className={
                      text && text === 'Chưa đối soát' ? 'grey' : 'red'
                    }
                  >
                    {text}
                  </div>
                )}
              />
            </Table>
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
            <DayPicker />
          </div>
          <div className='current'>
            <div className='day-title'>Đến ngày</div>
            <DayPicker />
          </div>
        </div>

        {/* <div className='button' onClick={handleFilter}>
          Lọc
        </div> */}
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
