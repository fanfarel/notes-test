import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { foldersAPI } from './API/foldersAPI'

export const store = configureStore({
  reducer: {
    [foldersAPI.reducerPath]: foldersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foldersAPI.middleware),
})

setupListeners(store.dispatch)