'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { ADMIN_PATH } from '@/shared/constants/common';

function AuthAdmin({ children }: any) {
    const router = useRouter();
    const { user, accessToken } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        if (accessToken === '') {
            router.push(ADMIN_PATH.auth.login);
            //  redirect(ADMIN_PATH.auth.login);
        }
        setLoading(false)
    }, [user, router]);

    if (loading) return <></>
    return (
        <Fragment>{children}</Fragment>
    );
}

export default AuthAdmin;
