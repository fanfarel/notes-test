import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDatabase, ref, get, child } from 'firebase/database';

const dbRef = ref(getDatabase());

export const foldersAPI = createApi({
    reducerPath: 'foldersApi',
    baseQuery: fakeBaseQuery(),
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
        })      
    }),
})

export const { useGetFoldersByUserQuery } = foldersAPI