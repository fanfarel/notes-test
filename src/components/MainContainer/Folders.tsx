import { FC, SyntheticEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useGetFoldersByUserQuery } from "../../store/API/foldersAPI";
import { setActiveFolder } from "../../store/slices/activeInstancesSlice";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";

const StyledFolders = styled.div`
    flex: 1;
    flex-direction: column;
    justify-content: center
`

const Folders : FC = () => {
    const { uid } = useAuth();
    const { data, isLoading } = useGetFoldersByUserQuery(uid);
    const dispatch = useDispatch();
    
    const handleFolderClick = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        dispatch(setActiveFolder(element.value));
    }, [dispatch])
    
    if(isLoading){
        return null
    }

    return(
        <StyledFolders>
            {Object.keys(data).map(( folder, i ) => (
                <div>
                    <button
                        value={data[folder].id}
                        onClick={handleFolderClick}
                    >
                        <p>{data[folder].name}</p>
                    </button>
                </div>
            ))}
        </StyledFolders>
    )
}
export default Folders;