import React from 'react'
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { getJwt } from '../../helper/jwt'
import Header from '../../components/Header'

class CreateCompanyProfile extends React.Component{

  constructor(){
    super()
    this.state = {
      name: '',
      location: '',
      description: ''
    }
  }

  handleCreate(e){
    e.preventDefault()
    const jwt = getJwt()
    const api = 'http://localhost:8080/api/v1/engineer'
    const data = {
      name: this.state.name,
      location: this.state.location,
      description: this.state.description
    } 
    axios.post(api, data, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }})
    .then(res => {
      this.setState({registerMessage: res.data.message})
      this.props.history.push("/company");
    })
    .catch(err => {
      console.log(err)
    })
  }


  render(){
    console.log(this.state.email)
    return (
      <>
      <Header />
      <Row className="justify-content-center mt-3">
        <Col md="4">
          <Alert variant="warning">
            You have not created your profile, please create one.
          </Alert>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 mb-5" >
        <Col md='4'>
          <Card>
            <Card.Header className="text-center"><h3>CREATE PROFIL</h3>
            </Card.Header>
            <Card.Body>
              <Form method="POST" onSubmit={ (e) => this.handleCreate(e)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    name="name" 
                    type="text"
                    onChange={ (e) => { this.setState({ name: e.target.value })}}
                    required
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                  name="location" 
                  type="text" 
                  onChange={ (e) => { this.setState({ location: e.target.value })}} 
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                  as="textarea"
                  name="description" 
                  type="text" 
                  onChange={ (e) => { this.setState({ description: e.target.value })}}
                  required
                  />
                </Form.Group>
                <Form.Group className="text-center">
                  <Button variant="primary" type="submit" className="pl-5 pr-5 mr-2">Save</Button>
                  <Link to={{
                    pathname:'/detail',
                    editProfil: false
                  }}>
                  <Button variant="danger">Cancel</Button>
                  </Link>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(CreateCompanyProfile)