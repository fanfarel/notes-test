import { SyntheticEvent, useCallback } from "react";
import styled from "styled-components";

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

    const handleSaveNote = useCallback((event: SyntheticEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        console.info(value, "value")
    }, [])

    return(
        <StyledSingleNote>
            <StyledNoteInput 
                onBlur={handleSaveNote}
            ></StyledNoteInput>
        </StyledSingleNote>
    )
}
export default SingleNote;