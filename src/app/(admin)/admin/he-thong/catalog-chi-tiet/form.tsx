import { AppActionEnum } from '@/config/constant';
import { postUploadFile } from '@/actions/uploadAction';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Col, Form, Input, InputNumber, Row, Space, Switch, Upload, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { getListCatalogDetailAction, saveCatalogDetailAction } from '@/store/catalog/catalog.action';
import { convertToSlug } from '@/actions/convertAction';
import Cookies from "js-cookie";
type Props = {
  typeForm: AppActionEnum;
  handleModal: () => void;
};

const CatalogDetailForm = ({ typeForm, handleModal }: Props) => {
  const [formRef] = Form.useForm();
  const [email, setEmail] = useState<string>('');
  const dispatch = useAppDispatch();
  const { selectCatalogDetail, selectCatalog } = useAppSelector((state) => state.catalog);
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      const userData = Cookies.get('userData');
      if (userData) setEmail(JSON.parse(userData)?.email)
    }
  }, []);

  useEffect(() => {
    if (typeForm === AppActionEnum.create) {
      formRef.resetFields();
      formRef.setFieldsValue({
        index: 0,
        active: true,
        catalog: selectCatalog?.name?.vn_VN,
      });
    }
  }, [typeForm, formRef, selectCatalog]);

  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: selectCatalogDetail?.index,
        code: selectCatalogDetail?.code,
        catalog: selectCatalog?.name?.vn_VN,
        name_us: selectCatalogDetail?.name?.en_US,
        name_vi: selectCatalogDetail?.name?.vn_VN,
        active: selectCatalogDetail?.isActive,
        slug: selectCatalogDetail?.slug,
        url: selectCatalogDetail?.url,
      });
    }
  }, [selectCatalogDetail, typeForm, formRef, selectCatalog]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm catalog chi tiết thành công' : 'Cập nhật catalog chi tiết thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm catalog chi tiết thất bại' : 'Cập nhật catalog chi tiết thất bại';

    setLoading(true);
    const catalogDetail = (typeForm === AppActionEnum.create) ? {
      id: uuidv4() as string,
      catalog_id: selectCatalog.id,
      createby: email,
      code: values.code.toLowerCase(),
      slug: convertToSlug(values.name_us),
      index: values.index,
      isActive: values.active,
      url: values.url.toLowerCase(),
      name: {
        vn_VN: values.name_vi,
        en_US: values.name_us
      },
    } :
      {
        id: selectCatalogDetail.id,
        catalog_id: selectCatalog.id,
        updateby: email,
        code: values.code.toLowerCase(),
        slug: convertToSlug(values.name_us),
        index: values.index,
        isActive: values.active,
        url: values.url.toLowerCase(),
        name: {
          vn_VN: values.name_vi,
          en_US: values.name_us
        },
      }
    const res = await dispatch(saveCatalogDetailAction(catalogDetail))
    if (res.payload.data) {
      if (res.payload?.statusCode === 200) {
        toast.success(successMessage)
        dispatch(getListCatalogDetailAction(selectCatalog.id))
        if (typeForm === AppActionEnum.create) {
          onReset()
        }
      } else {
        toast.error(res.payload?.message)
      }

    } else {
      toast.error('Không kết nối được với máy chủ')
    }
    setLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
    formRef.setFieldsValue({
      index: 0,
      active: true,
      catalog: selectCatalog?.name?.vn_VN,
    });
  };

  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="catalog"
            label="Catalog"
          >
            <Input style={{ width: '100%' }} readOnly={true} />
          </Form.Item>

        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="active"
            label="Kích hoạt"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

        </Col>
      </Row>
      <Form.Item
        name="code"
        label="Mã"
        rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
      >
        <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
      </Form.Item>
      <Form.Item
        name="name_vi"
        label="Tên (tiếng việt)"
        rules={[{ required: true, message: 'Vui lòng nhập tên (tiếng việt)!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="name_us"
        label="Tên (english)"
        rules={[{ required: true, message: 'Vui lòng nhập tên (english)!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="url"
        label="URL"
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="index"
        label="Sắp xếp"
      >
        <InputNumber style={{ width: '100%' }} type="number" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" ghost onClick={onReset}>
            Đặt lại
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} style={{ boxShadow: 'none' }}>
            {typeForm === AppActionEnum.create ? 'Thêm mới' : 'Cập nhật'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CatalogDetailForm;
