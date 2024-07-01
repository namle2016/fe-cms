"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { useAppDispatch, useAppSelector } from "@/store";
import { getListCatalogAction } from "@/store/catalog/catalog.action";
import { useEffect, useState } from "react";
import { ColumnsType } from 'antd/es/table';
import { Button, Modal, Select, Space, Switch, Table } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Catalog } from "@/store/catalog/catalog.type";
import { PlusCircleOutlined } from '@ant-design/icons';
import { getListMenuAction } from "@/store/menu/menu.action";
import { getValueLocale } from "@/store/locale/locale.action";
import { AppActionEnum } from "@/config/constant";
import { useRouter } from "next/navigation";
import { setSelectMenuCatalog } from "@/store/menu/menu.reducer";
import CatalogForm from "./form";
import { setCatalogDetail } from "@/store/catalog/catalog.reducer";
import { toast } from "react-toastify";
import { Menu } from "@/store/menu/menu.type";
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
    const router = useRouter();
    const { listCatalog } = useAppSelector((state) => state.catalog);
    const { listMenu } = useAppSelector((state) => state.menu);
    const dispatch = useAppDispatch();
    const [isModalAddOrEdit, setIsModalAddOrEdit] = useState<boolean>(false);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const { selectMenuCatalog } = useAppSelector((state) => state.menu);
    const changeActive = async (item: Catalog) => {

    }
    useEffect(() => {
        if (listMenu.data.length === 0) dispatch(getListMenuAction())
    }, []);

    const handleChangeMenu = (id: string) => {
        dispatch(getListCatalogAction(id))
        const selectedItem = listMenu.data.find(
            (o) => o.id === id,
        );
        if (selectedItem) {
            dispatch(setSelectMenuCatalog(selectedItem))
        }
    };
    const dataSource: DataType[] = listCatalog?.data?.map((item, index) => ({
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
                        dispatch(setCatalogDetail(item));
                        setTypeForm(AppActionEnum.update);
                        setIsModalAddOrEdit(!isModalAddOrEdit);
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
                title="Quản lý catalog"
                extra={[

                ]}
            />
            <Space >
                <Select
                    showSearch
                    placeholder="Chọn menu"
                    onChange={handleChangeMenu}
                    style={{ width: 300 }}
                    value={selectMenuCatalog?.id || undefined}
                    options={listMenu?.data?.map((item: any) => ({
                        key: item?.id,
                        value: item?.id,
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
                        if (selectMenuCatalog?.id) {
                            setTypeForm(AppActionEnum.create);
                            setIsModalAddOrEdit(!isModalAddOrEdit);
                        } else {
                            toast.error('Chưa chọn menu')
                        }
                    }}
                >
                    Thêm catalog
                </Button>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listCatalog.isloading}
            // rowSelection={rowSelection}
            />
            <Modal
                centered
                title={typeForm === AppActionEnum.create ? 'Thêm catalog' : 'Cập nhật catalog'}
                open={isModalAddOrEdit}
                closable
                footer={null}
                onCancel={() => {
                    setIsModalAddOrEdit(!isModalAddOrEdit);
                }}>
                <CatalogForm
                    typeForm={typeForm}
                    handleModal={() => setIsModalAddOrEdit(!isModalAddOrEdit)}
                />
            </Modal>
        </MainAdmin>

    );
}