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
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required onChange={onChange}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required onChange={onChange} />
      </div>
      <div>
        <button type="submit" onClick={(e)=>{handleSubmit(e)}}>Login</button>
      </div>
    </div>
  )
}

export default Login