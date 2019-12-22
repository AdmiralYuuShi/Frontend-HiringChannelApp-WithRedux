import axios from 'axios'

export const fetchEngineers = (search, sortBy = 'name', orderBy = 'ASC', limit = 5) => ({
  type: "FETCH_ENGINEERS",
  payload: axios.get('http://localhost:8080/api/v1/engineer?search='+search+'&page=1&sortBy='+sortBy+'&orderBy='+orderBy+'&limit='+limit)
})

export const searchEngineers = (search) => ({
  type: "SEARCH_ENGINEERS",
  payload: search
})