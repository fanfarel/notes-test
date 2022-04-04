import { FC, SyntheticEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { foldersAPI, useCreateFolderMutation, useDeleteFolderMutation, useGetFoldersByUserQuery } from "../../store/API/foldersAPI";
import { setActiveFolder } from "../../store/slices/activeInstancesSlice";
import { StyledButton, StyledInput } from "../../styles/StyledLogin";
import { elementFromEvent } from "../../utils/utils";
import { useAuth } from "../AuthProvider";
import { StyledFolders, StyledButtonTitle, StyledButtonDelete, StyledFolderContainer} from "../../styles/StyledFolders";

const Folders : FC = () => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const { uid } = useAuth();
    const { data, isLoading } = useGetFoldersByUserQuery(uid);
    const dispatch = useDispatch();
    const createFolderMutationTrigger = useCreateFolderMutation()[0];
    const deleteFolderMutationTrigger = useDeleteFolderMutation()[0];
    
    const toggleInput = useCallback(() => setShowInput(!showInput), [showInput]);

    const handleDeleteFolder = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        try {
            deleteFolderMutationTrigger(
                {
                    uid,
                    folderId: element?.value
                }
            )
            .then(() => {
                dispatch(foldersAPI.util.invalidateTags(['Folder']));
            })
        } catch (error) {
            console.error('rejected', error);
        }
    }, [deleteFolderMutationTrigger, dispatch, uid])

    const handleCraeteFolder = useCallback(() => {
        if(!showInput) {
            toggleInput();
            return null;
        };
        try {
            createFolderMutationTrigger(
                {
                    uid,
                    title
                }
            )
            .then(() => {
                dispatch(foldersAPI.util.invalidateTags(['Folder']));
            })
        } catch (error) {
            console.error('rejected', error);
        }
        toggleInput();
    }, [showInput, toggleInput, createFolderMutationTrigger, uid, title, dispatch])

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
                <StyledFolderContainer
                    key={i}
                >
                    <StyledButtonTitle
                        value={data[folder].id}
                        onClick={handleFolderClick}
                    >
                        <p>{data[folder].name}</p>
                    </StyledButtonTitle>
                    <StyledButtonDelete
                        value={data[folder].id}
                        onClick={handleDeleteFolder}
                    >
                        Delete
                    </StyledButtonDelete>
                </StyledFolderContainer>
            ))}
            {showInput && (
                <StyledInput
                    value={title}
                    onChange={(event: SyntheticEvent) => {
                        const element = elementFromEvent(event);
                        setTitle(element.value);
                    }}
                >
                </StyledInput>
            )}
            <StyledButton
                onClick={handleCraeteFolder}
            >
                {showInput ? "Confirm" : "Create"}
            </StyledButton>
        </StyledFolders>
    )
}
export default Folders;