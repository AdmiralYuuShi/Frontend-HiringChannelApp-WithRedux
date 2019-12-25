import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import isLoading from '../../assets/images/isLoading.gif'
import '../../assets/css/style.css'

function CardsList(props){

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
    {props.companies.isLoading === true ? 
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
    <CardColumns className={css(styles.device)} style={{padding: '20px'}}>
      {props.companies.companies.map(companies => (
          <Card key={companies.company_id}>
          <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/images/'+companies.logo} />
            <Card.Footer className="text-white bg-dark" style={{ lineHeight: '100%'}}>
              <Link to={{
                pathname:'company/detail/',
                companyId: companies.company_id
              }}>
                <b style={{fontSize: '20px', color: "white"}}>{companies.name}</b><br/>
              </Link>
              <small>{companies.description}</small><br/>
              <small><FontAwesomeIcon icon={faMapMarkedAlt} size="lg" /> {companies.location}</small><br/>
            </Card.Footer>
          </Card>
       ))}
    </CardColumns>
    }
    </>
  )
}

const mapStateToProps = state => ({
  companies: state.companies
})

export default connect(mapStateToProps)(CardsList)