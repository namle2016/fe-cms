'use client';
import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { setToken, setUser } from "./auth/auth.reducer";
import { useAppDispatch } from ".";

type Props = { children?: React.ReactNode; };

const AuthProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const userData: any = Cookies.get('userData')
        const token = Cookies.get('accessToken')
        if (token && token !== '' && userData) {
            dispatch(setUser(JSON.parse(userData)));
            dispatch(setToken(token));
        }
    }, []);
    return <Fragment>{children}</Fragment>;
};

export default AuthProvider;

