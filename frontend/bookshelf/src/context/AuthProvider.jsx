import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const logout = () => {
        setAuth({}); 
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth,logout  }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
