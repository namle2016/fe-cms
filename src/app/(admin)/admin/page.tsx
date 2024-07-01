"use client";
import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import { axiosHandler } from '@/api/httpClient';
import { Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Admin() {
    const dispatch = useAppDispatch();
    const [sumFabric, setSumFabric] = useState<number>(0);

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