import axios from 'axios'

export const fetchCompanies = (api) => ({
  type: "FETCH_COMPANIES",
  payload: axios.get(api)
})
