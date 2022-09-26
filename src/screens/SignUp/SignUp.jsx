import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
        <h2>Sign Up</h2>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required  onChange={onChange}/>
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
        <label htmlFor="confPassword">Confirm Password</label>
        <input type="password" name="password2" id="confPassword" required onChange={onChange} />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select name="role" id="role" onChange={onChange}>
          <option value="x"></option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div>
        <button type="submit" onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp