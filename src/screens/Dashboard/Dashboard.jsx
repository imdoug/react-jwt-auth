import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../../app/features/auth/authSlice'


const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state)=> state.auth)

  const handleLogout = (e) =>{
    e.preventDefault()
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  const handleDelete = (e) =>{
    e.preventDefault()
    console.log('deleting ...')
  }
  return (
    <div>
      <div>
        <h2>Welcome {user.name}</h2>
      </div>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
          <button>Change Name</button>
        </div>
        <div>
          <button type='submit' onClick={(e)=>{handleLogout(e)}}>Log Out</button>
        </div>
        <div>
          <button type='submit' onClick={(e)=>{handleDelete(e)}}>Delete User</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard