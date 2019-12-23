import React, { Component } from 'react'
import { Row, Col, InputGroup, ButtonGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import isLoading from '../assets/images/isLoading.gif'

import { connect } from 'react-redux'

import { fetchEngineers } from '../../public/redux/actions/engineers'

class DetailPage extends Component {
  constructor(){
    super()

    this.state = {
      sortBy: 'name',
      orderBy: 'ASC',
      limit: 5
    }
  }
  
  sortBy(e) {
    const search = this.props.engineers.search
    this.setState({sortBy: e})
    this.fetchEngineers('http://localhost:8080/api/v1/engineer?search='+search+'&page=1&sortBy='+e+'&orderBy='+this.state.orderBy+'&limit='+this.state.limit)
  }
  
  orderBy(e) {
    const search = this.props.engineers.search
    this.setState({orderBy: e})
    this.fetchEngineers('http://localhost:8080/api/v1/engineer?search='+search+'&page=1&sortBy='+this.state.sortBy+'&orderBy='+e+'&limit='+this.state.limit)
  }

  limit(e) {
    const search = this.props.engineers.search
    this.setState({limit: e})
    this.fetchEngineers('http://localhost:8080/api/v1/engineer?search='+search+'&page=1&sortBy='+this.state.sortBy+'&orderBy='+this.state.orderBy+'&limit='+e)
  }


    fetchEngineers = (api) => {
      this.props.fetch(api)
    }


    render(){
      console.log(this.props.engineers.isLoading)
      return(
        <>
        {this.props.engineers.isLoading === true ? 
        <Row className="justify-content-center text-center">
          <Col md='8'>
          <img
                src={isLoading}
                width="400"
                height="400"
                className="d-inline-block align-top"
                alt="Arkademy logo"
              />
          </Col>
        </Row>
        : 
        <Row className="justify-content-center text-center mt-3">
          <Col md='5' className="pr-5">
          <InputGroup className="mb-3 ml-5" style={{width:'480px'}}>
            <InputGroup.Prepend className="ml-5">
              <InputGroup.Text>Total data</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl defaultValue={this.props.engineers.detailPage.allData} type='number' style={{width:'50px'}} disabled/>
            <InputGroup.Prepend className="">
              <InputGroup.Text>Limit</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e) => this.limit(e.target.value)} defaultValue={this.props.engineers.detailPage.limit} type='number' min="1" className=' mr-5' />
          </InputGroup>
          </Col>
          <Col md='2'>
          <ButtonGroup>
            <Button variant="outline-dark" onClick={() => this.fetchEngineers(this.props.engineers.detailPage.prevLink)}>Prev</Button>
            <Button variant="outline-dark" className="pr-5 pl-5" disabled>{this.props.engineers.detailPage.page}/{this.props.engineers.detailPage.allPage}</Button>
            <Button variant="outline-dark" onClick={() => this.fetchEngineers(this.props.engineers.detailPage.nextLink)}>Next</Button>
          </ButtonGroup>
          </Col> 
          <Col md='5'>
            <InputGroup className="mb-3 pl-5 pr-5">
              <DropdownButton as={InputGroup.Prepend} className="pl-5" variant="primary" title="Sort By">
                <Dropdown.Item onClick={() => this.sortBy('name')}>name</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortBy('skill')}>skill</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortBy('date_updated')}>date updated</Dropdown.Item>
              </DropdownButton>
              <FormControl className="" aria-describedby="basic-addon1" defaultValue={this.props.engineers.detailPage.sortBy} disabled/>
              <DropdownButton as={InputGroup.Append} className="pr-5" variant="primary" title={this.props.engineers.detailPage.orderBy ? this.props.engineers.detailPage.orderBy : 'ASC'}>
                <Dropdown.Item onClick={() => this.orderBy('ASC')}>ASC</Dropdown.Item>
                <Dropdown.Item onClick={() => this.orderBy('DESC')}>DESC</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)