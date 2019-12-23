import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Form, Row, Col, Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faTag, faMoneyBillWave, faPhoneSquare, faCode, faMapMarkedAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'
import EditProfil from './EditProfil'
import { getJwt } from '../helper/jwt'

class DetailEngineer extends Component {
  constructor(){
    super()

    this.state = {
      editProfil: false,
      engineer_id: null,
      user_id: null,
      name: null,
      description: null,
      skill: null,
      location: null,
      date_of_birth: null,
      showcase: null,
      expected_salary: null,
      email: null,
      phone: null,
      profilPicture: null,
      date_created: null,
      date_updated: null,
      profil_picture: null,
      message: ''
    }
  }

  componentDidMount(){
    // do something after component mounted 
    this.getEngineers('http://localhost:8080/api/v1/engineer/'+this.props.location.engineerId)
  }

  handleEdit(){
    this.setState({editProfil: true})
    console.log(this.state.editProfil)
  }

  handleDelete(){
    const jwt = getJwt()
    axios.delete('http://localhost:8080/api/v1/engineer/'+this.props.location.engineerId, { headers: { Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }} )
    .then(res => {
      this.props.history.push("/engineer");
    })
    .catch(err => {

    })
  }

  changeProfilePicture(e){
    e.preventDefault()
    console.log(this.state.profil_picture)
    let formData = new FormData()
    formData.append('file', this.state.profil_picture)
    const jwt = getJwt()
    const config = (
      { headers: { 'Content-type':'multipart/form-data', Authorization: `Bearer ${jwt.jwtToken}`, email: jwt.email, userid: jwt.userId }}
    )
    axios.put(`http://localhost:8080/api/v1/engineer/changeProfilPicture/${this.props.location.engineerId}`, formData, config)
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

  getEngineers(url){
    axios.get(url)
    .then(res => {
      console.log(res.data.data[0])
      let d = new Date(res.data.data[0].date_of_birth)
      let option =  { year: 'numeric', month: 'long', day: 'numeric' }
      let dob = d.toLocaleDateString("en-UK", option)

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
        profilPicture: res.data.data[0].profil_picture,
        date_created: res.data.data[0].date_created,
        date_updated: res.data.data[0].date_updated
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


    render(){
      const jwt = getJwt()
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
      console.log('Profil Picture ======== '+this.state.profilPicture)
      return(
        <>
        <Header />
        <Card body className="pr-5 pl-5 pb-3 mb-5 mr-5 ml-5 mt-3 bg-light">
        <Row className="justify-content-center mt-3">
          <Col md='4' className="text-center">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={'http://localhost:8080/images/'+this.state.profilPicture} />
              <ListGroup className="list-group-flush">
                <ListGroup.Item variant="primary" className="text-dark"><h3>{this.state.name}</h3></ListGroup.Item>
              </ListGroup>
            </Card>
            { this.state.user_id === jwt.userId ? 
            <Form method="POST" onSubmit={ (e) => this.changeProfilePicture(e)}>
            <div className="input-group pr-5 text-left">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(e) => this.setState({ profil_picture: e.target.files[0]})} />
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
          <EditProfil engineerId={this.state.engineer_id}/>
          :
          <ListGroup>
            <ListGroup.Item><FontAwesomeIcon icon={faUser} size="lg" /> {this.state.description}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faEnvelope} size="lg" /> {this.state.email}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faPhoneSquare} size="lg" /> {this.state.phone}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faMoneyBillWave} /> {formatter.format(this.state.expected_salary)}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faCode} size="lg" /> {this.state.skill}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faMapMarkedAlt} size="lg" /> {this.state.location}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faCalendarAlt} size="lg" /> {this.state.date_of_birth}</ListGroup.Item>
            <ListGroup.Item><FontAwesomeIcon icon={faTag} size="lg" /> {this.state.showcase}</ListGroup.Item>
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

export default withRouter(DetailEngineer)