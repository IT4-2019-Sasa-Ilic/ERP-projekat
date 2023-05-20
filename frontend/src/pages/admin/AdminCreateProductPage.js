import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Alert
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect } from 'react'
import { createProduct } from "../../redux/actions/productActions";
import { uploadImagesApiRequest } from "../../utils/utils"
import { createCategory, deleteCategory, getCategories } from "../../redux/actions/categoryActions";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import { useNavigate } from "react-router-dom";

const AdminCreateProductPage = () => {
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState(false);

  const { error } = useSelector(state => state.productCreate);
  const { categories } = useSelector((state) => state.categories);
  const {error:errorCreate,success} = useSelector((state)=>state.categoryCreate);
  const {success:successDelete} = useSelector((state)=>state.categoryDelete);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    dispatch(getCategories())
  }, [dispatch,success,successDelete])

  const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

  const submitHandler = (e) => {
    e.preventDefault()
    const form = e.currentTarget.elements;
    const name= form.name.value;
    const description= form.description.value;
    const count= form.count.value;
    const price= form.price.value;
    const category= form.category.value;
   const id = ObjectId();
   if (e.currentTarget.checkValidity() === true) {
    dispatch(createProduct(id,name, description,category,count,price))
    if(!error) {
      console.log(id)
      setTimeout(function () {
        dispatch(uploadImagesApiRequest(images,id))
    }, 500)
    setTimeout(function () {
      navigate("/admin/products");
  }, 300)
      
    }
    setValidated(true);
  }
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      dispatch(createCategory(e.target.value));
      setTimeout(() => {
        e.target.value=""
      }, 200);
    }
  };
  const deleteCategoryHandler = (e) => {
    let element = document.getElementById("cats");
    dispatch(deleteCategory(element.value));
    element.value =""
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
          <h1>Dodaj novi proizvod</h1>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Naziv proizvoda</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Opis proizvoda</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Kolicina na stanju</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Cena</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>
                Kategorija
                <CloseButton onClick={deleteCategoryHandler} />(
                <small>Obrisi izabranu kategoriju</small>)
              </Form.Label>
              <Form.Select
               id="cats"
               required
               name="category"
               aria-label="Default select example"
              >
                <option value="">Izaberi kategoriju</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category.naziv_kategorije}>
                    {category.naziv_kategorije}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Kreiraj novu kategoriju{" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />            </Form.Group>
            <Alert show={ errorCreate!=null} variant="danger">
            {errorCreate}           
            </Alert>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Slike proizvoda</Form.Label>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => uploadHandler(e.target.files)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Kreiraj
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;

