// Importing the necessary functions from the apiSlice and authSlice
import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

// Creating and configuring the authApiSlice using apiSlice.injectEndpoints
export const authApiSlice = apiSlice.injectEndpoints({
    // Defining the API endpoints using the builder
    endpoints: builder => ({
        // Login endpoint for authenticating users
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        // SendLogout endpoint for logging out users
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),

            // Handling logic when the logout query is initiated
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // Extracting data from the query response
                    const { data } = await queryFulfilled;
                    console.log(data);

                    // Dispatching the logOut action to update the authentication state
                    dispatch(logOut());

                    // Resetting the API state after a delay
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState());
                    }, 1000);
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        // Refresh endpoint for obtaining a new access token
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),

            // Handling logic when the refresh query is initiated
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // Extracting data from the query response
                    const { data } = await queryFulfilled;
                    console.log(data);

                    // Extracting the new access token and dispatching the setCredentials action
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
});

// Extracting hooks for using the login, sendLogout, and refresh mutations
export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice;
