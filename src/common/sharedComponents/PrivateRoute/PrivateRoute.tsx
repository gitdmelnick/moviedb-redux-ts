import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated  } from '../../slices/userSlice'

interface RouteProps {
  component: React.ComponentType
  path?: string,
}

export const PrivateRoute = ({ component: RouteComponent}:RouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <RouteComponent />
  }

  return <Navigate to="/signin" />
}