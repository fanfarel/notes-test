import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FoldersState {
    folderId: string,
    noteId: string
}

const initialState: FoldersState = {
    folderId: "",
    noteId: ""
}

export const activeInstancesSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setActiveFolder: (state, action: PayloadAction<string>) => {
            state.folderId = action.payload
        },
        setActiveNote: (state, action: PayloadAction<string>) => {
            state.noteId = action.payload
        }
    },
})

export const { setActiveFolder, setActiveNote } = activeInstancesSlice.actions

export default activeInstancesSlice.reducer