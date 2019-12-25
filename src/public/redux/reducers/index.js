import { combineReducers } from 'redux'

import engineers from './engineers'
import companies from './companies'
import user from './user'

const rootReducer = combineReducers({
  engineers,
  companies,
  user
})

export default rootReducer