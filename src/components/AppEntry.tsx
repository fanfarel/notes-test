import React, { FC } from "react";
import Login from "./Login";
import {
    Routes,
    Route,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import styled from "styled-components";
import MainContainer from "./MainContainer/MainContainer";
import AuthProvider, { useAuth } from "./AuthProvider";
import { StyledButton } from "../styles/StyledLogin";
import { StyledP } from "../styles/StyledNotesList";

const StyledAuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
`

const StyledAuthButton = styled(StyledButton)`
    flex: 0
`
const GlobalDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 2em;
    background-color: honeydew;
`

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.user?.email) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
} 

const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    if (!auth.user) {
        return (
            <StyledAuthContainer>
                <StyledP>
                    You are not logged in.
                </StyledP>
            </StyledAuthContainer>
        );
    }
  
    return (
        <StyledAuthContainer>
            <p>
                Welcome {auth.user.email}!{" "}
            </p>
                <StyledAuthButton
                    onClick={() => {
                        auth.signout(() => navigate("/"));
                    }}
                >
                    Sign out
                </StyledAuthButton>
        </StyledAuthContainer>
    );
}
  
const Layout = () => {
    return (
      <GlobalDiv>
        <AuthStatus />
        <Outlet />
      </GlobalDiv>
    );
}
 
const AppEntry : FC = () => (
    <AuthProvider>
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route
                path="/notes"
                element={
                    <RequireAuth>
                        <MainContainer />
                    </RequireAuth>
                }
            />
            </Route>
        </Routes>
    </AuthProvider>
)

export default AppEntry