import React, { Component } from 'react'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'

import { searchEngineers, fetchEngineers } from '../../public/redux/actions/engineers'

class SearchField extends Component {

  searchEngineers = (e) => {
    const search = e.target.value
    this.props.search(search)
    this.props.fetch(search)
  }

  render() {
    return(
      <>
      <Form className="ml-auto">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text style={{backgroundColor: '#DADADA'}}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={this.searchEngineers} type="text" placeholder="Search by Name or Skill" style={{backgroundColor: '#DADADA'}} />
        </InputGroup>
      </Form>
      </>
    )
  }
}


const mapStateToProps = state => ({
  engineers: state.engineers
})

const mapDispatchToProps = (dispatch) => ({
  search: (search) => dispatch(searchEngineers(search)),
  fetch: (search) => dispatch(fetchEngineers(search))
})

export default  connect(mapStateToProps, mapDispatchToProps)(SearchField)