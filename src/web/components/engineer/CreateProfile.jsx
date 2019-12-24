import React from 'react'
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { getJwt } from '../../helper/jwt'

class CreateProfile extends React.Component{

  constructor(){
    super()
    const jwt = getJwt()
    this.state = {
      name: '',
      description: '',
      skill: '',
      location: '',
      date_of_birth: '',
      showcase: '',
      expected_salary: '',
      email: jwt.email,
      phone: ''
    }
  }

  handleCreate(e){
    e.preventDefault()
    const jwt = getJwt()
    const api = process.env.REACT_APP_API_URL+'/api/v1/engineer'
    const data = {
      name: this.state.name,
      description: this.state.description,
      skill: this.state.skill,
      location: this.state.location,
      dateOfBirth: this.state.date_of_birth,
      showcase: this.state.showcase,
      expectedSalary: this.state.expected_salary,
      email: this.state.email,
      phone: this.state.phone,
    } 
    axios.post(api, data, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }})
    .then(res => {
      this.setState({registerMessage: res.data.message})
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err)
    })
  }


  render(){
    console.log(this.state.email)
    return (
      <>
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                  as="textarea"
                  name="description" 
                  type="text" 
                  onChange={ (e) => { this.setState({ description: e.target.value })}}
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Skill</Form.Label>
                  <Form.Control 
                  name="skill" 
                  type="text" 
                  onChange={ (e) => { this.setState({ skill: e.target.value })}} 
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
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control 
                  name="date_of_birth" 
                  type="date"
                  onChange={ (e) => { this.setState({ date_of_birth: e.target.value })}}
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Showcase</Form.Label>
                  <Form.Control 
                  name="showcase" 
                  type="text" 
                  onChange={ (e) => { this.setState({ showcase: e.target.value })}} 
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Expected Salary</Form.Label>
                  <Form.Control 
                  name="expected_salary" 
                  type="text"
                  onChange={ (e) => { this.setState({ expected_salary: e.target.value })}} 
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control 
                  name="phone" 
                  type="number"
                  onChange={ (e) => { this.setState({ phone: e.target.value })}} 
                  required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                  name="email" 
                  type="email"
                  value={this.state.email} disabled/>
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

export default withRouter(CreateProfile)