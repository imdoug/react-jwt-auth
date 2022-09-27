import axios from 'axios'

const register = async (userData) =>{
      const response = await axios.post('http://localhost:3003/signup', userData)

      if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
}
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

const getUsers = async (userData) =>{
      const config = {
            headers:{
                  "x-acess-token": userData.accessToken 
            }
      }
      const response = await axios.get('http://localhost:3003/users', config)
      return response.data
}

const updateUser = async (userData) =>{
      console.log(userData)
      const response = await axios.put('http://localhost:3003/users/'+ userData.id, {name: userData.name, accessToken: userData.accessToken})
      return response.data
}

const deleteUser = async (id) =>{
      const response = await axios.delete('http://localhost:3003/users/'+ id)
      return response.data
}

const authService = {
      register,
      login, 
      logout,
      getUsers,
      updateUser,
      deleteUser
}
export default authService
