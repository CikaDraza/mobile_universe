import {createContext, useContext, useEffect, useState} from "react";

const UserState = createContext({})

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
        permissions: ''
    })
    const [token, setToken] = useState(localStorage.getItem('TOKEN') || '')

    useEffect(() => {
        handleToken();
    }, [token]);

    function handleToken() {
        if (token) {
            localStorage.setItem('TOKEN', token)
        }else {
            localStorage.removeItem('TOKEN')
        }
        setToken(token)
    }

    return (
        <UserState.Provider value={{
            currentUser,
            setCurrentUser,
            token,
            setToken
        }}>
            {children}
        </UserState.Provider>
    )
}

export const userStateContext = () => useContext(UserState);
