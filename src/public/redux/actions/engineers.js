import axios from 'axios'

export const fetchEngineers = (api) => ({
  type: "FETCH_ENGINEERS",
  payload: axios.get(api)
})

export const updateEngineers = (api) => ({
  type: "UPDATE_ENGINEERS",
  payload: axios.put(api)
})

export const searchEngineers = (search) => ({
  type: "SEARCH_ENGINEERS",
  payload: search
})