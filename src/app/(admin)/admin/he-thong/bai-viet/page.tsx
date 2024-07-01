"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { useAppDispatch, useAppSelector } from "@/store";
import { getValueLocale } from "@/store/locale/locale.action";
import { getListPostAction, getListPostGroupAction } from "@/store/post/post.action";
import { Button, Menu, Select, Space, Switch, Table } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Post } from "@/store/post/post.type";
import { useEffect, useState } from "react";
import { AppActionEnum } from "@/config/constant";
import { toast } from "react-toastify";
import { setSelectMenuPost } from "@/store/menu/menu.reducer";
import { getListMenuAction } from "@/store/menu/menu.action";
import dompurify from 'isomorphic-dompurify';
const locale = 'vi'
interface DataType {
    key: React.Key;
    stt: number;
    code: React.ReactNode | string;
    name: React.ReactNode | string;
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
        title: 'Mã bài viết',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'name',
        key: 'name',
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
    const dispatch = useAppDispatch();
    const { listMenu, selectMenuPost } = useAppSelector((state) => state.menu);
    const { listPost } = useAppSelector((state) => state.post);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const dataSource: DataType[] = listPost?.data?.map((item: Post, index: number) => ({
        key: item.id,
        stt: index + 1,
        code: item.code,
        name: getValueLocale(locale, item.name),
        active: <Switch checked={item.isActive} onChange={() => changeActive(item)} />,
        action: (
            <Space>
                <Button
                    type="primary"
                    icon={<BiEditAlt size={20} />}
                    ghost
                    onClick={() => router.push(`/admin/he-thong/bai-viet/${item.id}`)}
                />
                <Button
                    danger
                    icon={<RiDeleteBin6Line size={20} />}
                    type="primary"
                    style={{ boxShadow: 'none' }}
                    onClick={() => {
                        // setModalDelete(item);
                    }}
                />
            </Space>
        ),
    }));
    const handleChangeMenu = (code: string) => {
        dispatch(getListPostAction(code))
        const selectedItem = listMenu.data.find(
            (o) => o.code === code,
        );
        if (selectedItem) {
            dispatch(setSelectMenuPost(selectedItem))
        }
    };
    useEffect(() => {
        dispatch(getListMenuAction())
    }, []);
    const changeActive = async (item: Post) => {


    }
    return (
        <MainAdmin>
            <HeadAdmin
                title="Quản lý bài viết"
                extra={[
                ]}
            />
            <Space >
                <Select
                    showSearch
                    placeholder="Chọn menu"
                    onChange={handleChangeMenu}
                    style={{ width: 300 }}
                    value={selectMenuPost?.code || undefined}
                    options={listMenu?.data?.map((item: any) => ({
                        key: item?.id,
                        value: item?.code,
                        label: getValueLocale(locale, item?.name),
                    }))}
                    filterOption={(input, option) => {
                        return (
                            option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        );
                    }}
                    optionFilterProp="name"
                />
                <Button
                    type="primary"
                    key="new-post-group"
                    icon={<PlusCircleOutlined />}
                    style={{ boxShadow: 'none' }}
                    onClick={() => {
                        setTypeForm(AppActionEnum.create);
                        router.push("/admin/he-thong/bai-viet/new")
                    }}
                >
                    Thêm bài viết
                </Button>
            </Space>
            <Table style={{ marginTop: 10 }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listPost.isloading}
            />
        </MainAdmin>

    );
}