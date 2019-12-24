import React, { Component } from 'react'
import CardsList from './CardsList'
import Header from '../Header'
import DetailPage from './DetailPage'
import { connect } from 'react-redux'

import { fetchEngineers } from '../../../public/redux/actions/engineers'


class Cards extends Component {
  constructor(){
    super()

    this.state = {
      sortBy: 'name',
      orderBy: 'ASC',
      search: '',
      limit: 5
    }
  }

  componentDidMount(){
    // do something after component mounted
    this.fetchEngineers()
  }

  sortBy = (e) => {
    this.setState({sortBy: e})
    this.fetchEngineers( this.state.search, e, this.state.orderBy, this.state.limit)
  }
  
  orderBy = (e) => {
    this.setState({orderBy: e})
    this.fetchEngineers( this.state.search, this.state.sortBy, e, this.state.limit)
  }

  search = (e) => {
    this.setState({search: e})
    this.fetchEngineers( e, this.state.sortBy, this.state.orderBy, this.state.limit)
  }

  limit = (e) => {
    this.setState({limit: e})
    this.fetchEngineers( this.state.search, this.state.sortBy, this.state.orderBy, e)
  }

  fetchEngineers = (search = '', sortBy = 'name', orderBy = 'ASC', limit = 5) => {
    const api = process.env.REACT_APP_API_URL+'/api/v1/engineer?search='+search+'&page=1&sortBy='+sortBy+'&orderBy='+orderBy+'&limit='+limit
    this.props.fetch(api)
  }

  render() {
    return (
    <>
      <Header getDataFromHeader={this.search} searchBar={true}/>
      <DetailPage
      sortBy={(e) => this.sortBy(e)}
      orderBy={(e) => this.orderBy(e)}
      sortState={this.state.sortBy}
      orderState={this.state.orderBy}
      limit={(e) => this.limit(e)}
      />
      <CardsList/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cards)