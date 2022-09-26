import axios from 'axios'

// REGISTRATION
const register = async (userData) =>{
      const response = await axios.post('http://localhost:3003/signup', userData)

      if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
}
// Log User
const login = async (userData) =>{
      const response = await axios.post('http://localhost:3003/login', userData)

      if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
}

const logout = async () =>{
      localStorage.removeItem('user')
}

const authService = {
      register,
      login, 
      logout
}
export default authService
