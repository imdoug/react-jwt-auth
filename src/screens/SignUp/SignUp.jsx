import { Container, Alert,  CssBaseline, TextField, Button, Typography, FormControl,InputLabel, Select, MenuItem} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link ,useNavigate } from 'react-router-dom'
import { register, reset, cleanError } from '../../app/features/auth/authSlice'


const SignUp = () => {
  const [passError, setPassError] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: ''
  })
  const { name, email, password, password2, role} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)

  const validateEmail = (email) =>{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = (e) =>{
    e.preventDefault()

    if(formData.password === '' || formData.email === '' || formData.role === '' || formData.name === ''){
      setError(true)
      setTimeout(()=>{
        setError(false)
      }, 3000)
    }else{
      if(!validateEmail(formData.email)){
        setError(true)
        setTimeout(()=>{
          setError(false)
      }, 3000)
      }else{
        if(password !== password2){
          setPassError(true)
          setTimeout(()=>{
            setPassError(false)
          }, 3000)
        }else{
          const userData = {
            name, email, password, role
          }
          dispatch(register(userData))
        }
      }
    }
  }
  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(user === 'user not found'){
      setError(true)
      setTimeout(()=>{
        setError(false)
        dispatch(cleanError())
        localStorage.removeItem('user')
      }, 3000)
    }else{
      if(isSuccess || user){
        navigate('/')
      }
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
      <Container component="main" maxWidth="xs" style={{marginTop: 50}}>
          <CssBaseline/>
          <Typography component="h1" variant="h2" align='center'mb={5}>
            SIGN UP
          </Typography>
          {error ? 
        <>
          <Alert variant="outlined" severity="error">
              one or more fields are missing, check it out!
          </Alert>
        </> : <></>}
        {passError ? 
        <>
          <Alert variant="outlined" severity="error">
              passwords dont match! check them out!
          </Alert>
        </> : <></>}
          <TextField 
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onChange}
            />
          <TextField 
            margin="normal"
            required
            fullWidth
            id="email"
            type={"email"}
            label="Email Address"
            name="email"
            autoComplete="email"
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
            <TextField 
              margin="normal"
              aria-required
              fullWidth
              name="password2"
              label="Password Confirmation"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  name="role"
                  onChange={onChange} >
                  <MenuItem value={'admin'}>admin</MenuItem>
                  <MenuItem value={'user'}>user</MenuItem>
                </Select>
              </FormControl>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e)=>{handleSubmit(e)}}
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN UP
            </Button>
            <Link to='/login' style={{color:'#1976D2'}}>Already have an account? Login</Link>
        </Container>


      </div>
    </>
  )
}

export default SignUp