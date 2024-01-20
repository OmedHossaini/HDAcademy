import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode';

// Custom hook for handling authentication details
const useAuth = () => {
    // Get the current authentication token from the Redux store
    const token = useSelector(selectCurrentToken);

    // Initialize variables related to user roles and status
    let isManager = false;
    let isAdmin = false;
    let status = "Employee";

    // Check if a valid token exists
    if (token) {
        // Decode the JWT token to extract user information
        const decoded = jwtDecode(token);
        const { username, roles } = decoded.UserInfo;

        // Check if the user has Manager or Admin roles
        isManager = roles.includes('Manager');
        isAdmin = roles.includes('Admin');

        // Update user status based on roles
        if (isManager) status = "Manager";
        if (isAdmin) status = "Admin";

        // Return an object with user details
        return { username, roles, status, isManager, isAdmin };
    }

    // Return default values when there's no valid token
    return { username: '', roles: [], isManager, isAdmin, status };
};

export default useAuth;
