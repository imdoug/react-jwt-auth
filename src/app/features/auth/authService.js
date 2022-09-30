import axios from 'axios'

const register = async (userData) =>{
      try {
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}signup`, userData)
            console.log(response)
            if(response.data){
                  localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
      } catch (error) {
            console.log(error.response.data)
            return null
      }
}
const login = async (userData) =>{
      const response = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}login`, userData)

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
      const response = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}users`, config)
      return response.data
}

const updateUser = async (userData) =>{
      console.log(userData)
      const response = await axios.put(`${process.env.REACT_APP_PUBLIC_URL}user/`+ userData.id, {name: userData.name, accessToken: userData.accessToken})
      return response.data
}

const deleteUser = async (id) =>{
      const response = await axios.delete(`${process.env.REACT_APP_PUBLIC_URL}user/`+ id)
      return response.data
}
const updateUsers = async (userData) =>{
      const response = await axios.put(`${process.env.REACT_APP_PUBLIC_URL}users/`+ userData.id, {name: userData.name})
      return response.data
}

const deleteUsers = async (id) =>{
      const response = await axios.delete(`${process.env.REACT_APP_PUBLIC_URL}users/`+ id)
      return response.data
}

const authService = {
      register,
      login, 
      logout,
      getUsers,
      updateUser,
      deleteUser,
      updateUsers,
      deleteUsers
}
export default authService
