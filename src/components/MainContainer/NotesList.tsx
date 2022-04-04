import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesAPI, useGetNotesByFolderQuery, useSetNoteTextMutation } from "../../store/API/notesAPI";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";
import { setActiveNote, setTypeOfView } from "../../store/slices/activeInstancesSlice";
import { StyledButton } from "../../styles/StyledLogin";
import { StyledNotesList, StyledNoteElementContainer, StyledNoteButtonContainer, StyledP } from "../../styles/StyledNotesList";
interface FilteredDataType {
    title: string,
    id: string,
}

const initialState: FilteredDataType = {
    title: "",
    id: "",
}
 
const NotesList : FC = () => {
    const [filteredData, setFilteredData] = useState<FilteredDataType>(initialState);
    const { uid } = useAuth();
    const { folderId, typeOfView, searchString } = useSelector((state: any) => state.activeInstancesReducer);
    const { data, isLoading } = useGetNotesByFolderQuery({uid: uid, folderId: folderId});
    const dispatch = useDispatch();
    const noteMutationTrigger = useSetNoteTextMutation()[0];
    
    const filterData = useCallback((data) => {
        if(!isLoading && searchString && Object.keys(data)?.length){
            let filteredData : any = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    const lowerCaseElement = element?.title.toLowerCase()
                    const lowerCaseSearch = searchString.toLowerCase()
                    if(lowerCaseElement.indexOf(lowerCaseSearch) > -1){
                        filteredData[key] = element
                    }
                }
            }
            setFilteredData(filteredData);
        }else{
            setFilteredData(data);
            return null;
        }
    }, [isLoading, searchString])

    useEffect(() => {
        filterData(data);
    }, [data, filterData])

    const handleCraeteNote = useCallback(() => {
        try {
            noteMutationTrigger(
                {
                    uid,
                    folderId, 
                    noteId: (new Date()).getTime(),
                    text: "",
                    title: "New Note!"
                }
            )
            .then(() => {
                dispatch(notesAPI.util.invalidateTags(['Note']));
            })
        } catch (error) {
            console.error('rejected', error);
        }
    }, [dispatch, folderId, noteMutationTrigger, uid])

    const handleNoteClick = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        dispatch(setActiveNote(element.value));
        if(typeOfView !== "all"){
            dispatch(setTypeOfView("note"))
        }
    }, [dispatch, typeOfView])

    if(isLoading || !folderId){
        return null;
    }

    return(
        <div>
            {typeOfView !== "note" && (
                <StyledNotesList>
                    {Object.keys(filteredData).map(( note, i ) => (
                        <StyledNoteElementContainer
                            key={i}
                        >
                            <StyledNoteButtonContainer
                                value={(filteredData as any)[note].id}
                                onClick={handleNoteClick}
                            >
                                <StyledP>{(filteredData as any)[note].title}</StyledP>
                            </StyledNoteButtonContainer>
                        </StyledNoteElementContainer>
                    ))}
                    <StyledButton
                        onClick={handleCraeteNote}
                    >
                        Craete Note
                    </StyledButton>
                </StyledNotesList>
            )}
        </div>
    )
}
export default NotesList;
