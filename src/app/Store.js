import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../features/auth/authSlice';

// Configure the Redux store
export const store = configureStore({
    // Combine reducers, including the API slice reducer and the auth reducer
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // API slice reducer
        auth: authReducer, // Auth reducer
    },
    // Add middleware for handling API queries
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // Enable Redux DevTools extension
    devTools: true,
});

// Setup listeners for automatic query lifecycle management
setupListeners(store.dispatch);
