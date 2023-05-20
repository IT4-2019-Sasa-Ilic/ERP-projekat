import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions'

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const userRegister = useSelector((state) => state.userRegister)
  const { success,loading, error, userInfo } = userRegister
  const dispatch = useDispatch()

  const [passwordsMatchState, setPasswordsMatchState] = useState(true);


  useEffect(() => {
    if (userInfo) {
      window.location.assign('/') 
    }
  }, [ userInfo])


  const onChange = () => {
      const password = document.querySelector("input[name=password]")
      const confirm = document.querySelector("input[name=confirmPassword]")
      if(confirm.value === password.value) {
        setPasswordsMatchState(true);
      } else {
        setPasswordsMatchState(false);
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    const phoneNumber = form.phoneNumber.value;
    const street = form.street.value;
    const city = form.city.value;
    const country = form.country.value;
    const ptt = form.ptt.value;
    const district = form.district.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      form.password.value === form.confirmPassword.value
    ) {
      dispatch(register(name,lastName, email, password,phoneNumber,street,city,country,ptt,district))
    }
    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Napravite nalog</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Unesite ime"
                name="name"
                
              />
              <Form.Control.Feedback type="invalid">
                Obavezno je uneti ime
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Unesite prezime"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Obavezno je uneti prezime
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Unesite broj telefona"
                name="phoneNumber"
              />
              <Form.Control.Feedback type="invalid">
               Unesite broj telefona
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStreet">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ulicu"
                name="street"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Grad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite grad"
                name="city"              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Drzava</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite drzavu"
                name="country"              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPtt">
              <Form.Label>PTT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite postanski broj"
                name = "ptt"             />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDistrict">
              <Form.Label>Okrug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite okrug"
                name="district"             />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Unesite e-mail adresu"
              />
              <Form.Control.Feedback type="invalid">
               Molimo unesite e-mail adresu u ispravnom formatu
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Unesite lozinku"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravnu lozinku
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Lozinka mora imati minimum 6 karaktera
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Ponovite lozinku</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Ponovite lozinku"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Lozinke moraju da se podudaraju
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Već imate nalog?
                <Link to={"/login"}> Ulogujte se </Link>
              </Col>
            </Row>

            <Button type="submit">
              {loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Registruj se
            </Button>
            <Alert show={ error!=null} variant="danger">
                {error}
            </Alert>
            <Alert show={success===true} variant="info">
                Nalog uspesno napravljen!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;

