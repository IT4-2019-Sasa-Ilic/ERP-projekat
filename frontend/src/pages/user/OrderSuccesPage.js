import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';

const OrderSuccessPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: CART_CLEAR_ITEMS})
       }, [dispatch]);


  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          <Image src="/images/success-icon.png" alt="Success Icon" fluid style={{ width: '200px', height: 'auto' }}
/>
          <h2 className="mt-4">Porudzbina uspesno plaćena!</h2>
          <p className="text-muted mt-3">Hvala Vam za kupovinu. Vaša porudzbina je uspešno evidentirana,očekujte dostavu.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccessPage;