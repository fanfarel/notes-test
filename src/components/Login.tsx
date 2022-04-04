import React, { useState, FC, SyntheticEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { elementFromEvent, validateEmail } from "../utils/utils";
import { useAuth } from "./AuthProvider";
import { StyledButton, StyledInput, StyledLogin } from "../styles/StyledLogin";

const Login : FC = () => {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const auth = useAuth();
    const navigate = useNavigate();
    
    const handleButton = useCallback(() => {
        if(validateEmail(email)){
            auth.signin(
                {
                    email, 
                    pass
                },
                () => navigate(
                    "/notes", 
                    {
                        replace: true 
                    }
                )
            ) 
        }else{
            alert("Please enter valid email");
        }
    }, [auth, email, navigate, pass])
    
    const handleInput = useCallback((event: SyntheticEvent) => {
        const element = elementFromEvent(event);
        const value = element.value;
        element.type === "email" ? setEmail(value) : setPass(value);
    }, [])
    
    return(
        <StyledLogin>
            <StyledInput type={"email"} onChange={handleInput}></StyledInput>
            <StyledInput type ={"password"} onChange={handleInput}></StyledInput>
            <StyledButton title={"Sign In"} onClick={handleButton}>Sign In</StyledButton>
        </StyledLogin>
    )
}

export default Login;