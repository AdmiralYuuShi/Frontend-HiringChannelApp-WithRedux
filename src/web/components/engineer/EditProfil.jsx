import React from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { Card, Button, Form } from 'react-bootstrap'
import { getJwt } from '../../helper/jwt'

import { connect } from 'react-redux'

import { fetchEngineers } from '../../../public/redux/actions/engineers'


class EditProfil extends React.Component{

  constructor(){
    super()

    this.state = {
      editProfil: false,
      engineer_id: null,
      user_id: null,
      name: '',
      description: '',
      skill: '',
      location: '',
      date_of_birth: '',
      showcase: '',
      expected_salary: '',
      email: '',
      phone: '',
      date_created: '',
      date_updated: ''
    }
  }

  componentDidMount(){
    // do something after component mounted
    this.getEngineers(process.env.REACT_APP_API_URL+'/api/v1/engineer/'+this.props.engineerId)
  }

  getEngineers(url){
    axios.get(url)
    .then(res => {
      
      let d = new Date(res.data.data[0].date_of_birth)
      let dob = (d.getUTCMonth()+1) > 9 ? 
        (d.getUTCDate()+1) > 9 ? 
        d.getUTCFullYear()+'-'+(d.getUTCMonth()+1)+'-'+(d.getUTCDate()+1)
        :
        d.getUTCFullYear()+'-'+(d.getUTCMonth()+1)+'-0'+(d.getUTCDate()+1)
      :
        (d.getUTCDate()+1) > 9 ? 
        d.getUTCFullYear()+'-0'+(d.getUTCMonth()+1)+'-'+(d.getUTCDate()+1)
        :
        d.getUTCFullYear()+'-0'+(d.getUTCMonth()+1)+'-0'+(d.getUTCDate()+1)

      this.setState({
        engineer_id: res.data.data[0].engineer_id,
        user_id: res.data.data[0].user_id,
        name: res.data.data[0].name,
        description: res.data.data[0].description,
        skill: res.data.data[0].skill,
        location: res.data.data[0].location,
        date_of_birth: dob,
        showcase: res.data.data[0].showcase,
        expected_salary: res.data.data[0].expected_salary,
        email: res.data.data[0].email,
        phone: res.data.data[0].phone,
        date_created: res.data.data[0].date_created,
        date_updated: res.data.data[0].date_updated
      })
    })
    .catch(err => {
      // console.log(err)
      this.setState({ engineersList: 'not found' })
    })
  }

  handleEdit(e){
    e.preventDefault()
    const jwt = getJwt()
    const api = `${process.env.REACT_APP_API_URL}/api/v1/engineer/${this.state.engineer_id}`
    const data = {
      name: this.state.name,
      description: this.state.description,
      skill: this.state.skill,
      location: this.state.location,
      dateOfBirth: this.state.date_of_birth,
      showcase: this.state.showcase,
      expectedSalary: this.state.expected_salary,
      email: this.state.email,
      phone: this.state.phone
    } 
    axios.put(api, data, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }})
    .then(res => {
      console.log(res)
      this.props.history.push("/engineer");
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return (
      <>
      <Card>
        <Card.Header className="text-center"><h3>EDIT PROFIL</h3>
        </Card.Header>
        <Card.Body>
          <Form method="POST" onSubmit={ (e) => this.handleEdit(e)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                name="name" 
                type="text"
                value={this.state.name}
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
              value={this.state.description}
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
              value={this.state.skill} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control 
              name="location" 
              type="text" 
              onChange={ (e) => { this.setState({ location: e.target.value })}}
              required
              value={this.state.location} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
              name="date_of_birth" 
              type="date"
              value={this.state.date_of_birth}
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
              value={this.state.showcase} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expected Salary ($)</Form.Label>
              <Form.Control 
              name="expected_salary" 
              type="text"
              onChange={ (e) => { this.setState({ expected_salary: e.target.value })}}
              required
              value={this.state.expected_salary} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
              name="email" 
              type="email"
              onChange={ (e) => { this.setState({ email: e.target.value })}}
              required
              value={this.state.email} disabled/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control 
              name="phone" 
              type="text"
              onChange={ (e) => { this.setState({ phone: e.target.value })}}
              required
              value={this.state.phone} />
            </Form.Group>
            <Form.Group className="text-center">
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="danger" onClick={() => this.props.history.goBack()}>Cancel</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
    )
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (api) => dispatch(fetchEngineers(api))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfil))