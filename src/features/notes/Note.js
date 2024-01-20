// Importing necessary components and hooks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

// Definition of the Note component
const Note = ({ noteId }) => {
    // Querying the notes API to get information about the specified note
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    // React Router hook for navigation
    const navigate = useNavigate()

    // If the note is available, render the note details
    if (note) {
        // Format created and updated timestamps
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // Event handler for editing the note
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        // JSX content for the Note component
        return (
            <tr className="table__row">
                {/* Note status cell */}
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                {/* Note created timestamp cell */}
                <td className="table__cell note__created">{created}</td>
                {/* Note updated timestamp cell */}
                <td className="table__cell note__updated">{updated}</td>
                {/* Note title cell */}
                <td className="table__cell note__title">{note.title}</td>
                {/* Note username cell */}
                <td className="table__cell note__username">{note.username}</td>

                {/* Edit button cell */}
                <td className="table__cell">
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
        // If the note is not available, return null
        return null
    }
}

// Memoizing the Note component to optimize rendering
const memoizedNote = memo(Note)

// Export the memoized Note component as the default export
export default memoizedNote
