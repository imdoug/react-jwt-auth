import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
      const { user } = useSelector((state)=> state.auth)
  return (
      <>
    { user !== null ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedRoutes