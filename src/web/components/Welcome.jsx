import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import Header from './Header'
import { Link } from 'react-router-dom'

function Welcome(props){
  return (
    <>
      <Header />
      <Jumbotron className="text-center">
        <h1>Welcome to Hiring Channel Web!</h1>
        <p>
          What do you want to see?
        </p>
        <p>
          <Link to='/engineer'><Button variant="primary" className="mr-1">Engineers Data</Button></Link>
          <Link to='/company'><Button variant="primary" className="ml-1">Companies Data</Button></Link>
        </p>
      </Jumbotron>
    </>
  )
}

export default Welcome