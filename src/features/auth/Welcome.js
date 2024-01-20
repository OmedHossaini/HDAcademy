// Importing necessary components and hooks
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// Definition of the Welcome component
const Welcome = () => {
    // Extracting user information using the useAuth custom hook
    const { username, isManager, isAdmin } = useAuth()

    // Getting the current date and formatting it
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    // JSX content for the Welcome component
    const content = (
        <section className="welcome">
            {/* Displaying the current date and time */}
            <p>{today}</p>

            {/* Displaying a welcome message with the username */}
            <h1>Welcome {username}!</h1>

            {/* Link to view HD Notes */}
            <p><Link to="/dash/notes">View HD Notes</Link></p>

            {/* Link to add a new HD Note */}
            <p><Link to="/dash/notes/new">Add New HD Note</Link></p>

            {/* Conditionally rendering links for managers and administrators */}
            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}
            
            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}
        </section>
    )

    // Return the JSX content
    return content
}

// Export the Welcome component as the default export
export default Welcome
