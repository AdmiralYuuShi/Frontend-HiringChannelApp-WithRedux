import React, { Component } from 'react'
import { Row, Col, InputGroup, ButtonGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'

import { connect } from 'react-redux'

import { fetchEngineers } from '../../../public/redux/actions/engineers'


class DetailPage extends Component {

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
            <FormControl onChange={(e) => this.props.limit(e.target.value)} defaultValue={this.props.engineers.detailPage.limit} type='number' min="1" max={this.props.engineers.detailPage.allData} className=' mr-5' />
          </InputGroup>
          </Col>
          <Col md='2'>
          <ButtonGroup>
            {this.props.engineers.detailPage.page <= 1 ? <></> : 
            <Button variant="outline-dark" onClick={() => this.props.fetch(this.props.engineers.detailPage.prevLink)}>Prev</Button>
            }
            <Button variant="outline-dark" className="pr-5 pl-5" disabled>{this.props.engineers.detailPage.page}/{this.props.engineers.detailPage.allPage}</Button>

            {parseInt(this.props.engineers.detailPage.page) === this.props.engineers.detailPage.allPage ? <></> : 
            <Button variant="outline-dark" onClick={() => this.props.fetch(this.props.engineers.detailPage.nextLink)}>Next</Button>
            }
          </ButtonGroup>
          </Col> 
          <Col md='5'>
            <InputGroup className="mb-3 pl-5 pr-5">
              <DropdownButton as={InputGroup.Prepend} className="pl-5 text-center" variant="primary" title="Sort By">
                <Dropdown.Item onClick={() => this.props.sortBy('name')}>name</Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.sortBy('skill')}>skill</Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.sortBy('date_updated')}>date updated</Dropdown.Item>
              </DropdownButton>
              <FormControl className="" aria-describedby="basic-addon1" defaultValue={
                this.props.engineers.detailPage.sortBy === 'name' ? 'Name' : 
                this.props.engineers.detailPage.sortBy === 'skill' ? 'Skill' : 
                this.props.engineers.detailPage.sortBy === 'date_updated' ? 'Date Updated' : ''
              } disabled/>
              <DropdownButton as={InputGroup.Append} className="pr-5" variant="primary" title={
                this.props.engineers.detailPage.sortBy === 'name' && this.props.engineers.detailPage.orderBy === 'ASC' ? 'A-Z' : 
                this.props.engineers.detailPage.sortBy === 'skill' && this.props.engineers.detailPage.orderBy === 'ASC' ? 'A-Z' :
                this.props.engineers.detailPage.sortBy === 'date_updated' && this.props.engineers.detailPage.orderBy === 'ASC' ? 'Oldest' :
                this.props.engineers.detailPage.sortBy === 'name' && this.props.engineers.detailPage.orderBy === 'DESC' ? 'Z-A' : 
                this.props.engineers.detailPage.sortBy === 'skill' && this.props.engineers.detailPage.orderBy === 'DESC' ? 'Z-A' :
                this.props.engineers.detailPage.sortBy === 'date_updated' && this.props.engineers.detailPage.orderBy === 'DESC' ? 'Newest' :
                'A-Z'
              }>
                <Dropdown.Item onClick={() => this.props.orderBy('ASC')}>
                {
                this.props.engineers.detailPage.sortBy === 'name' || this.props.engineers.detailPage.sortBy === 'skill' ? 'A-Z' :
                this.props.engineers.detailPage.sortBy === 'date_updated' ? 'Oldest' :
                'ASC'
                }
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.orderBy('DESC')}>
                {
                this.props.engineers.detailPage.sortBy === 'name' || this.props.engineers.detailPage.sortBy === 'skill' ? 'Z-A' : 
                this.props.engineers.detailPage.sortBy === 'date_updated' ? 'Latest' :
                'DESC'
                }
                </Dropdown.Item>
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
  fetch: (api) => dispatch(fetchEngineers(api))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)