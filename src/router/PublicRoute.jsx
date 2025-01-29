import { useContext } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "../auth"

export const PublicRoute = ({ children }) => {
  const { authState } = useContext( AuthContext )
  const { logged } = authState || {}

  const lastPath = localStorage.getItem('lastPath') || '/'

  return (!logged)
    ? children
    : <Navigate to={lastPath} />
}
