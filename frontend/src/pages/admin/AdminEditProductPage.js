import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, updateProduct } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import { deleteImagesApiRequest, uploadImagesApiRequest } from "../../utils/utils"

const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(3)",
}

const AdminEditProductPage = () => {
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const { loading, error, product } = useSelector(state => state.product);
  const { categories } = useSelector((state) => state.categories);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const productUpdate = useSelector((state) => state.productUpdate)
  const { success } = productUpdate
  const [images, setImages] = useState(false);

  const imageDeleteHandler = async (url,id) => {
    if (window.confirm("Da li ste sigurni da zelite da obrisete izabranu sliku?")) {
         dispatch(deleteImagesApiRequest(url,id))
         setDeleted(true)
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(id))
    dispatch(getCategories())
    setDeleted(false)
}, [dispatch,id,deleted,success,images])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget.elements;
    const name= form.name.value;
    const description= form.description.value;
    const count= form.count.value;
    const price= form.price.value;
    const category= form.category.value;
    if (e.currentTarget.checkValidity() === true) {
      dispatch(updateProduct(id,name, description,category,count,price))
      if(images) {
        dispatch(uploadImagesApiRequest(images,id))
        setImages(false);
    }
    }

    setValidated(true);
  };
  const uploadHandler = (images) => {
    setImages(images);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={2}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Vrati se nazad
          </Link>
        </Col>
        <Col md={8}>
          <h1>Izmeni proizvod</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Naziv proizvoda</Form.Label>
              <Form.Control name="name" required type="text" defaultValue={product.naziv_proizvoda} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Opis</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.opis_proizvoda}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Kolicina na stanju</Form.Label>
              <Form.Control name="count" required type="number" defaultValue={product.kolicina} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" defaultValue={product.cena} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Kategorija
                
              </Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
              >
                <option value="">Izaberi kategoriju</option>
                {categories.map((category, idx) => {
                  return product.kategorija_id === category._id ? (
                    <option selected key={idx} value={category.naziv_kategorije}>
                     {category.naziv_kategorije}
                    </option>
                  ) : (
                    <option key={idx} value={category.naziv_kategorije}>
                    {category.naziv_kategorije}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Slike proizvoda</Form.Label>
              <Row>
                {product.slike &&
                  product.slike.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image
                        crossOrigin="anonymous"
                        src={image.url ?? null}
                        fluid
                      />
                      <i style={onHover} onClick={() => imageDeleteHandler(image.url, product._id)} className="bi bi-x text-danger"></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control                 
                type="file"
                multiple
                onChange={(e) => uploadHandler(e.target.files)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ažuriraj
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPage;

