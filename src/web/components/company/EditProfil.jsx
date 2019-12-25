import React from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { Card, Button, Form } from 'react-bootstrap'
import { getJwt } from '../../helper/jwt'

class EditProfil extends React.Component{

  constructor(){
    super()

    this.state = {
      CompaniesList: null,
      editProfil: false,
      company_id: null,
      user_id: undefined,
      name: undefined,
      logo: 'no-image.png',
      company_logo: null,
      description: undefined,
      location: undefined,
      date_created: null,
      date_updated: null,
      message: ''
    }
  }

  componentDidMount(){
    // do something after component mounted
    this.getCompanies(process.env.REACT_APP_API_URL+'/api/v1/company/'+this.props.companyId)
  }

  getCompanies(url){
    axios.get(url)
    .then(res => {
      this.setState({
        company_id: res.data.data[0].company_id,
        user_id: res.data.data[0].user_id,
        name: res.data.data[0].name,
        description: res.data.data[0].description,
        location: res.data.data[0].location,
        logo: res.data.data[0].location,
        date_created: res.data.data[0].date_created,
        date_updated: res.data.data[0].date_updated
      })
    })
    .catch(err => {
      // console.log(err)
      this.setState({ CompaniesList: 'not found' })
    })
  }

  handleEdit(e){
    e.preventDefault()
    const jwt = getJwt()
    const api = `${process.env.REACT_APP_API_URL}/api/v1/company/${this.state.company_id}`
    const data = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
    } 
    axios.put(api, data, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }})
    .then(res => {
      console.log(res)
      this.props.history.push("/company");
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
                defaultValue={this.state.name}
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
              defaultValue={this.state.description}
              onChange={ (e) => { this.setState({ description: e.target.value })}}
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
              defaultValue={this.state.location} />
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

export default withRouter(EditProfil)