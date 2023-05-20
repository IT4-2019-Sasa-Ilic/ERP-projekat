import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'

import { Row, Col, Container, ListGroup, Button,Form } from "react-bootstrap";
import { Card} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";
import SortOptionsComponent from "../components/SortOptionsComponent";
import RatingFilterComponent from "../components/filterComponents/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterComponents/CategoryFilterComponent";
import { listProducts } from '../redux/actions/productActions'
import { useParams } from "react-router-dom";



const ProductListPage = () => {
  const [pageNumber, setCurrentPage] = useState(1)
  const [cena, setPrice] = useState(5000)
  const { category } = useParams();
  const {searchQuery} = useParams();
  console.log(category)
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState(category?{[category]:true}:{});
  const [query,SetQuery] = useState(searchQuery?searchQuery:"")
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products,totalProducts } = productList

  useEffect(() => {
    console.log(categoriesFromFilter)
    dispatch(listProducts(cena,pageNumber,ratingsFromFilter,categoriesFromFilter,sortOption,query))
  }, [dispatch,cena,pageNumber,ratingsFromFilter,categoriesFromFilter,sortOption,searchQuery])

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber)
    console.log(pageNumber)
}
const resetFilters = () => {
  window.location.href = "/product-list";
};
  return (
    <Container fluid>
      <Row>
    
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
            <SortOptionsComponent setSortOption={setSortOption} />
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              <Form.Label>
        <span className="fw-bold">Cena ne veća od:</span> {cena} RSD
        </Form.Label>
        <Form.Range min={0} max={10000} step={200} onChange={(e) => setPrice(e.target.value)} />
            </ListGroup.Item>
            <ListGroup.Item>
            <RatingFilterComponent
                setRatingsFromFilter={setRatingsFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
            <CategoryFilterComponent
                  setCategoriesFromFilter={setCategoriesFromFilter}
                  categoryChecked={categoriesFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={resetFilters} variant="danger">
                  Poništi filtere
                </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      
        <Col md={9}>
        {loading ? (
          <h2>Učitavanje detalja o proizvodu ...</h2>
        ) : error ? (
          <h2>Proizvodi po trazenom kriterijumu nisu pronadjeni!</h2>
        ) : (
          <>
          {products.map((product,idx) => (
            <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img variant="top" src={product.slike[0].url} />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{product.naziv_proizvoda}</Card.Title>
            <Card.Text>
             {product.opis_proizvoda}
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={product.prosecna_ocena} /> ({product.broj_recenzija})
            </Card.Text>
            <Card.Text className="h4">
              {product.cena}{" "}RSD{" "}
              <LinkContainer to={`/product-details/${product._id}`}>
                <Button variant="danger">Detaljnije</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
          ))}
           <Pagination
            activePage={pageNumber}
            itemsCountPerPage= {3}
            totalItemsCount={totalProducts}
            onChange={setCurrentPageNumber}
            itemClass="page-item"
            linkClass="page-link"
                            />
                                    </>
        )}
        </Col>

      </Row>
    </Container>
  );
};

export default ProductListPage;



