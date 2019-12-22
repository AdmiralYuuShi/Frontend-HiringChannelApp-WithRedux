import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Card from './components/Cards'
import CompaniesCard from './components/company/Cards'
import Register from './components/Register'
import Login from './components/Login'
import DetailEngineer from './components/DetailEngineer'
import EngineerProfile from './components/MyProfile'
import CompanyProfile from './components/company/CreateCompanyProfile'
import Welcome from './components/Welcome'

function Main(){
  return(
    <Switch>
      <Route exact path='/engineer' component={Card} />
      <Route exact path='/company' component={CompaniesCard} />
      <Route exact path='/engineer/detail' component={DetailEngineer} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route exact path='/' component={Welcome} />
      <Route path='/engineer/myprofile' component={EngineerProfile} />
      <Route path='/company/myprofile' component={CompanyProfile} />
    </Switch>
  )
}

export default Main