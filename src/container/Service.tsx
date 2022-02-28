import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchTicketCombo } from '../store/actions/ticketComboActions'
import AddTicket from './modal/AddTicket'
import UpdateTicket from './modal/UpdateTicket'
import moment from 'moment'
import './Service.scss'
import { Table } from 'antd'

const Service = ({ ticketCombo, loading, fetchTicketCombo }: any) => {
  const [data, setData] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [modalShowUpdate, setModalShowUpdate] = useState(false)
  const [ticket, setTicket] = useState({})

  const handleGetTicket = (ticket: {}) => {
    setTicket(ticket)
    setModalShowUpdate(true)
  }

  useEffect(() => {
    fetchTicketCombo()
  }, [fetchTicketCombo])

  useEffect(() => {
    setData(ticketCombo.ticketCombo)
  }, [ticketCombo.ticketCombo])

  return (
    <div className='home-container'>
      <div className='title'>
        <h1>Danh sách gói vé</h1>
      </div>
      <div className='body-content'>
        <div className='body-title'>
          <div className='search'>
            <input type='text' placeholder='Tìm bằng số vé' />
            <i className='fas fa-search'></i>
          </div>
          <div className='button-container'>
            <div className='export'>Xuất file(.csv)</div>
            <div className='add-ticket' onClick={() => setModalShow(true)}>
              Thêm gói vé
            </div>
            <AddTicket show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
        <div className='ticket-table'>
          {/* <table>
            <tr>
              <th>STT</th>
              <th>Mã gói</th>
              <th>Tên gói vé</th>
              <th>Ngày áp dụng</th>
              <th>Ngày hết hạn</th>
              <th>Giá vé (VND/Vé)</th>
              <th>Giá Combo (VND/Combo)</th>
              <th>Tình trạng</th>
              <th></th>
            </tr>
            {data && data.length
              ? data.map((item: any, index: any) => {
                  return (
                    <tr key={item.id} className='row-table'>
                      <td>{index + 1}</td>
                      <td>{item.bookingcode}</td>
                      <td>{item.name}</td>
                      <td className='day-use'>
                        <div>
                          {moment(item.timeUse.toDate()).format('DD/MM/YYYY')}
                        </div>
                        <div>
                          {moment(item.timeUse.toDate()).format('hh:mm:ss')}
                        </div>
                      </td>
                      <td>
                        <div>
                          {moment(item.timeExpired.toDate()).format(
                            'DD/MM/YYYY'
                          )}
                        </div>
                        <div>
                          {moment(item.timeExpired.toDate()).format('hh:mm:ss')}
                        </div>
                      </td>
                      <td>{item.price} VNĐ</td>
                      <td>
                        {item.priceCombo && item.priceCombo !== 0
                          ? `${item.priceCombo} VNĐ/${item.ticketNumber} vé`
                          : ''}
                      </td>
                      <td
                        className={
                          item.status && item.status === 'Tắt'
                            ? 'expired'
                            : 'unused'
                        }
                      >
                        <i className='fas fa-circle'></i>
                        {item.status}
                      </td>
                      <td>
                        <div className='edit-container'>
                          <i className='fas fa-edit'></i>
                          <span onClick={() => handleGetTicket(item)}>
                            Cập nhật
                          </span>
                          {modalShowUpdate === true ? (
                            <UpdateTicket
                              show={modalShowUpdate}
                              onHideUpdate={() => setModalShowUpdate(false)}
                              currentTicket={ticket}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              : ''}
          </table> */}
          <Table
            dataSource={data}
            pagination={{ pageSize: 8, position: ['bottomCenter'] }}
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
              title='Mã gói'
              dataIndex='bookingcode'
              key='bookingcode'
              render={(text: any) => <div>{text}</div>}
            />

            <Table.Column
              title='Tên gói vé'
              dataIndex='name'
              key='name'
              render={(text: any) => <div>{text}</div>}
            />

            <Table.Column
              title='Ngày áp dụng'
              dataIndex='timeUse'
              key='timeUse'
              render={(text: any) => (
                <>
                  <div>{moment(text.toDate()).format('DD/MM/YYYY')}</div>
                  <div>{moment(text.toDate()).format('hh:mm:ss')}</div>
                </>
              )}
            />

            <Table.Column
              title='Ngày hết hạn'
              dataIndex='timeExpired'
              key='timeExpired'
              render={(text: any) => (
                <>
                  <div>{moment(text.toDate()).format('DD/MM/YYYY')}</div>
                  <div>{moment(text.toDate()).format('hh:mm:ss')}</div>
                </>
              )}
            />

            <Table.Column
              title='Giá vé (VNĐ/Vé)'
              dataIndex='price'
              key='price'
              render={(text: any) => <div>{text} VNĐ</div>}
            />

            <Table.Column
              title='Giá Combo (VNĐ/Combo)'
              dataIndex='priceCombo'
              key='priceCombo'
              render={(text: any, record: any) => (
                <div>
                  {record.priceCombo && record.priceCombo !== 0
                    ? `${record.priceCombo} VNĐ/${record.ticketNumber} vé`
                    : ''}
                </div>
              )}
            />

            <Table.Column
              title='Tình trạng'
              dataIndex='status'
              key='status'
              render={(text: any) => (
                <div className={text && text === 'Tắt' ? 'expired' : 'unused'}>
                  <i className='fas fa-circle'></i>
                  {text}
                </div>
              )}
            />

            <Table.Column
              dataIndex='id'
              key='id'
              render={(record: any, item: any) => (
                <div className='edit-container'>
                  <i className='fas fa-edit'></i>
                  <span onClick={() => handleGetTicket(item)}>Cập nhật</span>
                  {modalShowUpdate === true ? (
                    <UpdateTicket
                      show={modalShowUpdate}
                      onHideUpdate={() => setModalShowUpdate(false)}
                      currentTicket={ticket}
                    />
                  ) : (
                    ''
                  )}
                </div>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ticketCombo: state.ticketCombo,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCombo: () => dispatch(fetchTicketCombo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Service)
