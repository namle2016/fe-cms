import { AppActionEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
// import { addNewPropertiesMenuAction, getListPropertiesMenuAction, updatePropertiesMenuAction } from '@/store/properties/properties.action';
import { Button, Col, Form, Input, InputNumber, Row, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

type Props = {
  typeForm: AppActionEnum;
  handleModal: () => void;
};

const MenuForm = ({ typeForm, handleModal }: Props) => {
  const [formRef] = Form.useForm();
  const dispatch = useAppDispatch();
  const { detailMenuAdmin } = useAppSelector((state) => state.menu);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeForm === AppActionEnum.create) {
      formRef.resetFields();
      formRef.setFieldsValue({
        no: 0,
        active: true,
        isShowMenu: true,
        location: 0
      });
    }
  }, [typeForm, formRef]);
  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: detailMenuAdmin?.index,
        code: detailMenuAdmin?.code,
        name_us: detailMenuAdmin?.name?.en_US,
        name_vi: detailMenuAdmin?.name?.vn_VN,
        isMainMenu: detailMenuAdmin?.ismainmenu,
        isActive: detailMenuAdmin?.isActive,
        // location: detailMenuAdmin?.location
      });
    }
  }, [detailMenuAdmin, typeForm, formRef]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm thuộc tính thành công' : 'Cập nhật thuộc tính thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm thuộc tính thất bại' : 'Cập nhật thuộc tính thất bại';

    let res: any;
    setLoading(true);
    // if (typeForm === AppActionEnum.create) {
    //   const newProperties = {
    //     createdby: 'admin',
    //     code: values.code.toLowerCase(),
    //     slug: values.code.toLowerCase(),
    //     name: {
    //       en_US: values.name_us,
    //       vn_VN: values.name_vi
    //     },
    //     active: values.active,
    //     isshowmenu: values.isShowMenu,
    //     no: values.no,
    //     location: values.location
    //   }
    //   res = await dispatch(addNewPropertiesMenuAction(newProperties))
    // } else if (typeForm === AppActionEnum.update) {
    //   res = await dispatch(updatePropertiesMenuAction({
    //     item: {
    //       name: {
    //         en_US: values.name_us,
    //         vn_VN: values.name_vi
    //       },
    //       active: values.active,
    //       isshowmenu: values.isShowMenu,
    //       no: values.no,
    //       location: values.location
    //     }, id: detailPropertiesMenu.id
    //   }))
    // }
    // if (res.payload.data) {
    //   toast.success(successMessage)
    //   dispatch(getListPropertiesMenuAction())
    //   if (typeForm === AppActionEnum.create) {
    //     formRef.resetFields();
    //   }
    // } else {
    //   toast.error(errorMessage)
    // }
    setLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
  };

  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish}>
      <Row>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Form.Item
            name="code"
            label="Mã"
            rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>

          <Form.Item
            name="isMainMenu"
            label="Hiện menu"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Kích hoạt"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Space>
      </Row>

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

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="index"
            label="Sắp xếp"
          >
            <InputNumber style={{ width: '100%' }} type="number" />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Vị trí"
            rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
          >
            <InputNumber style={{ width: '100%' }} type="number" />
          </Form.Item>
        </Col>
      </Row>
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

export default MenuForm;
