import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDatabase, ref, get, child, set } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(getDatabase());

export const foldersAPI = createApi({
    reducerPath: 'foldersApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Folder"],
    endpoints: (builder) => ({
        getFoldersByUser: builder.query({
            async queryFn(_arg) {                
                const result = await get(child(dbRef, `/${_arg}/folders`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    } else {
                        console.info("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                return {data: {...result}};
            },
            providesTags: ["Folder"]
        }),
        createFolder: builder.mutation({
            async queryFn(_arg) {                
                await set(
                    ref(
                        db, 
                        `/${_arg.uid}/folders/${(new Date()).getTime()}`
                    ), 
                    {
                        name: _arg.title,
                        id: (new Date()).getTime(),
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
            invalidatesTags: ["Folder"]
        }),
        deleteFolder: builder.mutation({
            async queryFn(_arg) {                
                await set(
                    ref(
                        db, 
                        `/${_arg.uid}/folders/${_arg.folderId}`
                    ),
                    null
                )
                .then((result) => {
                    return result
                })
                .catch((error) => {
                    console.error(error);
                });
                return {data: {update: "done update"}};
            },
            invalidatesTags: ["Folder"]
        })   
    }),
})

export const { 
    useGetFoldersByUserQuery, 
    useCreateFolderMutation,
    useDeleteFolderMutation
} = foldersAPI