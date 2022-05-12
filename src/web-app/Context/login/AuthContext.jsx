import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const localStorageToken = localStorage.getItem("token");
    const [token, setToken] = useState(localStorageToken);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(localStorageUser);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>{children}</AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }