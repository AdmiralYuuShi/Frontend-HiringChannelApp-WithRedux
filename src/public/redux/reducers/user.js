const initialState = {
  user: [],
  isLoading: false,
  isError: false 
}

const user = (state = initialState, action ) => {
  switch(action.type){
    case "FETCH_USER_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    case "FETCH_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: [action.payload.data]
      }
    case "FETCH_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export default user