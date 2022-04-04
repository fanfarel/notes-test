import styled from "styled-components";

export const StyledFolders = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center
`

export const StyledButtonDelete = styled.button`
    display: none;
    flex: 1;
    align-items: center;
    border-width: 0;
    background-color: rgba(255,255,255,0);
    color: red
`

export const StyledFolderContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    border-width: 0;
    border-radius: 20px;
    &:hover ${StyledButtonDelete} {
        display: flex;
    }
    background-color: #e3e3e3;
    margin: 0.4em 0 0.4em 0
`
    
export const StyledButtonTitle = styled.button`
    flex: 4;
    border-width: 0;
    background-color: rgba(255,255,255,0)
`
