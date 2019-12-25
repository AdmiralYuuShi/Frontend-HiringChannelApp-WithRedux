const initialState = {
  companies: [],
  isLoading: false,
  isError: false 
}

const companies = (state = initialState, action ) => {
  switch(action.type){
    case "FETCH_COMPANIES_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    case "FETCH_COMPANIES_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        companies: [...action.payload.data.data]
      }
    case "FETCH_COMPANIES_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export default companies