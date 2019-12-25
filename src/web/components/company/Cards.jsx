import React, { Component } from 'react'
import CardsList from '../company/CardsList'
import Header from '../Header'
import { connect } from 'react-redux'

import { fetchCompanies } from '../../../public/redux/actions/companies'


class Cards extends Component {

  componentDidMount(){
    // do something after component mounted
    this.props.fetch(process.env.REACT_APP_API_URL+'/api/v1/company')
  }

  render() {
    return (
    <>
      <Header />
      <CardsList />
    </>
    )
  }
}

const mapStateToProps = state => ({
  companies: state.companies
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (api) => dispatch(fetchCompanies(api))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)