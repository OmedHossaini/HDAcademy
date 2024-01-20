// Importing necessary components and hooks
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

// Definition of the NewNoteForm component
const NewNoteForm = ({ users }) => {
    // Mutation hook for adding a new note
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    // React Router hook for navigation
    const navigate = useNavigate()

    // State variables for new note details
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    // Effect to handle navigation after successful note creation
    useEffect(() => {
        if (isSuccess) {
            // Reset form state and navigate to notes page
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    // Event handlers for form inputs
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    // Check if the form is in a valid state for saving
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    // Save note button click handler
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    // Generate options for the user select dropdown
    const options = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        > {user.username}</option>
    ))

    // Determine the error class based on whether there is an error
    const errClass = isError ? "errmsg" : "offscreen"
    
    // Determine the class for incomplete form inputs
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    // JSX content for the NewNoteForm component
    const content = (
        <>
            {/* Display error message if there is an error */}
            <p className={errClass}>{error?.data?.message}</p>

            {/* New note form */}
            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    {/* New note title and action buttons */}
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        {/* Save button */}
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                {/* New note title input */}
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                {/* New note text input */}
                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                {/* New note assigned user select dropdown */}
                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {/* Render user options */}
                    {options}
                </select>

            </form>
        </>
    )

    // Return the JSX content
    return content
}

// Export the NewNoteForm component as the default export
export default NewNoteForm
