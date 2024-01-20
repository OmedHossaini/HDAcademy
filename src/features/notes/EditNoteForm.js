// Importing necessary components and hooks
import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

// Definition of the EditNoteForm component
const EditNoteForm = ({ note, users }) => {
    // Extracting user role information using the useAuth custom hook
    const { isManager, isAdmin } = useAuth()

    // Mutation hook for updating a note
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    // Mutation hook for deleting a note
    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    // React Router hook for navigation
    const navigate = useNavigate()

    // State variables for note details
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    // Effect to handle navigation after successful update or delete
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            // Reset form state and navigate to notes page
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    // Event handlers for form inputs
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    // Check if the form is in a valid state for saving
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    // Save note button click handler
    const onSaveNoteClicked = async () => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    // Delete note button click handler
    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    // Format creation and update timestamps
    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    // Generate options for the user select dropdown
    const options = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        > {user.username}</option>
    ))

    // Determine the error class based on whether there is an error
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    
    // Determine the class for incomplete form inputs
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    // Extract error message from the mutation error, or use an empty string
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    // Conditionally render the delete button for managers and administrators
    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    // JSX content for the EditNoteForm component
    const content = (
        <>
            {/* Display error message if there is an error */}
            <p className={errClass}>{errContent}</p>

            {/* Note edit form */}
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    {/* Note title and action buttons */}
                    <h2>Edit Note #{note.ticket}</h2>
                    <div className="form__action-buttons">
                        {/* Save button */}
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {/* Delete button */}
                        {deleteButton}
                    </div>
                </div>
                {/* Note title input */}
                <label className="form__label" htmlFor="note-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                {/* Note text input */}
                <label className="form__label" htmlFor="note-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <div className="form__row">
                    <div className="form__divider">
                        {/* Completed checkbox and assigned user select dropdown */}
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {/* Render user options */}
                            {options}
                        </select>
                    </div>
                    {/* Timestamps for note creation and update */}
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    // Return the JSX content
    return content
}

// Export the EditNoteForm component as the default export
export default EditNoteForm
