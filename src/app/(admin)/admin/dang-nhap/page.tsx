'use client';
import Cookies from "js-cookie";

import React, { useState } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import styles from "./style.module.scss";
import { LoginLogo } from '@/assets/images';
import Image from 'next/image'
import { MdLockOutline, MdOutlinePermIdentity } from 'react-icons/md';
import { toast } from "react-toastify";
import { loginAction } from "@/store/auth/auth.action";

function Login() {
    const dispatch = useAppDispatch();
    const [emailU, setEmail] = useState<any>('guest@yalycouture.com');
    // useEffect(() => {
    //   if (user.accessToken !== '')
    //     router.push("/admin/thong-ke");
    // }, [user, router]);

    const onFinish = async (values: any) => {
        const { email, password } = values;
        const res = await dispatch(loginAction({ email: emailU, password: password, type: 'ADMIN' }));
        if (!res.payload) {
            toast.error('Đăng nhập thất bại')
        } else {
            // token: user.access_token,
            // user: user.data,
            Cookies.set('accessToken', res.payload.access_token, { expires: 2555 });
            Cookies.set('userData', JSON.stringify(res.payload.data), { expires: 2555 });
            toast.success('Đăng nhập thành công')
            window.location.href = "/admin";
        }
    };
    const handleChange = (value: string) => {
        setEmail(value);
    };
    return (
        <div className={styles.wrapper_admin_login}>
            <div className={styles.container}>
                <div className={styles.logo_and_name}>
                    <Image className={styles.logo} src={LoginLogo} alt="admin" />
                    <p >
                        Yaly Couture
                    </p>
                </div>
                <Form
                    onFinish={onFinish}
                    name="normal_login"
                    layout="vertical"
                    initialValues={{
                        email: 'guest@yalycouture.com',
                    }}
                >
                    <Space direction="vertical">
                        <Form.Item
                            name="email"
                            //rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            rules={[
                                // { required: true, message: 'Vui lòng nhập email' },
                                // {
                                //   type: 'email',
                                //   message: "Định dạng email không hợp lệ",
                                // },
                            ]}
                        >
                            <Select
                                //defaultValue="guest@yalycouture.com"
                                style={{ height: 50 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'admin@yalycouture.com', label: (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <MdOutlinePermIdentity style={{ color: '#666', fontSize: 22 }} />
                                                <p style={{ paddingLeft: 5, fontSize: 16 }}>admin@yalycouture.com</p>
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'guest@yalycouture.com', label: <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <MdOutlinePermIdentity style={{ color: '#666', fontSize: 22 }} />
                                            <p style={{ paddingLeft: 5, fontSize: 16 }}>guest@yalycouture.com</p>
                                        </div>
                                    },
                                ]}
                            />
                            {/* <Input
                style={{ height: 50 }}
                prefix={<MdOutlinePermIdentity style={{ color: '#666', fontSize: 22 }} />}
                placeholder="Email"
                size="large"
              /> */}
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password
                                style={{ height: 50 }}
                                prefix={<MdLockOutline style={{ color: '#666', fontSize: 22 }} />}
                                type="password"
                                placeholder="Mật khẩu"
                                size="large"
                            />
                        </Form.Item>
                        <Button
                            style={{ height: 45 }}
                            type='primary'
                            htmlType="submit"
                            block
                            size="large">
                            Đăng nhập
                        </Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
}

export default Login;