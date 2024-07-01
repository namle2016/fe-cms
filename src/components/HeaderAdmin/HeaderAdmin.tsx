import React, { useEffect, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import { useRouter } from 'next/navigation';
import './header.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
import Cookies from "js-cookie";
import { setUser, setToken } from '@/store/auth/auth.reducer';
const { Header } = Layout;

type Props = {
    collapsed: boolean;
    onChangeCollapseHeader: () => void;
};

function HeaderAdmin({ collapsed, onChangeCollapseHeader }: Props) {
    const router = useRouter();
    // const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState({
        role: '',
        email: '',
        avatar: '',
        fullName: '',
    });

    // useEffect(() => {
    //     setInfo({
    //         role: user.data.role,
    //         email: user.data.email,
    //         avatar: user.data.avatar,
    //         fullName: user.data.fullname,
    //     });
    // }, [user]);
    return (
        <>
            <Header className="customize-header-admin">
                <div className="header-action-admin">
                    <Button
                        className="customize-btn-collapsed"
                        icon={collapsed ? <RiMenuUnfoldFill /> : <RiMenuFoldFill />}
                        onClick={onChangeCollapseHeader}
                    />
                </div>
                <Button type="primary"
                    danger
                    icon={<LogoutOutlined />}
                    style={{ background: "" }} onClick={async () => {
                        dispatch(setUser({
                            email: '',
                            avatar: '',
                            role: ''
                        }));

                        dispatch(setToken(''))

                        Cookies.remove('accessToken')
                        Cookies.remove('userData')
                        setLoading(false);
                        router.push('/admin/dang-nhap', { scroll: false });
                    }}>
                    Thoát
                </Button>
            </Header>
        </>
    );
}

export default HeaderAdmin;
