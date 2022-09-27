import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset, getUsers, updateUser, deleteUser } from '../../app/features/auth/authSlice'


const Dashboard = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, users } = useSelector((state)=> state.auth)

  const handleLogout = (e) =>{
    e.preventDefault()
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  const handleDelete = (e) =>{
    e.preventDefault()
    dispatch(deleteUser(user.id))
    console.log('deleting ...')
  }
  const handleUsers = (e) =>{
    e.preventDefault()
    dispatch(getUsers(user))
    dispatch(reset())
  }
  const handleUpdate = async (e)=>{
    e.preventDefault()
    const updatedUser = {
      ...user, name: name
    }
    dispatch(updateUser(updatedUser))
    dispatch(reset())
    setName('')
  }
  return (
    <div>
      <div>
        <h2>Welcome {user.name}</h2>
      </div>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required placeholder={user.name} onChange={(e)=>{setName(e.target.value)}}/>
          <button type='submit' onClick={(e)=>{handleUpdate(e)}}>Change Name</button>
        </div>
        <div>
          <button type='submit' onClick={(e)=>{handleLogout(e)}}>Log Out</button>
        </div>
        <div>
          <button type='submit' onClick={(e)=>{handleDelete(e)}}>Delete User</button>
        </div>
      </div>
      {user.role === 'admin' 
        ? 
        <>
          <button type="submit" onClick={(e)=>{handleUsers(e)}}>Get Users</button>
          {users.length > 0 ?
          <>
            <div></div>
          </> 
          :
          <></>}
        </>
          
        :<></>}
    </div>
  )
}

export default Dashboard