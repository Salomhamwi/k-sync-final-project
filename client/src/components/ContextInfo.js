import { createContext, useEffect} from "react"

import { useState } from "react"
// we made all of this so we can still get the information from the backend upon refreshing the page
export const ContextInfo = createContext(null)
export const InfoProvider = ({ children }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        dragonBoatRole: "",
        paddlingSide: "",
        teamJoined: false, 
    });
    
    useEffect(() => {
        // Retrieve user data from localStorage on component mount
        const storedUserData = window.localStorage.getItem("userData");
        if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUser(userData);
        }
    }, []);

    useEffect(() => {
        // Update localStorage when user data changes
        if (user) {
        window.localStorage.setItem("userData", JSON.stringify(user));
        } else {
        window.localStorage.removeItem("userData");
        }
    }, [user]);

    return(
        <ContextInfo.Provider value={{ user, setUser}}>
            {children}
        </ContextInfo.Provider>
    )
}