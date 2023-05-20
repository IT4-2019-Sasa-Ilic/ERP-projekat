import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import { logout } from '../redux/actions/userActions'

const HeaderComponent = () => {

const cart = useSelector((state) => state.cart)
const { cartItems } = cart
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin
const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();

const dispatch = useDispatch()
const logoutHandler = () => {
  dispatch(logout())
}
const submitHandler = (e) => {
  if (e.keyCode && e.keyCode !== 13) return;
  e.preventDefault();
  if (searchQuery.trim()) {
   window.location.assign(`/product-list/search/${searchQuery}`);
}
}

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">EV-RIDE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
            <Form.Control style = {{width:400,padding:5}} onKeyUp={submitHandler} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Unesite pojam za pretragu ..." />
              <Button onClick={submitHandler} variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
          {userInfo==null ?
          (<><LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link>Napravi nalog</Nav.Link>
        </LinkContainer></>) : userInfo.korisnik.isAdmin ? (
             <NavDropdown
             title={`${userInfo.korisnik.ime} ${userInfo.korisnik.prezime}`}
             id="collasible-nav-dropdown"
           >
             <NavDropdown.Item
               eventKey="/admin/orders"
               as={Link}
               to="/admin/orders"
             >
              Admin dashboard
             </NavDropdown.Item>
             <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                Moj profil
              </NavDropdown.Item>
             <NavDropdown.Item onClick={() => logoutHandler()}>
               Logout
             </NavDropdown.Item>
           </NavDropdown>
          ) : userInfo!=null ? (
          <>
            <NavDropdown
              title={`${userInfo.korisnik.ime} ${userInfo.korisnik.prezime}`}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                eventKey="/user/my-orders"
                as={Link}
                to="/user/my-orders"
              >
               Moje porudzbine
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                Moj profil
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => logoutHandler()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>

              
            </>
          ): (<></>) }
            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                { cartItems.length === 0 ? "" : cartItems.length }

                </Badge>
                <i className="bi bi-cart-dash"></i>
                <span className="ms-1">Korpa</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;

