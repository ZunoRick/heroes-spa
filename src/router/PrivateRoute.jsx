import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate, useLocation } from "react-router"

export const PrivateRoute = ({ children }) => {
  const { authState } = useContext( AuthContext )
  const { logged } = authState || {}

  const { pathname, search } = useLocation()

  const lastPath = pathname + search
  localStorage.setItem('lastPath', lastPath)

  return (logged)
    ? children
    : <Navigate to='/login' />
}
