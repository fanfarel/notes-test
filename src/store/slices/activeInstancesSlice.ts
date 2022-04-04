import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ActiveInstancesState {
    folderId: string,
    noteId: string,
    typeOfView: string,
    fontSize: string,
    searchString: string
}

const initialState: ActiveInstancesState = {
    folderId: "",
    noteId: "",
    typeOfView: "all",
    fontSize: "",
    searchString: ""
}

export const activeInstancesSlice = createSlice({
    name: "activeInstances",
    initialState,
    reducers: {
        setActiveFolder: (state: ActiveInstancesState, action: PayloadAction<string>) => {
            state.folderId = action.payload
        },
        setActiveNote: (state: ActiveInstancesState, action: PayloadAction<string>) => {
            state.noteId = action.payload
        },
        setTypeOfView: (state: ActiveInstancesState, action: PayloadAction<string>) => {
            state.typeOfView = action.payload
        },
        setFontSize: (state: ActiveInstancesState, action: PayloadAction<string>) => {
            state.fontSize = action.payload
        },
        setSearchString: (state: ActiveInstancesState, action: PayloadAction<string>) => {
            state.searchString = action.payload
        }
    },
})

export const { 
    setActiveFolder, 
    setActiveNote, 
    setTypeOfView,
    setSearchString
} = activeInstancesSlice.actions

export default activeInstancesSlice.reducer