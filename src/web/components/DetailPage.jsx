import React, { Component } from 'react'
import { Row, Col, InputGroup, ButtonGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'

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
    this.setState({sortBy: e})
    this.fetchEngineers(e, this.state.orderBy, this.state.limit)
  }
  
  orderBy(e) {
    this.setState({orderBy: e})
    this.fetchEngineers(this.state.sortBy, e, this.state.limit)
  }

  limit(e) {
    this.setState({limit: e})
    this.fetchEngineers(this.state.sortBy, this.state.orderBy, e)
  }


    fetchEngineers = (sortBy, orderBy, limit) => {
      const search = this.props.engineers.search
      this.props.fetch(search, sortBy, orderBy, limit)
    }

    render(){
      return(
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
            <Button variant="outline-dark" onClick={() => this.props.getPrevClicked()}>Prev</Button>
            <Button variant="outline-dark" className="pr-5 pl-5" disabled>0/0</Button>
            <Button variant="outline-dark" onClick={() => this.props.getNextClicked()}>Next</Button>
          </ButtonGroup>
          </Col> 
          <Col md='5'>
            <InputGroup className="mb-3 pl-5 pr-5">
              <DropdownButton as={InputGroup.Prepend} className="pl-5" variant="primary" title="Sort By">
                <Dropdown.Item onClick={() => this.sortBy('name')}>name</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortBy('skill')}>skill</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortBy('date_updated')}>date updated</Dropdown.Item>
              </DropdownButton>
              <FormControl className="" aria-describedby="basic-addon1" defaultValue=''disabled/>
              <DropdownButton as={InputGroup.Append} className="pr-5" variant="primary" title=''>
                <Dropdown.Item onClick={() => this.orderBy('ASC')}>ASC</Dropdown.Item>
                <Dropdown.Item onClick={() => this.orderBy('DESC')}>DESC</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
      )
    }
}


const mapStateToProps = state => ({
  engineers: state.engineers
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (search, sortBy, orderBy, limit) => dispatch(fetchEngineers(search, sortBy, orderBy, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)