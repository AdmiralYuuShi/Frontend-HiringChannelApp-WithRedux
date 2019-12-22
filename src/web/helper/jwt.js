export const getJwt = () =>{
  const userData= {
    jwtToken: localStorage.getItem('jwtToken'),
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role')
  }
  return userData
}