import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

function CardsList(props){
  return (
    <>
    <Row className='justify-content-center'>
      {props.list.map(companies => (
        <Col md="2" className="mt-3 ml-1 mr-1" key={companies.companies_id}>
          <Card style={{ borderRadius: '10%' ,backgroundSize: 'cover', backgroundImage: 'url(https://scontent-frx5-1.cdninstagram.com/vp/27c1c5c683d2582ef6e3368f41218e06/5E295C79/t51.2885-15/e35/s320x320/72782968_152041276013960_2861538620607258147_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=108)'}}>
            <Card.Body style={{height: '200px'}}>
            </Card.Body>
            <Card.Footer className="text-white bg-dark" style={{ borderBottomLeftRadius : '15%', borderBottomRightRadius : '15%', lineHeight: '100%' ,opacity: '0.8'}}>
              <Link to={{
                pathname:'engineer/detail/',
                engineerId: companies.companies_id
              }}>
                <b style={{fontSize: '20px', color: "white"}}>{companies.name}</b><br/>
              </Link>
              <small>{companies.description}</small><br/>
              <small><FontAwesomeIcon icon={ faMapMarkedAlt } size="lg" /> {companies.location}</small><br/>
            </Card.Footer>
          </Card>
        </Col>
        ))}
    </Row>
    </>
  )
}

export default CardsList