"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { Button, Modal, Space, Switch, Table } from 'antd';
import { useAppDispatch, useAppSelector } from "@/store";
import { getListMenuAction } from "@/store/menu/menu.action";
import { ColumnsType } from 'antd/es/table';
import { useEffect } from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import { Menu } from "@/store/menu/menu.type";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PlusCircleOutlined } from '@ant-design/icons';
const locale = 'vi'
interface DataType {
    key: React.Key;
    stt: number;
    code: React.ReactNode | string;
    name_es: React.ReactNode | string;
    name_vi: React.ReactNode | string;
    action: React.ReactNode;
}
const columns: ColumnsType<DataType> = [
    {
        title: 'STT',
        width: 20,
        dataIndex: 'stt',
        key: 'stt',
        align: 'center',
    },
    {
        title: 'Mã',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên (tiếng việt)',
        dataIndex: 'name_es',
        key: 'name_es',
    },
    {
        title: 'Tên (english)',
        dataIndex: 'name_vi',
        key: 'name_vi',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        width: 120,
    },
];
export default function Page() {
    const { listMenu } = useAppSelector((state) => state.menu);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getListMenuAction())
    }, []);
    const changeActive = async (item: Menu) => {


    }

    const handleModalDelete = async () => {

    };
    const dataSource: DataType[] = listMenu?.data?.map((item, index) => ({
        key: item.id,
        stt: index + 1,
        code: item.code,
        name_vi: item.name.en_US,
        name_es: item.name.vn_VN,
        active: <Switch checked={item.isActive} onChange={() => changeActive(item)} />,
        action: (
            <Space>
                <Button
                    type="primary"
                    icon={<BiEditAlt size={20} />}
                    ghost
                    onClick={() => {

                    }}
                />
                <Button
                    danger
                    icon={<RiDeleteBin6Line size={20} />}
                    type="primary"
                    style={{ boxShadow: 'none' }}
                    onClick={() => {

                    }}
                />
            </Space>
        ),
    }));
    return (
        <MainAdmin>
            <HeadAdmin
                title="Quản lý menu"
                extra={[
                    <Button
                        type="primary"
                        key="new-menu"
                        icon={<PlusCircleOutlined />}
                        style={{ boxShadow: 'none' }}
                        onClick={() => {

                        }}
                    >
                        Thêm menu
                    </Button>
                ]}
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listMenu.isloading}
            // rowSelection={rowSelection}
            />
        </MainAdmin>

    );
}