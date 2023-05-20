import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../components/CartItemComponent";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,removeFromCart } from '../redux/actions/cartActions'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  console.log(cartItems)

  const dispatch = useDispatch()

  const changeCount = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Container fluid>
      <h1>Korpa</h1>
      {cartItems.length === 0 ? (
          <Alert variant="info">Korpa je trenutno prazna</Alert>
          ):(
      <Row className="mt-4">
        <Col md={8}>
            <ListGroup variant="flush">
            {cartItems.map((item,idx) => (
               <CartItemComponent
               item={item}
               key={idx}
               changeCount={changeCount}
               removeFromCartHandler={removeFromCartHandler}
             />
            ))}
          </ListGroup>
          
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
            <h3>Ukupno ({cartItems.length} {cartItems.length === 1 ? "proizvod" : "proizvoda"})</h3>            </ListGroup.Item>
            <ListGroup.Item>
              Cena: <span className="fw-bold">{cartItems
                .reduce((acc, item) => acc + item.kolicina * item.cena, 0)
                .toFixed(2)} $</span>
            </ListGroup.Item>
            {userInfo==null ? (<>
            <ListGroup.Item>
              <LinkContainer to="/login">
                <Button type="button">Ulogujte se</Button>
              </LinkContainer>
            </ListGroup.Item></>):(<>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button type="button">Nastavite</Button>
              </LinkContainer>
            </ListGroup.Item></>)}
          </ListGroup>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default CartPage;

