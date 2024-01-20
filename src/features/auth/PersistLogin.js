// Importing necessary React components and hooks
import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

// Definition of the PersistLogin component
const PersistLogin = () => {
    // Retrieving persistent login state from custom hook
    const [persist] = usePersist()

    // Getting the current authentication token from Redux store
    const token = useSelector(selectCurrentToken)

    // Ref for tracking whether the effect has run
    const effectRan = useRef(false)

    // State variable for tracking the success of the refresh mutation
    const [trueSuccess, setTrueSuccess] = useState(false)

    // Mutation hook for refreshing the authentication token
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    // Effect to handle token verification and refresh when the component mounts
    useEffect(() => {
        // Check if the effect has run and if not in development mode
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

            // Function to verify the refresh token and set the true success flag
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    // Attempt to refresh the token
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            // Check if there is no token and persistent login is enabled
            if (!token && persist) {
                verifyRefreshToken()
            }
        }

        // Cleanup function to mark that the effect has run
        return () => effectRan.current = true;

    }, [])

    // Determine the content based on various conditions
    let content
    if (!persist) { // If persistent login is not enabled
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { // If the refresh mutation is in progress
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { // If there is an error during the refresh
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { // If the refresh is successful
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { // If there is a token but it is uninitialized
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    // Return the determined content
    return content
}

// Export the PersistLogin component as the default export
export default PersistLogin
