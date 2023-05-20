import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import React, {useEffect } from 'react'
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      window.location.assign('/') 
    }
    
  }, [userInfo])

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

 
      return (
    <Container>
    <Row className="mt-5 justify-content-md-center">
      <Col md={6}>
        <h1>Login</h1>
        <Form noValidate  onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              name="email"
              required
              type="email"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              name="password"
              required
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Row className="pb-2">
            <Col>
             Nemate nalog?
              <Link to={"/register"}> Registruj se </Link>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            {userInfo &&
            userInfo.loading === true ? (
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
            Login
          </Button>
          <Alert
              show={
                error!=null
              }
              variant="danger"
            >
              {error}
            </Alert>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default LoginPage;

