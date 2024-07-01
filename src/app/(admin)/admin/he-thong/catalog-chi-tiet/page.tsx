"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Modal, Select, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from "antd/es/table";
import { getValueLocale } from "@/store/locale/locale.action";
import { setSelectCatalogDetail, setSelectCatalog, setListCatalogDetail, setListCatalogSelect } from "@/store/catalog/catalog.reducer";
import { getListMenuAction } from "@/store/menu/menu.action";
import CatalogAPI from "@/store/catalog/catalog.api";
import { Catalog, CatalogDetail } from "@/store/catalog/catalog.type";
import { axiosHandler } from "@/api/httpClient";
import { BiEditAlt } from "react-icons/bi";
import { AppActionEnum } from "@/config/constant";
import { RiDeleteBin6Line } from "react-icons/ri";
import CatalogDetailForm from "./form";
import { Menu } from "@/store/menu/menu.type";
import { toast } from "react-toastify";
import { setSelectMenuCatalogDetail } from "@/store/menu/menu.reducer";
import { getListCatalogDetailAction } from "@/store/catalog/catalog.action";

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
    const dispatch = useAppDispatch();
    const { listMenu, selectMenuCatalogDetail } = useAppSelector((state) => state.menu);
    const { selectCatalog, listCatalogDetail, listCatalogSelect } = useAppSelector((state) => state.catalog);
    const [isModalAddOrEdit, setIsModalAddOrEdit] = useState<boolean>(false);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (listMenu.data.length === 0) dispatch(getListMenuAction())
    }, []);

    const getListCatalog = async (id: string) => {
        const { isSuccess, data } = await axiosHandler(() =>
            CatalogAPI.getListCatalog(id)
        );
        if (isSuccess) {
            dispatch(setListCatalogSelect(data))
        }
    }
    const handleChangeMenu = (id: string) => {
        getListCatalog(id)
        dispatch(setSelectCatalog(undefined))
        setListCatalogDetail([])
        const selectedItem = listMenu.data.find(
            (o) => o.id === id,
        );
        if (selectedItem) {
            dispatch(setSelectMenuCatalogDetail(selectedItem))
        }
    };
    const handleChangeCatalog = (id: string) => {
        setLoading(true);
        dispatch(getListCatalogDetailAction(id))
        const selectedItem = listCatalogSelect.find(
            (o) => o.id === id,
        );
        if (selectedItem) {
            // setSelectedCatalog(selectedItem)
            dispatch(setSelectCatalog(selectedItem))
        }
        setLoading(false)
    };
    const changeActive = async (item: CatalogDetail) => {

    }
    const dataSource: DataType[] = listCatalogDetail.data.map((item, index) => ({
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
                        dispatch(setSelectCatalogDetail(item));
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
                title="Quản lý catalog chi tiết"
                extra={[
                ]}
            />
            <Space >

                <Select
                    showSearch
                    placeholder="Chọn menu"
                    onChange={handleChangeMenu}
                    value={selectMenuCatalogDetail?.id || undefined}
                    style={{ width: 300 }}
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
                <Select
                    showSearch
                    placeholder="Chọn catalog"
                    onChange={handleChangeCatalog}
                    style={{ width: 300 }}
                    value={selectCatalog?.id || undefined}
                    options={listCatalogSelect.map((item: any) => ({
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
                    key="new-catalog"
                    icon={<PlusCircleOutlined />}
                    style={{ boxShadow: 'none' }}
                    onClick={() => {
                        if (selectCatalog?.id) {
                            setTypeForm(AppActionEnum.create);
                            setIsModalAddOrEdit(!isModalAddOrEdit);
                        } else {
                            toast.error('Chưa chọn catalog')
                        }
                    }}
                >
                    Thêm catalog chi tiết
                </Button>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={loading}
            // rowSelection={rowSelection}
            />
            <Modal
                centered
                title={typeForm === AppActionEnum.create ? 'Thêm catalog chi tiết' : 'Cập nhật catalog chi tiết'}
                open={isModalAddOrEdit}
                closable
                footer={null}
                onCancel={() => {
                    setIsModalAddOrEdit(!isModalAddOrEdit);
                }}>
                <CatalogDetailForm
                    typeForm={typeForm}
                    handleModal={() => setIsModalAddOrEdit(!isModalAddOrEdit)}
                />
            </Modal>
        </MainAdmin>
    );
}