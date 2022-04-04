import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { notesAPI } from "../../store/API/notesAPI";
import { useGetNoteByIdQuery, useSetNoteTextMutation } from "../../store/API/notesAPI";
import { StyledInput } from "../../styles/StyledLogin";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";

const StyledSingleNote = styled.div`
    flex: 1
`

const StyledNoteInput = styled.textarea`
    display: flex;
    flex: 1;
    width: 80%;
    height 20em;
    border-width: 1px;
    border-radius: 10px;
    padding: 2% 0 0 2% 
`

const SingleNote = () => {
    const [text, setText] = useState<string>();
    const [title, setTitle] = useState<string>();
    const { uid } = useAuth();
    const { noteId, folderId } = useSelector((state: any) => state.activeInstancesReducer);
    const { data } = useGetNoteByIdQuery({uid, folderId, noteId});
    const noteMutationTrigger = useSetNoteTextMutation()[0];
    const dispatch = useDispatch();

    useEffect(() => {
        setText(data?.text);
        setTitle(data?.title);
    }, [noteId, data])
    
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
          
    }, [dispatch, folderId, noteId, noteMutationTrigger, title, uid])


    return(
        <StyledSingleNote>
            <StyledInput
                value={title}
                onChange={(event: SyntheticEvent) => {
                    const element = elementFromEvent(event);
                    setTitle(element.value);
                }}
            >
            </StyledInput>
            <h3>
                {}
            </h3>
            <StyledNoteInput 
                value={text}
                onBlur={handleSaveNote}
                onChange={(event: SyntheticEvent) => {
                    const element = elementFromEvent(event);
                    setText(element.value);
                }}
            />
        </StyledSingleNote>
    )
}
export default SingleNote;