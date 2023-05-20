import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from 'react-redux'
import ImageZoom from "js-image-zoom";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from '../redux/actions/cartActions'
import { createReview, getReviews } from "../redux/actions/reviewActions";
import moment from "moment";
import { CREATE_REVIEW_RESET } from "../redux/constants/reviewConstants";


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const userLogin = useSelector((state) => state.userLogin);
  const { loadingUserInfo, erroruserInfo, userInfo } = userLogin;

  const [showCartMessage, setShowCartMessage] = useState(false);
  const { loading, error, product } = useSelector(state => state.product);
  const { reviews } = useSelector(state => state.reviews);
  const { errorReviews } = useSelector(state => state.createReview);
  const [productReviewed, setProductReviewed] = useState(false);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    setShowCartMessage(true);
  };


  useEffect(() => {
    dispatch(getProductDetails(id))
    dispatch({ type: CREATE_REVIEW_RESET })
    dispatch(getReviews(id))
}, [dispatch,id,productReviewed])

const submitHandler = (e) => {
    e.preventDefault()
    const form = e.currentTarget.elements;
    const comment= form.comment.value;
    const rating=form.rating.value;
    console.log(comment)
      dispatch(createReview(id, comment,rating))
      if(!errorReviews){
        setTimeout(function () {
          setProductReviewed()
        }, 500)
      }
  }
  
  useEffect(() => {
    if (product.slike) {
      var options = {
        scale: 0.9,
        offset: { vertical: 0, horizontal: 0 },
      };

      product.slike.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  });
  return (
    <Container>
       <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>Proizvod je uspesno dodat u korpu!</Alert.Heading>
    </Alert>
      <Row className="mt-5">
      {loading ? (
          <h2>Učitavanje detalja o proizvodu ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              {product.slike
                ? product.slike.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          fluid
                          src={`${image.url ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
            </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.naziv_proizvoda}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={product.prosecna_ocena}/> ({product.broj_recenzija})
                </ListGroup.Item>
                <ListGroup.Item>
                  Cena <span className="fw-bold">{product.cena} RSD</span>
                </ListGroup.Item>
                <ListGroup.Item>
                 {product.opis_proizvoda}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: {product.kolicina > 0 ? "Na stanju" : "Nije na stanju"}</ListGroup.Item>
                <ListGroup.Item>
                  Ukupno: <span className="fw-bold">${product.cena * quantity}</span>
                </ListGroup.Item>
                {product.kolicina > 0 && (
                <ListGroup.Item>
                  Količina:
                  <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="Default select example"
                      >
                        {[...Array(product.kolicina).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                </ListGroup.Item>
                  )}

                <ListGroup.Item>
                <Button onClick={addToCartHandler} variant="danger" disabled={product.kolicina === 0}
>
                Dodaj u korpu
                </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>RECENZIJE</h5>
              <ListGroup variant="flush">
              {reviews.map((review,idx) => (
                  <ListGroup.Item key={idx}>
                    {review.korisnik.ime} <br />
                    <Rating readonly size={20} initialValue={review.ocena} />
                    <br />
                    {moment(review.datum).utc().format('DD-MM-YYYY')}<br />
                   {review.opis_recenzije}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ostavite recenziju</Form.Label>
              <Form.Control name="comment" required as="textarea" disabled={!userInfo} rows={3} />
            </Form.Group>
            <Form.Select name="rating" required disabled={!userInfo} aria-label="Default select example">
            <option value="">Vaša ocena</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
            </Form.Select>
            <Button disabled={!userInfo} type="submit" className="mb-3 mt-3" variant="primary">
              Oceni
            </Button>
            <Alert show={ errorReviews!=null} variant="danger">
            {errorReviews}           
            </Alert>
          </Form>

        </Col>
        </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;

