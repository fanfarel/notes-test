import React, {useState, FC, SyntheticEvent, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/utils";
import { useAuth } from "./AuthProvider";

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
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        element.type === "email" ? setEmail(value) : setPass(value);
    }, [])

    return(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <input type={"email"} onChange={handleInput}></input>
            <input type ={"password"} onChange={handleInput}></input>
            <button title={"Sign In"} onClick={handleButton}>Sign In</button>
        </div>
    )
}

export default Login;