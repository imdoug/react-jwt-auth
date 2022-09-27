import { Container, CssBaseline, TextField, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../app/features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(formData)
      const userData = {
         email, password
      }
      dispatch(login(userData))
  }
  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  const onChange = (e) =>{
    setFormData((prevState)=>({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  if(isLoading){
    return <p>Loading</p>
  }
  return (
    <>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Typography component="h1" variant="h5" align='center'>
            LOGIN
          </Typography>
          <TextField 
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            />
          <TextField 
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e)=>{handleSubmit(e)}}
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
        </Container>
      </div>
    </>
  )
}

export default Login