import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { notesAPI, useDeleteNoteMutation } from "../../store/API/notesAPI";
import { useGetNoteByIdQuery, useSetNoteTextMutation } from "../../store/API/notesAPI";
import { StyledButton, StyledInput } from "../../styles/StyledLogin";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";

const StyledContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 1em 0 1em;
`
    
const StyledSingleNote = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`

const StyledNoteInput = styled.textarea`
    display: flex;
    flex: 1;
    width: 80%;
    height 20em;
    border-width: 1px;
    border-radius: 5px;
    padding: 2% 0 0 2%;    
`

const SingleNote = () => {
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const { uid } = useAuth();
    const { noteId, folderId, typeOfView } = useSelector((state: any) => state.activeInstancesReducer);
    const { data } = useGetNoteByIdQuery({uid, folderId, noteId});
    const dispatch = useDispatch();
    const noteMutationTrigger = useSetNoteTextMutation()[0];
    const deleteNoteMutationTrigger = useDeleteNoteMutation()[0];
    
    useEffect(() => {
        setText(data?.text || "");
        setTitle(data?.title || "");
    }, [data ,noteId])

    const handleDeleteNote = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        try {
            deleteNoteMutationTrigger(
                {
                    uid,
                    folderId,
                    noteId: element?.value
                }
            )
            .then(() => {
                setText("");
                setTitle("");        
                dispatch(notesAPI.util.invalidateTags(['Note']));
            })
        } catch (error) {
            console.error('rejected', error);
        }
    }, [deleteNoteMutationTrigger, dispatch, folderId, uid])

    const handleSaveNote = useCallback( async (event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        const value = element.value;
        try {
            noteMutationTrigger(
                {
                    uid,
                    folderId, 
                    noteId: "noteId2" && noteId,
                    text: value,
                    title
                }
            )
            .then(() => {
                dispatch(notesAPI.util.invalidateTags(['Note']));
            })
        } catch (error) {
            console.error('rejected', error);
        }     
    }, [dispatch, folderId, title, noteId, noteMutationTrigger, uid])

    if(typeOfView === "list"){
        return null
    }

    return(
        <StyledContainer>
            <StyledSingleNote>
                <StyledInput
                    value={title}
                    onChange={(event: SyntheticEvent) => {
                        const element = elementFromEvent(event);
                        setTitle(element.value);
                    }}
                >
                </StyledInput>
                <StyledNoteInput 
                    rows={20}
                    value={text}
                    onChange={(event: SyntheticEvent) => {
                        const element = elementFromEvent(event);
                        setText(element.value);
                    }}
                />
                {title && (
                    <>
                        <StyledButton
                            value={noteId}
                            onClick={handleDeleteNote}
                            >
                            Delete
                        </StyledButton>
                    </>
                )}
                {text && (<StyledButton
                        value={noteId}
                        onClick={handleSaveNote}
                    >
                        Save
                    </StyledButton>
                )}
            </StyledSingleNote>
        </StyledContainer>
    )
}
export default SingleNote;