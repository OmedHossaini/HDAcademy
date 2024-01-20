// Importing necessary components, store, and API slices
import { store } from '../../app/Store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Definition of the Prefetch component
const Prefetch = () => {
    // Use useEffect to dispatch prefetch actions when the component mounts
    useEffect(() => {
        // Dispatching prefetch action for 'getNotes' API endpoint
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        
        // Dispatching prefetch action for 'getUsers' API endpoint
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    // Render the child components using Outlet
    return <Outlet />
}

// Export the Prefetch component as the default export
export default Prefetch
