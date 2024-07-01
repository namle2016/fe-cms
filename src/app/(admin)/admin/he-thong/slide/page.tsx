"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { Button, Modal, Space, Switch, Table } from 'antd';
import { useAppDispatch, useAppSelector } from "@/store";
import { getListMenuAction } from "@/store/menu/menu.action";
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import { Menu } from "@/store/menu/menu.type";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PlusCircleOutlined } from '@ant-design/icons';
import { getListSlideAction } from "@/store/slide/slide.action";
import { Slide } from "@/store/slide/slide.type";
import { AppActionEnum } from "@/config/constant";
import SlideForm from "./form";
import { setDetailSlideAdmin } from "@/store/slide/slide.reducer";
import { useRouter } from "next/navigation";
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
        title: 'Tiêu đề (tiếng việt)',
        dataIndex: 'name_es',
        key: 'name_es',
    },
    {
        title: 'Tiêu đề (english)',
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
    const router = useRouter();
    const { listSlide } = useAppSelector((state) => state.slide);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const [isModalAddOrEdit, setIsModalAddOrEdit] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getListSlideAction())
    }, []);
    const changeActive = async (item: Slide) => {

    }

    const handleModalDelete = async () => {

    };
    const dataSource: DataType[] = listSlide?.data?.map((item, index) => ({
        key: item.id,
        stt: index + 1,
        code: item.code,
        name_vi: item.title.en_US,
        name_es: item.title.vn_VN,
        active: <Switch checked={item.isActive} onChange={() => changeActive(item)} />,
        action: (
            <Space>
                <Button
                    type="primary"
                    icon={<BiEditAlt size={20} />}
                    ghost
                    onClick={() => {
                        dispatch(setDetailSlideAdmin(item))
                        router.push(`/admin/he-thong/slide/${item.id}`)
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
                title="Quản lý slide"
                extra={[
                    <Button
                        type="primary"
                        key="new-slide"
                        icon={<PlusCircleOutlined />}
                        style={{ boxShadow: 'none' }}
                        onClick={() => {
                            router.push("/admin/he-thong/slide/new")
                        }}
                    >
                        Thêm slide
                    </Button>
                ]}
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listSlide.isloading}
            // rowSelection={rowSelection}
            />
        </MainAdmin>

    );
}