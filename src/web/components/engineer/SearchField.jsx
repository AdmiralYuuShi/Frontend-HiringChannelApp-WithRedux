import React, { Component } from 'react'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class SearchField extends Component {

  sendData = (e) =>{ 
    this.props.getDataFromSearch(e.target.value)
  }

  render() {
    return(
      <>
      <Form className="ml-auto">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text style={{backgroundColor: '#DADADA'}}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={this.sendData} type="text" placeholder="Search by Name or Skill" style={{backgroundColor: '#DADADA'}} />
        </InputGroup>
      </Form>
      </>
    )
  }
}