import { FC } from "react";
import styled from "styled-components";
import Folders from "./Folders";
import NotesList from "./NotesList";
import SingleNote from "./SingleNote";

const StyledMainContainer = styled.div`
    display: flex;
    flexDirection: row;
    justifyContent: stretch;
    alignItems: center;
`

const MainContainer : FC = () => {
    return(
        <StyledMainContainer>
            <Folders/>
            <NotesList/>
            <SingleNote/>
        </StyledMainContainer>
    )
}

export default MainContainer;