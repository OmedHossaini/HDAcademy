// Import necessary libraries and components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

// Component for the dashboard footer
const DashFooter = () => {
    // Access authentication details using custom hook
    const { username, status } = useAuth();
    // Navigation hook for redirection
    const navigate = useNavigate();
    // Get current pathname from location hook
    const { pathname } = useLocation();

    // Handler function for the "Go Home" button click
    const onGoHomeClicked = () => navigate('/dash');

    // Conditionally render the "Go Home" button based on the current route
    let goHomeButton = null;
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        );
    }

    // JSX structure for the dashboard footer
    const content = (
        <footer className="dash-footer">
            {/* Render the "Go Home" button */}
            {goHomeButton}
            {/* Display current user information */}
            <p>Current User: {username}</p>
            {/* Display user status information */}
            <p>Status: {status}</p>
        </footer>
    );

    // Return the JSX content
    return content;
};

// Export the DashFooter component
export default DashFooter;
