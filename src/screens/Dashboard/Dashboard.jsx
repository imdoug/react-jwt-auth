import { Container, Grid, TextField, Button, Typography} from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset, getUsers, updateUser, updateUsers, deleteUser, deleteUsers } from '../../app/features/auth/authSlice'


const Dashboard = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, users, isError, message } = useSelector((state)=> state.auth)

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
  // finish this functions 
  const handleUpdateUsers = async (e, i)=>{
    e.preventDefault()
    const updatedUser = {
      ...users[i], name: name
    }
    dispatch(updateUsers(updatedUser))
    dispatch(reset())
    setName('')
  }
  const handleDeleteUsers = (e, i) =>{
    e.preventDefault()
    dispatch(deleteUsers(users[i].id))
    dispatch(reset())
    setName('')
  }
  useEffect(()=>{
    if(isError){
      console.log(message)
    }

    dispatch(reset())
  }, [users, navigate, dispatch])
  return (
    <div >
      <div>
      <Container component="main" maxWidth="xs" style={{marginTop: 100}} >
        <Typography component="h1" variant="h2" align='center' mb={5}>
            Welcome {user.name}
        </Typography>
        <TextField 
            margin="normal"
            required
            fullWidth
            id="name"
            label="Update Name"
            name="name"
            autoComplete="name"
            onChange={(e)=>{setName(e.currentTarget.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e)=>{handleUpdate(e)}}
              sx={{ mt: 3, mb: 2 }}
            >
              Update name
            </Button>
      </Container>
      <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} maxWidth="xs">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='error'
              onClick={(e)=>{handleLogout(e)}}
              style={{height: '100%'}}
              sx={{ mt: 3, mb: 2, mr: 3 }}
            >
              logout
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='error'
              onClick={(e)=>{handleDelete(e)}}
              sx={{ mt: 3, mb: 2 }}
            >
              DELETE
            </Button>
      </Container>
      </div>
      <div>
      {user.role === 'admin' 
        ? 
        <>
        <Container maxWidth="xs" >
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color='success'
                onClick={(e)=>{handleUsers(e)}}
                sx={{ mt: 3, mb: 2 }}
              >
                GET USERS
           </Button>
        </Container>
          {users.length > 0 ?
          <>
            <div>
              <Typography component="h1" variant="h4" align='center' mt={2}>Users</Typography>
              <Container maxWidth="xl" style={{marginTop: 50}} >
              <Grid container columns={{ xs: 4, sm: 8, md: 8}} justifyContent="center" >
                  {users.map((listUser, i) => (
                    <>
                    {listUser.id === user.id ? <></> : 
                    <Grid item padding={5} xs={4} sm={3} md={2} key={i} mb={3} mr={3} style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.3)', borderRadius: 6}}>
                      <Typography component="h1" variant="h6">{listUser.name}</Typography>
                      <TextField 
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Update Name"
                        name="name"
                        autoComplete="name"
                        onChange={(e)=>{setName(e.currentTarget.value)}}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          value={name}
                          onClick={(e)=>{handleUpdateUsers(e, i)}}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update name
                        </Button>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color='error'
                          onClick={(e)=>{handleDeleteUsers(e, i)}}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          DELETE
                        </Button>
                    </Grid>}
                  </>))}
                </Grid>
              </Container>
            </div>
          </> 
          :
          <></>}
        </>
          
        :<></>}
        </div>
    </div>
  )
}

export default Dashboard