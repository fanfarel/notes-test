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
import MainContainer from "./MainContainer/MainContainer";
import AuthProvider, { useAuth } from "./AuthProvider";


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
        return <p>You are not logged in.</p>;
    }
  
    return (
        <p>
            Welcome {auth.user.email}!{" "}
                <button
                    onClick={() => {
                        auth.signout(() => navigate("/"));
                    }}
                >
                    Sign out
                </button>
        </p>
    );
}
  
const Layout = () => {
    return (
      <div>
        <AuthStatus />
        <Outlet />
      </div>
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