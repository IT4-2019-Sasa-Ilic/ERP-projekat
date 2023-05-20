import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect } from 'react'
import { getMyOrders } from "../../redux/actions/orderActions";

const UserOrdersPage = () => {
  
  const myOrders = useSelector((state) => state.myOrders);
  const {loading, error, orders } = myOrders;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrders())       
  }, [dispatch])

  return (
    <Row className="m-5">
        {loading ? (
      <h2>Učitavanje podataka o porudzbinama ...</h2>
    ) : error ? (
      <h2>{error}</h2>
    ) : (
      <>
      <Col md={12}>
        <h1>Moje porudzbine</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Status porudzbine</th>
              <th>Datum</th>
              <th>Vrednost porudzbine</th>
              <th>Poruceno proizvoda</th>
              <th>Detalji porudzbine</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, idx)  => (
                <tr key={idx}>
                  <td>{idx +1}</td>
                  <td>{order.status_porudzbine}</td>
                  <td>{order.datum_porudzbine.substring(0,10)}</td>
                  <td>{order.ukupna_cena}</td>
                  <td>{order.kolicina}</td>
                  <td>
                  <Link to={`/user/order-details/${order._id}`}>Vidi detalje porudzbine</Link></td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
      </>
    )}
    </Row>
  );
};

export default UserOrdersPage;

