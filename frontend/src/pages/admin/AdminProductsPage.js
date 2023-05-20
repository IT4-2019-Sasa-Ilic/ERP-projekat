import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteProduct, getProductsListForAdmin } from "../../redux/actions/productActions";
import { PRODUCT_DETAILS_RESET } from "../../redux/constants/productConstants";

const AdminProductsPage = () => {
  const productsList = useSelector((state) => state.productListForAdmin)
  const { loading, error, products } = productsList 
  const productDelete = useSelector((state) => state.productDelete)
  const { success: successDelete } = productDelete

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    if (window.confirm("Da li ste sigurni da zelite da obrisete dati proizvod?")) {
         dispatch(deleteProduct(id))
    }
  };

  useEffect(() => {
    dispatch(getProductsListForAdmin())
    dispatch({type:PRODUCT_DETAILS_RESET})
  }, [dispatch,successDelete])



  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
      {loading ? (
          <h2>Učitavanje proizvoda ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
        <h1>
          Spisak proizvoda {" "}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Dodaj proizvod
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Naziv</th>
              <th>Cena</th>
              <th>Izmeni/Obriši</th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{product._id}</td>
                <td>{product.naziv_proizvoda}</td>
                <td>{product.cena}</td>
                <td>
                  <LinkContainer to={`/admin/edit-product/${product._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" | "}
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}
>
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
        )}
      </Col>
    </Row>
  );
};

export default AdminProductsPage;

