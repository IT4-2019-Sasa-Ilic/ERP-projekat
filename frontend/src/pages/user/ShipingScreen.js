import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';
import { getUserDetails } from '../../redux/actions/userActions';
import axios from 'axios'


const ShippingScreen = ({ history }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const createOrder = useSelector((state) => state.createOrder);
  const { order } = createOrder;
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user||!user.ime) {
      dispatch(getUserDetails())
    }
  }, [dispatch,user]);

  const handleCheckout = (e) =>{
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    axios
      .post(`/api/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
        order_id:order._id
            })
      .then((response) => {
        if (response.data.url) {
            window.location.assign(response.data.url)
        }
      })
      .catch((err) => console.log(err.message));
  };


  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">Podaci za dostavu</h1>
          <Form >
            <Form.Group controlId="address">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ulicu"
                value={user.ulica}
                required
                onChange={(e) => setAddress(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>Grad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite grad"
                value={user.grad}
                required
                onChange={(e) => setCity(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postanski broj</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite postanski broj"
                value={user.ptt}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Drzava</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite drzavu"
                value={user.drzava}
                required
                onChange={(e) => setCountry(e.target.value)}
                className="mb-4"
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" onClick={(e) => {handleCheckout(e)}}>
              Plati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
