import axios from 'axios'

export const fetchUser = (api, data) => ({
  type: "FETCH_USER",
  payload: axios.post(api, data)
})
