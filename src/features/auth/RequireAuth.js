// Importing necessary components and hooks
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

// Definition of the RequireAuth component
const RequireAuth = ({ allowedRoles }) => {
    // Get the current location using the useLocation hook
    const location = useLocation()

    // Extract roles from the useAuth custom hook
    const { roles } = useAuth()

    // Determine the content based on user roles and allowed roles
    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet /> // Display the child components if the user has the required role
            : <Navigate to="/login" state={{ from: location }} replace /> // Redirect to login if the user doesn't have the required role
    )

    // Return the determined content
    return content
}

// Export the RequireAuth component as the default export
export default RequireAuth
