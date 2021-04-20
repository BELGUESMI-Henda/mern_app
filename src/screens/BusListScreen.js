import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listBuses,
  deleteBus,
  createBus,
} from '../actions/busActions'
import { BUS_CREATE_RESET } from '../constants/busConstants'

const BusListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const busList = useSelector((state) => state.busList)
  const { loading, error, buses, page, pages } = busList

  const busDelete = useSelector((state) => state.busDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = busDelete

  const busCreate = useSelector((state) => state.busCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bus: createdBus,
  } = busCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BUS_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/bus/${createdBus._id}/edit`)
    } else {
      dispatch(listBuses('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdBus,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBus(id))
    }
  }

  const createBusHandler = () => {
    dispatch(createBus())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>BUSES</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBusHandler}>
            <i className='fas fa-plus'></i> Create Bus destination
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DESTINATION</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus._id}</td>
                  <td>{bus.destination}</td>
                  <td>${bus.price}</td>
                  <td>{bus.category}</td>
                  <td>{bus.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/bus/${bus._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(bus._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default BusListScreen
