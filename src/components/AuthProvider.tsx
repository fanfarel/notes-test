import React, { useCallback } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configs/firebaseConfig"

const firebaseInit = initializeApp(firebaseConfig);
const auth = getAuth(firebaseInit);

export let AuthContext = React.createContext<AuthContextType>(null!);

export const useAuth = () => React.useContext(AuthContext);

type UserData = {
    email: string,
    pass: string
}

interface AuthContextType {
    user: any;
    signin: (newUser: UserData, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const firebaseAuthProvider = {
    isAuthenticated: false,
    signIn: (callback: VoidFunction) => {
        firebaseAuthProvider.isAuthenticated = true;
        callback();
    },
    signOut(callback: VoidFunction) {
        firebaseAuthProvider.isAuthenticated = false;
        callback();
    },
};


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    let [user, setUser] = React.useState<UserData>();

    const signin = useCallback((newUser: UserData, callback: VoidFunction) => {
        return firebaseAuthProvider.signIn(() => {
            try{
                signInWithEmailAndPassword(auth, newUser.email, newUser.pass)
                .then(() => {
                    setUser(newUser);
                    callback();
                })
                .catch((error: any) => {
                    alert(error);
                })
            }catch(error: any){
                alert(error);
            }
        });
    }, [])
  
    const signout = useCallback((callback: VoidFunction) => {
      return firebaseAuthProvider.signOut(() => {
        setUser({email: "", pass: ""});
        callback();
      });
    }, [])
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider