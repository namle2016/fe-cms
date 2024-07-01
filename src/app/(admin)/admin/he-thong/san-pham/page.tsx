"use client";

import HeadAdmin from "@/components/HeadAdmin/HeadAdmin";
import MainAdmin from "@/layouts/MainAdmin";
import { useAppDispatch, useAppSelector } from "@/store";
import { getValueLocale } from "@/store/locale/locale.action";
import { getListMenuAction } from "@/store/menu/menu.action";
import { Button, Modal, Select, Space, Switch, Table, Upload, UploadFile, UploadProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PostGroup } from "@/store/post/post.type";
import { toast } from "react-toastify";
import { AppActionEnum } from "@/config/constant";
import { ImportOutlined, UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import * as XLSX from "xlsx";
import { converDataExcelToProductObj, getListProductAction } from "@/store/product/product.action";
import Cookies from "js-cookie";
import ProductAPI from "@/store/product/product.api";
import { axiosHandler } from "@/api/httpClient";
import { Product } from "@/store/product/product.type";
import Image from "next/image";
import { setDetailProductAdmin } from "@/store/product/product.reducer";

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
        title: 'Ảnh',
        dataIndex: 'image',
        key: 'image',
        align: 'center',
        width: 60,
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
    const { user } = useAppSelector((state) => state.auth);
    const { listProduct } = useAppSelector((state) => state.product);
    const [loadingExportExcel, setLoadingExportExcel] = useState<boolean>(false);
    const [typeForm, setTypeForm] = useState<AppActionEnum>(AppActionEnum.create);
    const [isOpenImportExcel, setIsOpenImportExcel] = useState<boolean>(false);
    const [fileExcel, setFileExcel] = useState<UploadFile[]>([]);
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (!user?.email) {
            const userData = Cookies.get('userData');
            if (userData) setEmail(JSON.parse(userData)?.email)
        }
    }, []);

    const dataSource: DataType[] = listProduct?.data?.map((item: Product, index: number) => ({
        key: item.id,
        stt: index + 1,
        code: item.code,
        image: item.thumbnail ? <Image height={56} width={56} src={item.thumbnail} alt='productImage' style={{ borderRadius: '50%' }} />
            : <div style={{ height: 56, width: 56, borderRadius: '50%', backgroundColor: '#ccc' }} ></div>,
        name: getValueLocale(locale, item.name),
        active: <Switch checked={item.isActive} onChange={() => changeActive(item)} />,
        action: (
            <Space>
                <Button
                    type="primary"
                    icon={<BiEditAlt size={20} />}
                    ghost
                    onClick={() => {
                        dispatch(setDetailProductAdmin(item));
                        router.push(`/admin/he-thong/san-pham/${item.id}`)
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

    useEffect(() => {
        dispatch(getListProductAction())
    }, []);

    const changeActive = async (item: Product) => {

    }
    const handleModalDelete = async () => {

    };

    const handleUploadImportExcel = async () => {
        if (fileExcel.length === 0) return;
        setUploading(true);
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const dataExcel = XLSX.utils.sheet_to_json(worksheet, {
            blankrows: false,
            defval: '',
        });
        const listProduct = converDataExcelToProductObj(dataExcel, email)
        let size = 0;
        for (let i = 0; i < listProduct.length; i++) {
            const { isSuccess, data } = await axiosHandler(() =>
                ProductAPI.saveCatalogs(listProduct[i])
            );
            if (isSuccess) {
                size++
            }
        }
        if (size !== 0) {
            dispatch(getListProductAction())
            toast.success(`Import file excel thành công ${size} sản phẩm`)
        }
        else toast.error('Import file excel thất bại')
        setUploading(false);
    };
    const propsImportExcel: UploadProps = {
        maxCount: 1,
        multiple: false,
        accept: '.xls, .xlsx, .csv',
        onRemove: (file) => {
            const index = fileExcel.indexOf(file);
            const newFileExcel = fileExcel.slice();
            newFileExcel.splice(index, 1);
            setFileExcel(newFileExcel);
        },
        beforeUpload: (file) => {
            setFileExcel([file]);
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setExcelFile(e.target.result);
            };
            reader.readAsArrayBuffer(file);
            return false;
        },
        fileList: fileExcel,
    };
    return (
        <MainAdmin>
            <HeadAdmin
                title="Quản lý sản phẩm"
                extra={[
                    <Button
                        key="import-product"
                        title="Export file XLSX"
                        type="primary"
                        icon={<ImportOutlined />}
                        loading={loadingExportExcel}
                        ghost
                        onClick={() => {
                            setIsOpenImportExcel(true);
                        }}>
                        Import file Excel
                    </Button>,
                    <Button
                        type="primary"
                        key="new-product"
                        style={{ boxShadow: 'none' }}
                        icon={<PlusCircleOutlined />}
                        onClick={() => router.push("/admin/he-thong/san-pham/new")}
                    >
                        Thêm sản phẩm
                    </Button>,
                ]}
            />

            <Table style={{ marginTop: 10 }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                loading={listProduct.isloading}
            />
            <Modal
                title="Import dữ liệu vải bằng file XLSX"
                open={isOpenImportExcel}
                width={500}
                centered
                onCancel={() => setIsOpenImportExcel(false)}
                footer={[
                    <Button
                        key="cancel-excel-fabric"
                        type="primary"
                        onClick={() => {
                            setIsOpenImportExcel(false);
                        }}
                        ghost
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="import-excel-fabric"
                        type="primary"
                        onClick={handleUploadImportExcel}
                        disabled={fileExcel.length === 0}
                        loading={uploading}
                    >
                        {uploading ? 'Đang uploading' : 'Bắt đầu Import'}
                    </Button>,
                ]}
            >
                <Upload {...propsImportExcel}>
                    <Button block icon={<UploadOutlined />} style={{ width: '450px', boxShadow: 'none' }} size="large">
                        Chọn file XLSX
                    </Button>
                </Upload>
            </Modal>
        </MainAdmin>

    );
}