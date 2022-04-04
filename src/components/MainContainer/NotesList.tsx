import { FC, SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useGetNotesByFolderQuery } from "../../store/API/notesAPI";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";
import { setActiveNote } from "../../store/slices/activeInstancesSlice";


const StyledNotesList = styled.div`
    flex: 1
`
const NotesList : FC = () => {
    const { uid } = useAuth();
    const { folderId } = useSelector((state: any) => state.activeInstancesReducer);
    const { data, isLoading } = useGetNotesByFolderQuery({uid: uid, folderId: folderId});
    const dispatch = useDispatch();

    const handleNoteClick = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        dispatch(setActiveNote(element.value));
    }, [dispatch])

    if(isLoading || !folderId){
        return null;
    }

    return(
        <StyledNotesList>
            {Object.keys(data).map(( note, i ) => (
                <div>
                    <button
                        value={data[note].id}
                        onClick={handleNoteClick}
                    >
                        <p>{data[note].title}</p>
                    </button>
                </div>
            ))}

        </StyledNotesList>
    )
}
export default NotesList;
