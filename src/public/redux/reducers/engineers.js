const initialState = {
  engineers: [],
  detailPage: {},
  isLoading: false,
  isError: false,
  search: ''
}

const engineers = (state = initialState, action ) => {
  switch(action.type){
    case "SEARCH_ENGINEERS":
      console.log(action.payload)
      return {
        ...state,
        isError: false,
        isLoading: false,
        search: action.payload
      }
    case "FETCH_ENGINEERS_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    case "FETCH_ENGINEERS_FULFILLED":
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        isError: false,
        detailPage: action.payload.data,
        engineers: [...action.payload.data.data]
      }
    case "FETCH_ENGINEERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export default engineers