import axios from 'axios'

export const fetchEngineers = (api) => ({
  type: "FETCH_ENGINEERS",
  payload: axios.get(api)
})

export const searchEngineers = (search) => ({
  type: "SEARCH_ENGINEERS",
  payload: search
})