"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import MainAdmin from '@/layouts/MainAdmin';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "./style.module.scss";
import { axiosHandler } from '@/api/httpClient';
import { useAppDispatch } from '@/store';
import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const [sumFabric, setSumFabric] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     if (!userStorage || !tokenStorage) {
    //         redirect("/admin/dang-nhap");
    //     }
    //     setLoading(false);
    // }, []);

    // if (loading) return <h2>
    // </h2>
    return (
        <MainAdmin>
            <HeadAdmin title="Thống kê" />
            <div className={styles.wrapper_list_card_dashboard}>
                <div className={styles.card_dashboard}>
                    <div className={styles.card_dashboard_left}>
                        <UserOutlined />
                    </div>
                    <Space direction="vertical">
                        <p className={styles.card_dashboard_title}>Tổng số vải</p>
                        <p className={styles.card_dashboard_detail}>{sumFabric || 0} Vải</p>
                    </Space>
                </div>
                <div className={styles.card_dashboard}>
                    <div className={styles.card_dashboard_left}>
                        <UserOutlined />
                    </div>
                    <Space direction="vertical">
                        <p className={styles.card_dashboard_title}>Tổng số thuộc tính</p>
                        <p className={styles.card_dashboard_detail}>{0} Thuộc tính</p>
                    </Space>
                </div>
            </div>

        </MainAdmin>
    );
}