import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../redux/actions/orderActions";
import axios from 'axios'

const UserOrderDetailsPage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleCheckout = (e) =>{
    e.preventDefault();
    axios
      .post(`/api/stripe/create-checkout-session`, {
        cartItems:order.stavkePorudzbine,
        userId: userInfo.korisnik._id,
        order_id:order._id,
        fromOrderPage:true
            })
      .then((response) => {
        if (response.data.url) {
            window.location.assign(response.data.url)
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
      dispatch(getOrderDetails(id))
}, [dispatch,id])

  return (
    <Container fluid>
       {loading ? (
          <h2>Učitavanje detalja porudzbine ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
      <Row className="mt-4">
        <h1>Detalji porudbzine</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Podaci za dostavu</h2>
              <b>Ime i prezime:</b>{order.korisnik_id.ime + " " + order.korisnik_id.prezime} <br />
              <b>Addresa za dostavu</b>: {order.korisnik_id.ulica + "," +order.korisnik_id.ptt + " " + order.korisnik_id.grad + "," + order.korisnik_id.drzava} <br />
              <b>Broj telefona</b>: {order.korisnik_id.broj_telefona}
            </Col>
            <Col md={6}>
              <h2>Nacin placanja</h2>
              <Form.Select value={order.nacin_placanja} disabled={true}>
                <option value="pp">{order.nacin_placanja}</option>
                <option value="cod">
                  Plaćanje pouzećem
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
              <Alert
                  className="mt-3"
                  variant={order.status_porudzbine =="Isporuceno" ? "success" : "danger"}
                >
                  {order.status_porudzbine =="Isporuceno" ? (
                    <>Porudzina isporucena {order.datum_isporuke.substring(0,10)}</>
                  ) : (
                    <>Porudzina nije isporucena</>
                  )}
                </Alert>
              </Col>
              <Col>
              <Alert className="mt-3" variant={order.placeno ? "success" : "danger"}>
                  {order.placeno ? <>Plaćeno {order.datum_placanja.substring(0,10)}</> : <>Nije plaćeno</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Stavke porudzbine</h2>
          <ListGroup variant="flush">
            {order.stavkePorudzbine.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Pregled porudbzine</h3>
            </ListGroup.Item>
            <ListGroup.Item>
             Ukupna cena sa dostavom: <span className="fw-bold">{order.ukupna_cena} $</span>
            </ListGroup.Item>
            {!order.placeno? (
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={handleCheckout}
                  variant="danger"
                  type="button"
                >
                  Plati
                </Button>
              </div>
            </ListGroup.Item>
            ):(<></>)}
          </ListGroup>
        </Col>
      </Row>
      </>
      )}
    </Container>
  );
};

export default UserOrderDetailsPage;

