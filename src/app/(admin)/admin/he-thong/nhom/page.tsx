"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { useAppDispatch, useAppSelector } from "@/store";
import { getValueLocale } from "@/store/locale/locale.action";
import { getListMenuAction } from "@/store/menu/menu.action";
import { Button, Modal, Select, Space, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PlusCircleOutlined } from '@ant-design/icons';
import { PostGroup } from "@/store/post/post.type";
import { toast } from "react-toastify";
import { getListPostGroupAction, getPostGroupAction } from "@/store/post/post.action";
import { setSelectMenuPostGroup } from "@/store/menu/menu.reducer";
import { AppActionEnum } from "@/config/constant";
import GroupForm from "./form";
import { useRouter } from 'next/navigation';

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
        title: 'Mã nhóm',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    // {
    //     title: 'Trạng thái',
    //     dataIndex: 'active',
    //     key: 'active',
    // },
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
    const { listMenu, selectMenuPostGroup } = useAppSelector((state) => state.menu);
    const { listPostGroup } = useAppSelector((state) => state.post);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const dataSource: DataType[] = listPostGroup?.data?.map((item: PostGroup, index: number) => ({
        key: item.id,
        stt: index + 1,
        code: item.code,
        name: getValueLocale(locale, item.name),
        // active: <Switch checked={item.active} onChange={() => changeActive(item)} />,
        action: (
            <Space>
                <Button
                    type="primary"
                    icon={<BiEditAlt size={20} />}
                    ghost
                    onClick={() => router.push(`/admin/he-thong/nhom/${item.id}`)}
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

    useEffect(() => {
        dispatch(getListMenuAction())
    }, []);

    const changeActive = async (item: PostGroup) => {
        // const res = await dispatch(updatePropertiesSubMenuAction({
        //     item: { active: !item.active }, id: item.id
        // }))
        // if (res.payload.data) {
        //     toast.success('Cập nhật chi tiết thuộc tính thành công')
        //     dispatch(getListPropertiesSubMenuAction(selectPropertiesMenu.id))
        // } else {
        //     toast.error('Cập nhật chi tiết thuộc tính thất bại')
        // }
    }
    const handleChangeMenu = (code: string) => {
        dispatch(getListPostGroupAction(code))
        const selectedItem = listMenu.data.find(
            (o) => o.code === code,
        );
        if (selectedItem) {
            dispatch(setSelectMenuPostGroup(selectedItem))
        }
    };
    const handleModalDelete = async () => {
        // setLoadingDelete(true);
        // const res: any = await dispatch(deletePropertiesSubMenuAction({ id: modalDelete.id, code: modalDelete.code }))
        // if (res.payload.statusCode === 200) {
        //     toast.success('Xoá chi tiết thành công')
        //     dispatch(getListPropertiesSubMenuAction(selectPropertiesMenu.id))
        // }
        // else if (res.payload.statusCode === 404) {
        //     toast.error(res.payload.data)
        // } else {
        //     toast.error('Xoá chi tiết thất bại')
        // }
        // setLoadingDelete(false);
        // setModalDelete(undefined);
    };
    return (
        <MainAdmin>
            <HeadAdmin
                title="Quản lý nhóm"
                extra={[
                ]}
            />
            <Space >
                <Select
                    showSearch
                    placeholder="Chọn menu"
                    onChange={handleChangeMenu}
                    style={{ width: 300 }}
                    value={selectMenuPostGroup?.code || undefined}
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
                        //setTypeForm(AppActionEnum.create);
                        router.push("/admin/he-thong/nhom/new")
                    }}
                >
                    Thêm nhóm
                </Button>
            </Space>
            <Table style={{ marginTop: 10 }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listPostGroup.isloading}
            />
        </MainAdmin>

    );
}