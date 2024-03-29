// Importing necessary utilities and components
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// Creating an entity adapter for notes with sorting logic
const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

// Initializing the state using the entity adapter
const initialState = notesAdapter.getInitialState()

// Creating the notes API slice with endpoints
export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Endpoint for fetching notes
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            // Transforming the response data to match the entity adapter structure
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            // Providing tags for caching and invalidation
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        // Endpoint for adding a new note
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            // Invalidating tags for caching and invalidation
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        // Endpoint for updating a note
        updateNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            // Invalidating tags for caching and invalidation
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        // Endpoint for deleting a note
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/notes`,
                method: 'DELETE',
                body: { id }
            }),
            // Invalidating tags for caching and invalidation
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

// Exporting generated hooks from the notes API slice
export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice

// Selecting the result of the getNotes query
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// Selecting notes data using a selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)

// Exporting selectors generated by the entity adapter
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)
