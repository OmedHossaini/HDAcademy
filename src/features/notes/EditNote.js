// Importing necessary components and hooks
import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

// Definition of the EditNote component
const EditNote = () => {
    // Set the title for the page
    useTitle('HD: Note')

    // Extracting the note ID from the route parameters
    const { id } = useParams()

    // Extracting user information using the useAuth custom hook
    const { username, isManager, isAdmin } = useAuth()

    // Querying the notes API to get the specific note based on the ID
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    // Querying the users API to get the list of users
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    // Display loading spinner while fetching data
    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

    // Check if the current user has permission to edit the note
    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    // Render the EditNoteForm component with the retrieved note and user data
    const content = <EditNoteForm note={note} users={users} />

    // Return the JSX content
    return content
}

// Export the EditNote component as the default export
export default EditNote
