"use client";

import { postUploadFile } from '@/actions/uploadAction';
import { AppActionEnum, NotificationTypeEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Cascader, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Upload, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import Editor from '@/components/Editor/Editor';
import { getListPostGroupAction, savePostGroupAction } from '@/store/post/post.action';
import { url } from 'inspector';
import { getListMenuAction } from '@/store/menu/menu.action';
import { setSelectMenuPostGroup } from '@/store/menu/menu.reducer';
import { getValueLocale } from '@/store/locale/locale.action';

const locale = 'vi'

type Props = {
  typeForm: AppActionEnum;
}
interface OptionCascader {
  value: string;
  label: React.ReactNode | string;
  title: string;
  children?: OptionCascader[];
  disabled?: boolean;
}

const GroupForm = ({ typeForm }: Props) => {
  const dispatch = useAppDispatch();
  const { detailPostGroupAdmin } = useAppSelector((state) => state.post);
  const { listMenu, selectMenuPostGroup } = useAppSelector((state) => state.menu);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [contentTitleEn, setOnChangeContentTitleEn] = useState<string>("");
  const [contentTitleVi, setOnChangeContentTitleVi] = useState<string>("");
  const [formRef] = Form.useForm();
  const [thumbnailUrl, setThumbnailUrl] = useState<UploadFile>(
    {
      uid: "",
      name: "",
      status: undefined,
      url: "",
      thumbUrl: "",
    }
  );
  const [loadingBanner, setLoadingBanner] = useState<boolean>(false);

  const [bannerUrl, setBannerUrl] = useState<UploadFile>(
    {
      uid: "",
      name: "",
      status: undefined,
      url: "",
      thumbUrl: "",
    }
  );
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listMenu.data.length === 0) dispatch(getListMenuAction())
  }, []);

  useEffect(() => {
    if (typeForm === AppActionEnum.update && detailPostGroupAdmin.data?.code && listMenu.data && listMenu.data?.length !== 0) {
      const selectedItem = listMenu.data.find(
        (o) => o.code === detailPostGroupAdmin.data?.menu_code,
      );
      if (selectedItem) {
        setSelectedMenu(selectedItem)
      }
    }
  }, [listMenu, detailPostGroupAdmin]);

  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: detailPostGroupAdmin.data?.index,
        code: detailPostGroupAdmin.data?.code,
        menu_code: selectedMenu?.name?.vn_VN ?? '',
        url: detailPostGroupAdmin.data?.url,
        active: detailPostGroupAdmin.data?.isActive,
        video: detailPostGroupAdmin.data?.isvideobanner,
        name_vi: detailPostGroupAdmin.data?.name?.vn_VN,
        name_en: detailPostGroupAdmin.data?.name?.en_US,
      });
      setThumbnailUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: detailPostGroupAdmin.data?.thumbnail,
          thumbUrl: detailPostGroupAdmin.data?.thumbnail,
        }
      )
      setBannerUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: detailPostGroupAdmin.data?.banner,
          thumbUrl: detailPostGroupAdmin.data?.banner
        }
      )
      setOnChangeContentTitleEn(detailPostGroupAdmin.data?.title?.en_US)
      setOnChangeContentTitleVi(detailPostGroupAdmin.data?.title?.vn_VN)
    } else {
      formRef.setFieldsValue({
        index: 0,
        active: true,
        video: false
      });
    }
  }, [typeForm, formRef, detailPostGroupAdmin]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm nhóm thành công' : 'Cập nhật nhóm thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm nhóm thất bại' : 'Cập nhật nhóm thất bại';
    let id = '';
    setLoading(true);
    if (typeForm === AppActionEnum.create) {
      id = uuidv4() as string;
    } else if (typeForm === AppActionEnum.update) {
      id = detailPostGroupAdmin.data.id;
    }
    const postGroup = {
      id: id,
      code: values.code.toLowerCase(),
      menu_code: selectMenuPostGroup?.code ?? '',
      slug: values.code.toLowerCase(),
      index: values.index,
      thumbnail: thumbnailUrl.thumbUrl,
      banner: bannerUrl.url,
      isActive: values.active,
      isvideobanner: values.video,
      url: values.url.toLowerCase(),
      title: {
        vn_VN: contentTitleVi,
        en_US: contentTitleEn
      },
      name: {
        vn_VN: values.name_vi,
        en_US: values.name_en
      }
    }
    const res = await dispatch(savePostGroupAction(postGroup))
    if (res.payload.data) {
      toast.success(successMessage)
      dispatch(getListPostGroupAction(selectMenuPostGroup.code))
      if (typeForm === AppActionEnum.create) {
        formRef.resetFields();
      }
    } else {
      toast.error(errorMessage)
    }
    setLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
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


  const propsBannerUpload: UploadProps = {
    accept: "image/*",
    maxCount: 1,
    async customRequest({ file, onSuccess, onError }) {
      setLoadingBanner(true);
      try {
        const res = await postUploadFile(file);
        if (res && onSuccess) {
          setBannerUrl(
            {
              uid: uuidv4() as string,
              name: uuidv4() as string,
              status: "done",
              url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`,
              thumbUrl: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`,
            }
          );
          setLoadingBanner(false);
          onSuccess(null, res.payload.data);
        } else {
          setLoadingBanner(false);
        }
      } catch (error: any) {
        setLoadingBanner(false);
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
        setBannerUrl(
          {
            uid: uuidv4() as string,
            name: info.fileList[0].xhr.originalname,
            status: "done",
            url: info.fileList[0].xhr.result,
            thumbUrl: info.fileList[0].xhr.result,
          }
        );
      } else {
        setBannerUrl(
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
      setBannerUrl(
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
    disabled: loadingBanner,
    fileList: bannerUrl?.url ? [bannerUrl] : [],
  };
  const handleChangeMenu = (code: string) => {
    const selectedItem = listMenu.data.find(
      (o) => o.code === code,
    );
    if (selectedItem) {
      setSelectedMenu(selectedItem)
    }
  };
  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish} className={styles.rootForm} initialValues={{
      ["menu_code"]: selectMenuPostGroup?.code ?? null
    }}>
      {
        typeForm === AppActionEnum.update ? <Form.Item
          name="menu_code"
          label="Menu"
          rules={[{ required: true, message: 'Vui lòng nhập menu!' }]}
        >
          <Input style={{ width: '100%' }} readOnly={true} />
        </Form.Item> : <Form.Item
          name="menu_code"
          label="Menu"
          rules={[{ required: true, message: 'Vui lòng chọn menu!' }]}
        >
          <Select
            showSearch
            placeholder="Chọn menu"
            onChange={handleChangeMenu}
            style={{ width: '100%' }}
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
        </Form.Item>
      }
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã nhóm"
            rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="index"
            label="Sắp xếp"
          >
            <InputNumber style={{ width: '100%' }} type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="name_vi" label="Tên (tiếng việt)" >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="name_en" label="Tên (english)">
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="url"
        label="URL"
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Thumbnail">
        <Upload {...propsThumbnailUpload}>{uploadButton}</Upload>
      </Form.Item>

      <Form.Item label="Banner">
        <Upload {...propsBannerUpload}>{uploadButton}</Upload>
      </Form.Item>

      <Form.Item label="Tiêu đề (tiếng việt)" >
        <Editor
          height='100px'
          contentEditor={contentTitleVi}
          onChangeContentEditor={(value) => {
            setOnChangeContentTitleVi(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Tiêu đề (english)">
        <Editor
          height='100px'
          contentEditor={contentTitleEn}
          onChangeContentEditor={(value) => {
            setOnChangeContentTitleEn(value);
          }}
        />
      </Form.Item>

      <Row>
        <Form.Item
          name="active"
          label="Kích hoạt"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <div style={{ width: '100px' }}></div>
        <Form.Item
          name="video"
          label="Video"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: 10, boxShadow: 'none' }}>
          {typeForm === AppActionEnum.create ? 'Thêm mới' : 'Cập nhật'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;
