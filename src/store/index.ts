import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { foldersAPI } from './API/foldersAPI'
import { notesAPI } from './API/notesAPI'
import activeInstancesReducer from './slices/activeInstancesSlice'

export const store = configureStore({
    reducer: {
        [foldersAPI.reducerPath]: foldersAPI.reducer,
        [notesAPI.reducerPath]: notesAPI.reducer,
        activeInstancesReducer: activeInstancesReducer
    },
    middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(foldersAPI.middleware)
            .concat(notesAPI.middleware)
})

setupListeners(store.dispatch)