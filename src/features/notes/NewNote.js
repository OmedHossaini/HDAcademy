// Importing necessary components and hooks
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

// Definition of the NewNote component
const NewNote = () => {
    // Set the title for the page
    useTitle('HD: New Note')

    // Querying the users API to get the list of users
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    // Display loading spinner while fetching user data
    if (!users?.length) return <PulseLoader color={"#FFF"} />

    // Render the NewNoteForm component with the retrieved user data
    const content = <NewNoteForm users={users} />

    // Return the JSX content
    return content
}

// Export the NewNote component as the default export
export default NewNote
