import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'

function CardsList(props){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return (
    <>
    <Row className='justify-content-center'>
      {props.engineers.engineers.map(engineers => (
        <Col md="2" className="mt-3 ml-1 mr-1" key={engineers.engineer_id}>
          <Card>
          <Card.Img variant="top" src={'http://localhost:8080/images/'+engineers.profil_picture} />
          {/* <Card style={{ borderRadius: '10%' ,backgroundSize: 'cover', 
          backgroundImage: `url(http://localhost:8080/images/${engineers.profil_picture})` }}>
            <Card.Body style={{height: '200px'}}>
            </Card.Body> */}
            <Card.Footer className="text-white bg-dark" style={{ borderBottomLeftRadius : '15%', borderBottomRightRadius : '15%', lineHeight: '100%'}}>
              <Link to={{
                pathname:'engineer/detail/',
                engineerId: engineers.engineer_id
              }}>
                <b style={{fontSize: '20px', color: "white"}}>{engineers.name}</b><br/>
              </Link>
              <small>{engineers.description}</small><br/>
              <small><FontAwesomeIcon icon={faEnvelope} size="lg" /> {engineers.email}</small><br/>
              <small><FontAwesomeIcon icon={faMoneyBillWave} /> {formatter.format(engineers.expected_salary)}</small><br/>
              <small>Skill :</small><br/>
              <small>{engineers.skill}</small>
            </Card.Footer>
          </Card>
        </Col>
       ))}
    </Row>
    </>
  )
}


const mapStateToProps = state => ({
  engineers: state.engineers
})

export default connect(mapStateToProps)(CardsList)