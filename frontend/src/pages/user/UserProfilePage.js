import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { getUserDetails,updateUserProfile } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const UserProfilePage = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user } = userDetails;
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile
  const [userUpdated,setUserUpdated] = useState(false);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if(!user||!user.ime)
      dispatch(getUserDetails())
      setUserUpdated(false)

        
  }, [dispatch, userInfo, user,userUpdated])

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

  const form = event.currentTarget.elements;
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
    password &&
    name &&
    lastName &&
    form.password.value === form.confirmPassword.value
  ) {
    dispatch(updateUserProfile(user._id,name,lastName, password,phoneNumber,street,city,country,ptt,district))
    setUserUpdated(true)
  }


  setValidated(true);
};
  return (
        

    <Container>
          {loading ? (
      <h2>Učitavanje profila ...</h2>
    ) : error ? (
      <h2>{error}</h2>
    ) : (
      <>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Izmeni profil</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.ime}
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
                defaultValue={user.prezime}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Obavezno je uneti prezime
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                disabled
                defaultValue={user.email}
                name="email" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite broj telefona"
                defaultValue={user.broj_telefona}
                name="phoneNumber" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStreet">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ulicu"
                defaultValue={user.ulica}
                name="street" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Drzava</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite drzavu"
                defaultValue={user.drzava}
                name="country" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPtt">
              <Form.Label>PTT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite postanski broj"
                defaultValue={user.ptt}
                name="ptt" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Grad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                defaultValue={user.grad}
                name="city" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>Okrug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite okrug"
                defaultValue={user.okrug}
                name="district"            
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Unesite ispravnu lozinku
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Lozinka mora imati minimum 6 karaktera
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Potvrdite lozinku</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Potvrdite lozinku"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}

              />
              <Form.Control.Feedback type="invalid">
                Lozinke se ne podudaraju!
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">Ažuriraj</Button>
            <Alert show={ error!=null} variant="danger">
                {error}
            </Alert>
            <Alert show={success===true} variant="info">
              Podaci uspešno ažurirani!
            </Alert>
          </Form>
        </Col>
      </Row>    </>
    )}
    </Container>

  );
};

export default UserProfilePage;

