import styled from "styled-components";
import { useGetFoldersByUserQuery } from "../../store/API/foldersAPI";
import { useAuth } from "../AuthProvider";


const StyledNotesList = styled.div`
    flex: 1
`
const NotesList = () => {
    const { uid } = useAuth();
    const { data, error, isLoading } = useGetFoldersByUserQuery(uid);
    if(isLoading){
        return null
    }
    
    return(
        <StyledNotesList>
            <p>{JSON.stringify({data, error, isLoading})}</p>
        </StyledNotesList>
    )
}
export default NotesList;