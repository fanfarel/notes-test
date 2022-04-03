import React, { useCallback } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseInit } from "../store/API/foldersAPI";

const auth = getAuth(firebaseInit);

export let AuthContext = React.createContext<AuthContextType>(null!);

export const useAuth = () => React.useContext(AuthContext);

type UserData = {
    email: string,
    pass: string
}

interface AuthContextType {
    uid: string | undefined;
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
    let [user, setUser] = React.useState<UserData | null>();
    let [uid, setUid]  = React.useState<string>();
    const signin = useCallback((newUser: UserData, callback: VoidFunction) => {
        return firebaseAuthProvider.signIn(() => {
            try{
                signInWithEmailAndPassword(auth, newUser.email, newUser.pass)
                .then((res) => {
                    setUid(res.user?.uid)
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
            try{
                signOut(auth).then(() => {
                    setUser(null);
                }).catch((error) => {
                    console.error(error)
                }); 
            }catch(e){
                alert(e)
            }
        callback();
      });
    }, [])
  
    let value = { uid, user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider