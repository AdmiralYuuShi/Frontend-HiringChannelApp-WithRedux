import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Form, Row, Col, Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import EditProfil from './EditProfil'
import { getJwt } from '../../helper/jwt'

class DetailCompany extends Component {
  constructor(){
    super()

    this.state = {
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
      message: undefined
    }
  }

  componentDidMount(){
    // do something after component mounted 
    this.getCompanies(process.env.REACT_APP_API_URL+'/api/v1/company/'+this.props.location.companyId)
  }

  handleEdit(){
    this.setState({editProfil: true})
    console.log(this.state.editProfil)
  }

  handleDelete(){
    const jwt = getJwt()
    axios.delete(process.env.REACT_APP_API_URL+'/api/v1/company/'+this.state.company_id, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }} )
    .then(res => {
      this.props.history.push("/");
    })
    .catch(err => {

    })
  }

  changeLogo(e){
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', this.state.company_logo)
    const jwt = getJwt()
    const config = (
      { headers: { 'Content-type':'multipart/form-data', Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }}
    )
    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/company/changeLogo/${this.state.company_id}`, formData, config)
      .then( res=>{
        this.setState({
          message: 'Update Success!'
        })
      })
      .catch(err=>{
        console.log(err)
        this.setState({
          message: 'Update Failed!'
        })
      })
  }

  getCompanies(url){
    console.log(url)
    axios.get(url)
    .then(res => {
      this.setState({
        company_id: res.data.data[0].company_id,
        user_id: res.data.data[0].user_id,
        name: res.data.data[0].name,
        logo: res.data.data[0].logo,
        description: res.data.data[0].description,
        location: res.data.data[0].location,
        date_updated: res.data.data[0].date_updated,
        date_created: res.data.data[0].date_created
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


    render(){
      const jwt = getJwt()
        return(
          <>
          <Header />
          <Card body className="pr-5 pl-5 pb-3 mb-5 mr-5 ml-5 mt-3 bg-light">
          <Row className="justify-content-center mt-3">
            <Col md='4' className="text-center">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/images/'+this.state.logo} />
                <ListGroup className="list-group-flush">
                  <ListGroup.Item variant="primary"><h3>{this.state.name}</h3></ListGroup.Item>
                </ListGroup>
              </Card>
              { this.state.user_id === jwt.userId ? 
               <Form method="POST" onSubmit={ (e) => this.changeLogo(e)}>
               <div className="input-group pr-5 text-left">
                 <div className="custom-file">
                   <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(e) => this.setState({ company_logo: e.target.files[0]})} />
                   <label className="custom-file-label">Choose file</label>
                 </div>
                 <div className="input-group-append pr-3">
                   <button className="btn btn-success" type="submit" id="inputGroupFileAddon04">Upload</button>
                 </div>
               </div>
               </Form>
              :
              <div></div>
              }
            </Col>
            <Col md="4">
            {this.state.editProfil === true ? 
            <EditProfil companyId={this.state.company_id}/>
            :
            <ListGroup>
              <ListGroup.Item><FontAwesomeIcon icon={faUsers} size="lg" /> {this.state.description}</ListGroup.Item>
              <ListGroup.Item><FontAwesomeIcon icon={faMapMarkedAlt} size="lg" /> {this.state.location}</ListGroup.Item>
              { this.state.user_id === jwt.userId ? 
              <ListGroup.Item className="text-center">
                <ButtonGroup aria-label="Basic example">
                  <Button variant="primary" onClick={ () => this.handleEdit()}>Edit Profile</Button>
                  <Button variant="danger" onClick={ () => this.handleDelete()}>Delete Profile</Button>
                </ButtonGroup>
              </ListGroup.Item>
              :
              <div></div>
              }
            </ListGroup>
            }
            </Col>
          </Row>
          </Card>
          </>
        )
    }
}

export default withRouter(DetailCompany)