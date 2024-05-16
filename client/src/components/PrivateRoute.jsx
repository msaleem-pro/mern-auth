
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {
  const { user } = useSelector(state => state.user)
  return (
    user ? <Outlet /> : <Navigate to={"/sign-in"} />
  )
}

export default PrivateRoute