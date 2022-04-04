import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import React, { FC, SyntheticEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSearchString, setTypeOfView } from "../../store/slices/activeInstancesSlice";
import { StyledButton, StyledInput } from "../../styles/StyledLogin";
import { elementFromEvent } from "../../utils/utils";

const StyledHeader = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`

const Header : FC = () => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const { typeOfView } = useSelector((state: any) => state.activeInstancesReducer)
    const dispatch = useDispatch();
    
    const toggleInput = useCallback(() => setShowInput(!showInput), [showInput])

    const handleSearch = useCallback((event : SyntheticEvent) => {
        const element = elementFromEvent(event);
        dispatch(setSearchString(element.value))
    }, [dispatch])

    const handleChangeView = useCallback(() => {
        if(typeOfView !== "all"){
            dispatch(setTypeOfView("all"))
        }else{
            dispatch(setTypeOfView("list"))
        }
    }, [dispatch, typeOfView])

    return(
        <StyledHeader>
            <StyledButton
                onClick={handleChangeView}
            >
                <AppstoreOutlined />
            </StyledButton>
            {typeOfView !== "all" && (
                <StyledButton
                    onClick={() => {
                        dispatch(setTypeOfView("list"))
                    }}
                >
                    {typeOfView !== "list" ? "goBack" : "noGoBack"}
                </StyledButton>
            )}
            <StyledButton
                onClick={toggleInput}
            >
                <SearchOutlined />
            </StyledButton>
            {showInput && (
                <StyledInput
                    onChange={handleSearch}
                >

                </StyledInput>
            )}

        </StyledHeader>
    )
};

export default Header;