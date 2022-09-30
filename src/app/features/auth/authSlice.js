import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
      user: user ? user : null,
      users: [],
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI)=>{
      try {
           return await authService.register(user) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI)=>{
      try {
           return await authService.login(user) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const logout = createAsyncThunk('auth/logout', async ()=>{
      return await authService.logout() 
})

export const getUsers = createAsyncThunk('auth/getUsers', async (user, thunkAPI)=>{
      try {
           return await authService.getUsers(user) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const updateUser = createAsyncThunk('auth/updateUser', async (user, thunkAPI)=>{
      console.log(user)
      try {
           return await authService.updateUser(user) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async (id, thunkAPI)=>{

      try {
           return await authService.deleteUser(id) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})
export const updateUsers = createAsyncThunk('auth/updateUsers', async (user, thunkAPI)=>{
      try {
           return await authService.updateUsers(user) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const deleteUsers = createAsyncThunk('auth/deleteUsers', async (id, thunkAPI)=>{
      try {
           return await authService.deleteUsers(id) 
      } catch (error) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
      }
})

export const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers:{
            reset: (state) =>{
                  state.isLoading = false
                  state.isError = false
                  state.isSuccess = false
                  state.message = ''
            },
            cleanError: (state)=>{
                  state.user =  null
            }
      },
      extraReducers: (builder) =>{
            builder
                  .addCase(register.pending, (state)=>{
                        state.isLoading  = true
                  })
                  .addCase(register.fulfilled, (state, action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        state.user = action.payload
                  })
                  .addCase(register.rejected, (state, action)=>{
                        state.isLoading = false
                        state.isError = false
                        state.message = action.payload
                        state.user = null
                  })
                  .addCase(login.pending, (state)=>{
                        state.isLoading  = true
                  })
                  .addCase(login.fulfilled, (state, action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        state.user = action.payload  
                  })
                  .addCase(login.rejected, (state, action)=>{
                        state.isLoading = false
                        state.isError = false
                        state.message = action.payload
                        state.user = null
                  })
                  .addCase(logout.fulfilled, (state)=>{
                        state.user = null
                        state.users = []
                  })
                  .addCase(getUsers.pending, (state)=>{
                        state.isLoading  = true
                  })
                  .addCase(getUsers.fulfilled, (state, action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        state.users = action.payload
                  })
                  .addCase(getUsers.rejected, (state, action)=>{
                        state.isLoading = false
                        state.isError = false
                        state.message = action.payload
                        state.users = null
                  })
                  .addCase(updateUser.pending, (state)=>{
                        state.isLoading  = true
                  })
                  .addCase(updateUser.fulfilled, (state, action)=>{
                        state.isLoading = false
                        state.isSuccess = true
                        console.log(action.payload)
                        state.user = action.payload
                  })
                  .addCase(updateUser.rejected, (state, action)=>{
                        state.isLoading = false
                        state.isError = false
                        state.message = action.payload
                        state.user = null
                  })
                  .addCase(deleteUser.fulfilled, (state)=>{
                        state.isSuccess = true
                        state.user = null
                  })
                  .addCase(deleteUsers.fulfilled, (state, action)=>{
                        state.isSuccess = true
                        state.users = action.payload
                  })
                  .addCase(updateUsers.fulfilled, (state, action)=>{
                        state.isSuccess = true
                        state.users = action.payload
                  })
      }
})

export const { reset,  cleanError } = authSlice.actions
export default authSlice.reducer