import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from 'react-spinners/PulseLoader';

const NotesList = () => {
    // Set page title
    useTitle('HD: Notes List');

    // Get authentication details
    const { username, isManager, isAdmin } = useAuth();

    // Fetch notes data using the `useGetNotesQuery` hook
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,  // Polling interval for automatic data refetching
        refetchOnFocus: true,    // Refetch data when the component comes into focus
        refetchOnMountOrArgChange: true  // Refetch data on mount or when query arguments change
    });

    let content;

    // Display loading spinner while data is being fetched
    if (isLoading) content = <PulseLoader color={"#FFF"} />;

    // Display error message if there's an error fetching data
    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    // Display notes data if fetching is successful
    if (isSuccess) {
        const { ids, entities } = notes;

        // Filter notes based on user role (manager or admin sees all notes, others see their own)
        let filteredIds;
        if (isManager || isAdmin) {
            filteredIds = [...ids];
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username);
        }

        // Generate content for the table based on filtered note ids
        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

        // Render the table with header and content
        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
};

export default NotesList;
