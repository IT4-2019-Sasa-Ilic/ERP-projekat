import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, removeFromCartHandler = false, orderCreated = false, changeCount = false }) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={item.slika? item.slika:item.proizvod_id.slike[0].url}
              fluid
            />
          </Col>
          <Col md={2}>{item.naziv_proizvoda}</Col>
          <Col md={2}>
            <b>${item.cena}</b>
          </Col>
          <Col md={3}>
            <Form.Select onChange={changeCount ? (e) => changeCount(item.proizvod_id, e.target.value) : undefined } disabled={orderCreated} value={item.kolicina}>
              {[...Array(item.quantity).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <RemoveFromCartComponent
            orderCreated={orderCreated}
            productID={item.proizvod_id}
            quantity={item.kolicina}
            price={item.cena}
            removeFromCartHandler={removeFromCartHandler}
             />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;
