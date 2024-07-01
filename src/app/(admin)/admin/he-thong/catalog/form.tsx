import { AppActionEnum } from '@/config/constant';
import { postUploadFile } from '@/actions/uploadAction';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Col, Form, Input, InputNumber, Row, Space, Switch, Upload, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { getListCatalogAction, saveCatalogAction } from '@/store/catalog/catalog.action';
import { convertToSlug } from '@/actions/convertAction';
import Cookies from "js-cookie";
type Props = {
  typeForm: AppActionEnum;
  handleModal: () => void;
};

const CatalogForm = ({ typeForm, handleModal }: Props) => {

  const [formRef] = Form.useForm();
  const dispatch = useAppDispatch();
  const { catalogDetail } = useAppSelector((state) => state.catalog);
  const { selectMenuCatalog } = useAppSelector((state) => state.menu);
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<UploadFile>(
    {
      uid: "",
      name: "",
      status: undefined,
      url: "",
      thumbUrl: "",
    }
  );

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
        menu: selectMenuCatalog?.name?.vn_VN,
      });
      setThumbnailUrl(
        {
          uid: "",
          name: "",
          status: undefined,
          url: "",
          thumbUrl: "",
        }
      )
    }
  }, [typeForm, formRef]);
  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: catalogDetail?.index,
        code: catalogDetail?.code,
        menu: selectMenuCatalog?.name?.vn_VN,
        name_us: catalogDetail?.name?.en_US,
        name_vi: catalogDetail?.name?.vn_VN,
        active: catalogDetail?.isActive,
        slug: catalogDetail?.slug,
        url: catalogDetail?.url,
      });
      setThumbnailUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: catalogDetail?.thumbnail,
          thumbUrl: catalogDetail?.thumbnail,
        }
      )
    }
  }, [catalogDetail, typeForm, formRef]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm catalog thành công' : 'Cập nhật catalog thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm catalog thất bại' : 'Cập nhật catalog thất bại';

    setLoading(true);
    const catalog = (typeForm === AppActionEnum.create) ? {
      id: uuidv4() as string,
      menu_id: selectMenuCatalog.id,
      createby: email,
      code: values.code.toLowerCase(),
      slug: convertToSlug(values.name_us),
      index: values.index,
      thumbnail: thumbnailUrl.thumbUrl,
      isActive: values.active,
      url: values.url.toLowerCase(),
      name: {
        vn_VN: values.name_vi,
        en_US: values.name_us
      },
    } : {
      id: catalogDetail.id,
      menu_id: selectMenuCatalog.id,
      updateby: email,
      code: values.code.toLowerCase(),
      slug: convertToSlug(values.name_us),
      index: values.index,
      thumbnail: thumbnailUrl.thumbUrl,
      isActive: values.active,
      url: values.url.toLowerCase(),
      name: {
        vn_VN: values.name_vi,
        en_US: values.name_us
      },
    }
    const res = await dispatch(saveCatalogAction(catalog))
    if (res.payload.data) {
      toast.success(successMessage)
      dispatch(getListCatalogAction(selectMenuCatalog.id))
      if (typeForm === AppActionEnum.create) {
        onReset()
      }
    } else {
      console.log(res)
      toast.error(errorMessage)
    }
    setLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
    setThumbnailUrl(
      {
        uid: "",
        name: "",
        status: undefined,
        url: "",
        thumbUrl: "",
      }
    )
    formRef.setFieldsValue({
      index: 0,
      active: true,
      menu: selectMenuCatalog?.name?.vn_VN,
    });
  };

  const uploadButton = (
    <div>
      <IoMdAdd size={25} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const propsThumbnailUpload: UploadProps = {
    accept: "image/*",
    maxCount: 1,
    async customRequest({ file, onSuccess, onError }) {
      setLoadingThumbnail(true);
      try {
        const res = await postUploadFile(file);
        if (res && onSuccess) {
          setThumbnailUrl(
            {
              uid: uuidv4() as string,
              name: uuidv4() as string,
              status: "done",
              url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`,
              thumbUrl: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`,
            }
          );
          setLoadingThumbnail(false);
          onSuccess(null, res.payload.data);
        } else {
          setLoadingThumbnail(false);
        }
      } catch (error: any) {
        setLoadingThumbnail(false);
        if (onError) {
          const uploadError: any = {
            status: "error",
            response: error.message,
          };
          onError(uploadError, error);
        }
      }
    },
    listType: "picture-card",
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        setThumbnailUrl(
          {
            uid: uuidv4() as string,
            name: info.fileList[0].xhr.originalname,
            status: "done",
            url: info.fileList[0].xhr.result,
            thumbUrl: info.fileList[0].xhr.result,
          }
        );
      } else {
        setThumbnailUrl(
          {
            uid: "",
            name: "",
            status: undefined,
            url: "",
            thumbUrl: "",
          }
        );
      }
    },
    onRemove: () => {
      setThumbnailUrl(
        {
          uid: "",
          name: "",
          status: undefined,
          url: "",
          thumbUrl: "",
        }
      );
    },

    showUploadList: true,
    multiple: false,
    disabled: loadingThumbnail,
    fileList: thumbnailUrl?.url ? [thumbnailUrl] : [],
  };

  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="menu"
            label="Menu"
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

      {/* <Row>
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
            name="active"
            label="Kích hoạt"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Space>
      </Row> */}
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
      <Form.Item label="Thumbnail">
        <Upload {...propsThumbnailUpload}>{uploadButton}</Upload>
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
      {/* <Form.Item
        name="active"
        label="Kích hoạt"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item> */}
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

export default CatalogForm;
