import React from 'react'
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'

class Register extends React.Component{

  constructor(){
    super()
    this.state = {
      email: null,
      username: null,
      password: null,
      role: null,
      registerMessage: ''
    }
  }

  handleLogin(e){
    e.preventDefault()
    const api = process.env.REACT_APP_API_URL+'/api/v1/user/login'
    const data = {
      username: this.state.username,
      password: this.state.password
    } 
    axios.post(api, data)
    .then(res => {
      localStorage.setItem('jwtToken', res.data.token)
      localStorage.setItem('userId', res.data.user.userId)
      localStorage.setItem('email', res.data.user.email)
      localStorage.setItem('role', res.data.user.role)
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return (
      <div className="pt-5 pb-5 bg-dark pr-3 pl-3" style={{backgroundSize: 'cover', backgroundImage: 'url(https://s3-ap-southeast-1.amazonaws.com/ekrutassets/blogs/images/000/001/790/original/perbedaan-data-engineer-dan-data-scientist-EKRUT.jpg?1558276947)'}}>
        <Row className="justify-content-end mr-5 pt-5 mt-4 pb-5 mb-5">
          <Col md='4'>
            <Card>
              <Card.Header className="text-center"><h3>LOGIN</h3>
                <>Not have any account yet? <Link to='/Register'>Register Here</Link></><br/><Link to='/engineer'> I'm Guess </Link>
              </Card.Header>
              <Card.Body>
                <Form method="POST" onSubmit={ (e) => this.handleLogin(e)}>
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
                  <Form.Group className="text-center">
                    <Button variant="success" type="submit">Login Now</Button>
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

export default withRouter(Register)