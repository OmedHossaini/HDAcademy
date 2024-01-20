// Import necessary libraries and components
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';

// Regular expressions for different routes
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

// Component for the dashboard header
const DashHeader = () => {
    // Access authentication details using custom hook
    const { isManager, isAdmin } = useAuth();
    // Navigation hook for redirection
    const navigate = useNavigate();
    // Get current pathname from location hook
    const { pathname } = useLocation();

    // Mutation hook for sending logout request
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    // Effect hook to redirect to home after successful logout
    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    // Handler functions for different button clicks
    const onNewNoteClicked = () => navigate('/dash/notes/new');
    const onNewUserClicked = () => navigate('/dash/users/new');
    const onNotesClicked = () => navigate('/dash/notes');
    const onUsersClicked = () => navigate('/dash/users');

    // Determine the class for small dash header based on route
    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small";
    }

    // Initialize variables for different buttons based on routes and user roles
    let newNoteButton = null;
    let newUserButton = null;
    let userButton = null;
    let notesButton = null;

    // Conditionally render buttons based on the current route
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        );
    }

    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        );
    }

    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            );
        }
    }

    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        );
    }

    // Logout button
    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    );

    // Determine the error class based on the error state
    const errClass = isError ? "errmsg" : "offscreen";

    // Content to be rendered
    let buttonContent;
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />;
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        );
    }

    // JSX structure for the dashboard header
    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    {/* Link to dashboard home */}
                    <Link to="/dash">
                        <h1 className="dash-header__title">HD Academy</h1>
                    </Link>
                    {/* Navigation buttons */}
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    );

    // Return the JSX content
    return content;
};

// Export the DashHeader component
export default DashHeader;
