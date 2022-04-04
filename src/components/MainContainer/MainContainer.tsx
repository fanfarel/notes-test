import { FC } from "react";
import { 
    StyledAllNotesContainer, 
    StyledMainContainer, 
    StyledNotesContainer
} from "../../styles/StyledMainContainer";
import Folders from "./Folders";
import Header from "./Header";
import NotesList from "./NotesList";
import SingleNote from "./SingleNote";

const MainContainer : FC = () => {
    return(
        <StyledMainContainer>
            <Header/>
            <StyledAllNotesContainer>
                <Folders/>
                <StyledNotesContainer>
                    <NotesList/>
                    <SingleNote/>
                </StyledNotesContainer>
            </StyledAllNotesContainer>
        </StyledMainContainer>
    )
}

export default MainContainer;