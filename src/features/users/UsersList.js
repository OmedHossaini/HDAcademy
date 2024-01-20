import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import useTitle from "../../hooks/useTitle";
import PulseLoader from 'react-spinners/PulseLoader';

const UsersList = () => {
    // Set the page title
    useTitle('HD: Users List');

    // Fetch users data using the generated query hook
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000, // Polling interval for automatic data refresh
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    // Display loading spinner while data is being fetched
    if (isLoading) content = <PulseLoader color={"#FFF"} />;

    // Display error message if there is an error fetching data
    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    // Display user data if the data fetching is successful
    if (isSuccess) {
        const { ids } = users;

        // Create an array of User components based on user IDs
        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />);

        // Render the users table
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
}

export default UsersList;
