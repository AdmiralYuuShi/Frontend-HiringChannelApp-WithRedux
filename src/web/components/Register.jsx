import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'

class Register extends React.Component{

  constructor(){
    super()
    this.state = {
      email: null,
      username: null,
      password: null,
      role: 'engineer',
      registerMessage: ''
    }
  }

  handleRegister(e){
    e.preventDefault()
    const api = 'http://localhost:8080/api/v1/user/register'
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    } 
    axios.post(api, data)
    .then(res => {
      console.log(res)
      this.setState({registerMessage: res.data.message})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return (
      <div className="pt-5 pb-5 bg-dark pr-3 pl-3" style={{backgroundSize: 'cover', backgroundImage: 'url(https://www.newhorizons.com/Portals/278/Images/Blog/How-to-Become-a-Network-Engineer.jpg)'}}>
        <Row className="justify-content-end mr-5">
          <Col md='4'>
            <Card>
              <Card.Header className="text-center"><h3>REGISTER</h3>
              { this.state.registerMessage ?
              <Alert variant="success">
                {this.state.registerMessage}<Link to='/login'> Login Here</Link>
              </Alert> : <>Already have an account? <Link to='/login'>Login Here </Link></> }
              | <Link to='/engineer'> I'm Guess </Link>
              </Card.Header>
              <Card.Body>
                <Form method="POST" onSubmit={ (e) => this.handleRegister(e)}>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      name="email" 
                      type="email" 
                      onChange={ (e) => { this.setState({ email: e.target.value })}}
                      placeholder="Type your email here . . ." 
                      required
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    name="username" 
                    type="text" 
                    onChange={ (e) => { this.setState({ username: e.target.value })}}
                    placeholder="Type your username here . . ." 
                    required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    name="password" 
                    type="password" 
                    onChange={ (e) => { this.setState({ password: e.target.value })}}
                    placeholder="Type your password here . . ." 
                    required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                    as="select" 
                    name="role"
                    onChange={ (e) => { this.setState({ role: e.target.value })}}
                    >
                      <option value="engineer">Select your role (Default : Engineer)</option>
                      <option value="engineer">Engineer</option>
                      <option value="company">Company</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="text-center">
                    <Button variant="primary" type="submit">Register Now</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted text-center">Hiring Channel Web</Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Register