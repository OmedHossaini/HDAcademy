import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

// User component displaying user information in a table row
const User = ({ userId }) => {
    // Fetching user information using the useGetUsersQuery hook
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    // Navigation hook for redirection
    const navigate = useNavigate()

    // Check if user data is available
    if (user) {
        // Handling edit button click event
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        // Creating a string of user roles for display
        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // Adding a CSS class to indicate user status (active or inactive)
        const cellStatus = user.active ? '' : 'table__cell--inactive'

        // JSX for rendering user information in a table row
        return (
            <tr className={`table__row user`}>
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else {
        // If user data is not available, return null
        return null
    }
}

// Memoizing the User component to optimize rendering
const memoizedUser = memo(User)

// Exporting the memoized User component
export default memoizedUser
