import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDatabase, ref, get, child, set } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(getDatabase());

export const notesAPI = createApi({
    reducerPath: 'notesAPI',
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Note"],
    endpoints: (builder) => ({
        getNotesByFolder: builder.query({
            async queryFn(_arg) {                
                const result = await get(child(dbRef, `/${_arg.uid}/notes/${_arg.folderId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    } else {
                        console.info("No notes available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                return {data: {...result}};
            },
            providesTags: ["Note"]
        }),
        getNoteById: builder.query({
            async queryFn(_arg) {                
                const result = await get(child(dbRef, `/${_arg.uid}/notes/${_arg.folderId}/${_arg.noteId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    } else {
                        console.info("Empty note?");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                return {data: {...result}};
            },
            providesTags: ["Note"]
        }),
        setNoteText: builder.mutation({
            async queryFn(_arg) {                
                await set(
                    ref(
                        db, 
                        `/${_arg.uid}/notes/${_arg.folderId}/${_arg.noteId}`
                    ), 
                    {
                        title: _arg.title,
                        id: _arg.noteId,
                        text: _arg.text
                    }
                )
                .then((result) => {
                    return result
                })
                .catch((error) => {
                    console.error(error);
                });
                return {data: {update: "done update"}};
            },
            invalidatesTags: ["Note"]
        })
    }),
})

export const { 
    useGetNotesByFolderQuery, 
    useGetNoteByIdQuery, 
    useSetNoteTextMutation
} = notesAPI;