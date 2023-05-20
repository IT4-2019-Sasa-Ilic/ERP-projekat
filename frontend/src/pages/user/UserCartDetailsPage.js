import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { createOrder } from "../../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

const UserCartDetailsPage = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const [paymentMethod, setPaymentMethod] = useState('Stripe')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const orderHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    dispatch(createOrder(cartItems,paymentMethod))
    navigate('/shipping') 
  }

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
}

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Vaša korpa</h1>
        <Col md={8}>
          <br />
          <Row>

            <Col md={6}>
              <h2>Način plaćanja</h2>
              <Form.Select onChange={choosePayment}>
                <option value="Stripe">Stripe</option>
                <option value="Placanje pouzecem">
                  Plaćanje pouzecem
                </option>
              </Form.Select>
            </Col>
          </Row>
          <br />
          <h2>Stavke porudzbine</h2>
                    <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Pregled porudzbine</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Cena bez dostave: <span className="fw-bold">{cartItems
                .reduce((acc, item) => acc + item.kolicina * item.cena, 0)
                .toFixed(2)} RSD</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" type="button" onClick={orderHandler}>
                  Nastavite
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPage;

