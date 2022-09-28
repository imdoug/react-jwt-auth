import { Container,  CssBaseline, TextField, Button, Typography, FormControl,InputLabel, Select, MenuItem} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link ,useNavigate } from 'react-router-dom'
import { register, reset } from '../../app/features/auth/authSlice'


const SignUp = () => {
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

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(formData)
    if(password !== password2){
      console.log('password doesnt match')
    }else{
      const userData = {
        name, email, password, role
      }
      dispatch(register(userData))
    }
    console.log()
  }
  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/')
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
            <TextField 
              margin="normal"
              required
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
                  onChange={onChange}
                >
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
    // <div>
    //   <div>
    //     <h2>Sign Up</h2>
    //   </div>
    //   <div>
    //     <label htmlFor="name">Name</label>
    //     <input type="text" name="name" id="name" required  onChange={onChange}/>
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input type="email" name="email" id="email" required onChange={onChange}/>
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input type="password" name="password" id="password" required onChange={onChange} />
    //   </div>
    //   <div>
    //     <label htmlFor="confPassword">Confirm Password</label>
    //     <input type="password" name="password2" id="confPassword" required onChange={onChange} />
    //   </div>
    //   <div>
    //     <label htmlFor="role">Role</label>
    //     <select name="role" id="role" onChange={onChange}>
    //       <option value="x"></option>
    //       <option value="admin">admin</option>
    //       <option value="user">user</option>
    //     </select>
    //   </div>
    //   <div>
    //     <button type="submit" onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>
    //   </div>
    // </div>
  )
}

export default SignUp