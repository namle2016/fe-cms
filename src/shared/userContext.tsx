"use client";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/store/auth/auth.type";
const UserContext = createContext({});
export const useGlobalContext = () => useContext(UserContext);
//export const userContext = createContext({})

const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string>()
    const userStore: any = Cookies.get('userData');
    const tokenStore: any = Cookies.get('accessToken');
    useEffect(() => {
        if (userStore) setUser(JSON.parse(userStore))
        if (tokenStore) setToken(tokenStore)
    }, [userStore]);

    return (
        <UserContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider