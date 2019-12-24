import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, CardColumns, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import isLoading from '../../assets/images/isLoading.gif'
import '../../assets/css/style.css'
import { connect } from 'react-redux'

function CardsList(props){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const styles = {
    device : {
      '@media (min-width: 576px)': {
          columnCount: 2
      },
      '@media (min-width: 768px)' : {
        columnCount: 3
      },
      '@media (min-width: 992px)': {
        columnCount: 4
      },
      '@media (min-width: 1200px)': {
            columnCount: 5
      }
    }
  }

  return (
    <>
    {props.engineers.isLoading === true ? 
    <Row className="text-center">
      <Col>
        <img
        src={isLoading}
        width="300"
        height="300"
        className="d-inline-block align-top"
        alt="Arkademy logo"
        />
      </Col>
    </Row>
    :
    props.engineers.detailPage.allData === 0 ? 
    <Row className="justify-content-center text-center mt-5">
      <Col md="4">
        <Alert variant="danger"><h3>Data not found</h3></Alert> 
      </Col>
    </Row>
    : 
    <CardColumns className={css(styles.device)} style={{padding: '20px'}}>
      {props.engineers.engineers.map(engineers => (
          <Card key={engineers.engineer_id}>
          <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/images/'+engineers.profil_picture} />
            <Card.Footer className="text-white bg-dark" style={{ lineHeight: '100%'}}>
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
       ))}
      </CardColumns>
    }
    </>
  )
}


const mapStateToProps = state => ({
  engineers: state.engineers
})

export default connect(mapStateToProps)(CardsList)