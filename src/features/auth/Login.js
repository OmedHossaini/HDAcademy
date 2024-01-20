// Importing necessary React components and hooks
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

// Definition of the Login component
const Login = () => {
    // Setting the title for the page
    useTitle('Employee Login')

    // Refs for input elements
    const userRef = useRef()
    const errRef = useRef()

    // State variables for form inputs and error message
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    // Custom hook for handling persistent login state
    const [persist, setPersist] = usePersist()

    // React Router hook for navigation
    const navigate = useNavigate()

    // Redux hook for dispatching actions
    const dispatch = useDispatch()

    // Mutation hook for login API request
    const [login, { isLoading }] = useLoginMutation()

    // Focus on username input when the component mounts
    useEffect(() => {
        userRef.current.focus()
    }, [])

    // Clear error message when username or password changes
    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Attempt login and dispatch the accessToken on success
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))

            // Clear input fields and navigate to the dashboard
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            // Handle different error scenarios
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
        }
    }

    // Handle user input for username
    const handleUserInput = (e) => setUsername(e.target.value)

    // Handle user input for password
    const handlePwdInput = (e) => setPassword(e.target.value)

    // Handle toggling of the "Trust This Device" checkbox
    const handleToggle = () => setPersist(prev => !prev)

    // Determine the class for displaying error messages
    const errClass = errMsg ? "errmsg" : "offscreen"

    // Display loading spinner while the login is in progress
    if (isLoading) return <PulseLoader color={"#FFF"} />

    // JSX content for the Login component
    const content = (
        <section className="public">
            {/* Header section */}
            <header>
                <h1>Employee Login</h1>
            </header>

            {/* Main content section */}
            <main className="login">
                {/* Display error message if present */}
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                {/* Login form */}
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>

                    {/* Checkbox for persistent login state */}
                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>

            {/* Footer section */}
            <footer>
                {/* Link to go back to the home page */}
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    // Return the JSX content
    return content
}

// Export the Login component as the default export
export default Login
