import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditUser = () => {
    // Set the title for the page
    useTitle('HD: Edit User')

    // Get the user id from the route parameters
    const { id } = useParams()

    // Query the user data using the usersApiSlice
    const { user } = useGetUsersQuery("usersList", {
        // Select the user from the query result
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    // If user data is not available, show a loading spinner
    if (!user) return <PulseLoader color={"#FFF"} />

    // Render the EditUserForm component with the user data
    const content = <EditUserForm user={user} />

    return content
}

export default EditUser
