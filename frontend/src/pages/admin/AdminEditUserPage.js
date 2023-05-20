import {
  Row,
  Col,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUserDetailsForAdmin, updateUserByAdmin } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";

const AdminEditUserPage = () => {
  const [validated, setValidated] = useState(false);
  const { loading, error, user,isAdmin } = useSelector(state => state.userDetailsForAdmin);

  const [isAdminState, setIsAdminState] = useState(isAdmin);

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetailsForAdmin(id))
    setIsAdminState(isAdmin)
}, [dispatch,id,isAdmin])

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const isAdmin = form.isAdmin.checked;
    if (event.currentTarget.checkValidity() === true) {
      dispatch(updateUserByAdmin(id,isAdmin))
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={2}>
          <Link to="/admin/users/" className="btn btn-info my-3">
            Vrati se nazad
          </Link>
        </Col>
        <Col md={8}>
          <h1>Izmeni korisnika</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control disabled name="name" required type="text" defaultValue={user.ime} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicLastName"
            >
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                disabled
                name="lastName"
                required
                type="text"
                defaultValue={user.prezime}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control disabled name="email" required type="email" defaultValue={user.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check name="isAdmin" type="checkbox" label="Admin" checked={isAdminState} onChange={(e) => setIsAdminState(e.target.checked)}  />
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

export default AdminEditUserPage;

