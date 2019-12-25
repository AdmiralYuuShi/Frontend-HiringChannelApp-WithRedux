import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons'
import SearchField from './engineer/SearchField'
import { getJwt } from '../helper/jwt'
import logo from '../assets/images/arkademy-logo.png'

class Header extends React.Component{


  setDataFromSearch = (searchData) => {
    this.props.getDataFromHeader(searchData) 
  }

  handleLogout = () =>{
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    this.props.history.push("/register")
  }

  handleLogin = () =>{
    this.props.history.push("/login")
  }

  handleMyProfile = () =>{
    getJwt().role === 'engineer' ?
    this.props.history.push("/engineer/myprofile") :
    this.props.history.push("/company/companyprofile")
  }

  goHome = () =>{
    this.props.history.push("/")
  }

  render(){
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="white" style={{borderBottom: "5px solid #DADADA"}}>
          <Link to='/'>
            <Navbar.Brand className="pr-2 ml-5">
              <img
                src={logo}
                width="105"
                height="48"
                className="d-inline-block align-top"
                alt="Arkademy logo"
              />
            </Navbar.Brand>
          </Link> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Col md="7">
          {this.props.searchBar === true ? 
          <SearchField getDataFromSearch={this.setDataFromSearch} onChange={this.setDataFromSearch}/>
          :
          <div></div>
          }
          </Col>
          <Col>
            <Nav className="ml-auto">
              <Nav.Link onClick={this.goHome} className="ml-2 mr-2"><strong style={{color: 'black'}}>Home</strong></Nav.Link>
              <FontAwesomeIcon icon={faUserCircle} size="lg" className="mt-2" />
              <NavDropdown title={getJwt().email || 'Guess'} id="basic-nav-dropdown">
                {getJwt().email ? 
                <NavDropdown.Item onClick={this.handleMyProfile}>My Profile</NavDropdown.Item>
                : 
                <NavDropdown.Item onClick={this.handleLogin}>Login</NavDropdown.Item>}

                <NavDropdown.Item onClick={this.handleLogout}>{getJwt().email ? 'Logout' : 'Register'}</NavDropdown.Item>
              </NavDropdown>
              <div className="mr-3 ml-3 mt-2">|</div>
              <Nav.Link className="ml-2 mr-2"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
              <Nav.Link href="#comment" className="ml-2 mr-2"><FontAwesomeIcon icon={faBell} size="lg" /></Nav.Link>
            </Nav>
          </Col>
          </Navbar.Collapse>
      </Navbar>
      </>
    )
  }
}

export default withRouter(Header)