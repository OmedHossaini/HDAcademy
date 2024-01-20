import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

// Base query configuration for making API requests
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://hdacademynotes-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // Get the authentication token from the Redux state
        const token = getState().auth.token;

        // If a token exists, set it in the headers for authorization
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Customized base query function that handles token refresh on 403 errors
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Original baseQuery arguments, API, and extraOptions for customization
    // console.log(args); // request url, method, body
    // console.log(api); // signal, dispatch, getState()
    // console.log(extraOptions); // custom options like { shout: true }

    // Execute the original baseQuery and get the result
    let result = await baseQuery(args, api, extraOptions);

    // If the result has a 403 error, attempt to refresh the access token
    if (result?.error?.status === 403) {
        console.log('sending refresh token');

        // Send a refresh token request to get a new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            // Store the new token in the Redux state
            api.dispatch(setCredentials({ ...refreshResult.data }));

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Handle refresh failure, set a custom error message
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired. ";
            }
            return refreshResult;
        }
    }

    return result;
};

// Create an API slice using createApi from @reduxjs/toolkit/query
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, // Use the custom baseQuery with token refresh
    tagTypes: ['Note', 'User'], // Define tag types for caching
    endpoints: builder => ({}), // Define API endpoints here if needed
});

// Export the generated hooks and actions from the API slice
export const { useBaseQuery } = apiSlice;
export const { endpoints } = apiSlice;
