// Importing createSlice function from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

// Creating the authSlice using createSlice
const authSlice = createSlice({
    // Name of the slice
    name: 'auth',

    // Initial state of the slice
    initialState: { token: null },

    // Reducers defining actions and their logic
    reducers: {
        // Reducer for setting user credentials (e.g., access token)
        setCredentials: (state, action) => {
            // Extracting the accessToken from the action payload
            const { accessToken } = action.payload;
            
            // Updating the token in the state
            state.token = accessToken;
        },

        // Reducer for logging out the user
        logOut: (state, action) => {
            // Setting the token to null when logging out
            state.token = null;
        },
    }
});

// Exporting action creators for setCredentials and logOut
export const { setCredentials, logOut } = authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;

// Selector function to get the current token from the state
export const selectCurrentToken = (state) => state.auth.token;
