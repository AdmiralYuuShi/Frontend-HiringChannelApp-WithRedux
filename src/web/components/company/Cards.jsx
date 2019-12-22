import React, { Component } from 'react'
import axios from 'axios'
import CardsList from '../company/CardsList'
import Header from '../Header'

export default class Cards extends Component {
  constructor(){
    super()

    this.state = {
      companiesList: [],
      }
  }

  componentDidMount(){
    // do something after component mounted
    this.getCompanies(`http://localhost:8080/api/v1/company`)
  }

  getCompanies(url){
    axios.get(url)
    .then(res => {
      // console.log(res.data.pageDetail)
      this.setState({
        companiesList: res.data.data
      })
    })
    .catch(err => {
      // console.log(err)
      this.setState({ companiesList: 'not found' })
    })
  }

  render() {
    console.log(this.state)
    return (
    <>
      <Header />
      <CardsList list={this.state.companiesList} />
    </>
    )
  }
}