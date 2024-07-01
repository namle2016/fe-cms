"use client";

import { postUploadFile } from '@/actions/uploadAction';
import { AppActionEnum, NotificationTypeEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Upload, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import Editor from '@/components/Editor/Editor';
import { getListSlideAction, saveSlideAction } from '@/store/slide/slide.action';

const locale = 'vi'

type Props = {
  typeForm: AppActionEnum;
}

const SlideForm = ({ typeForm }: Props) => {
  const dispatch = useAppDispatch();
  const { detailSlideAdmin } = useAppSelector((state) => state.slide);
  const [contentDescriptionEn, setOnChangeContentDescriptionEn] = useState<string>("");
  const [contentDescriptionVi, setOnChangeContentDescriptionVi] = useState<string>("");
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
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: detailSlideAdmin?.index,
        code: detailSlideAdmin?.code,
        type: detailSlideAdmin?.type,
        groupslide: detailSlideAdmin?.groupslide,
        url: detailSlideAdmin?.url,
        active: detailSlideAdmin?.isActive,
        video: detailSlideAdmin?.isvideo,
        title_vi: detailSlideAdmin?.title?.vn_VN,
        title_es: detailSlideAdmin?.title?.en_US,
        buttontext_vi: detailSlideAdmin?.buttontext?.vn_VN,
        buttontext_es: detailSlideAdmin?.buttontext?.en_US,
      });
      setThumbnailUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: detailSlideAdmin?.thumbnail,
          thumbUrl: detailSlideAdmin?.thumbnail,
        }
      )
      setOnChangeContentDescriptionEn(detailSlideAdmin?.description?.en_US)
      setOnChangeContentDescriptionVi(detailSlideAdmin?.description?.vn_VN)
    } else {
      formRef.setFieldsValue({
        index: 0,
        active: true,
        video: false
      });
    }
  }, [typeForm, formRef, detailSlideAdmin]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm slide thành công' : 'Cập nhật slide thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm slide thất bại' : 'Cập nhật slide thất bại';
    let id = '';
    setLoading(true);
    if (typeForm === AppActionEnum.create) {
      id = uuidv4() as string;
    } else if (typeForm === AppActionEnum.update) {
      id = detailSlideAdmin.id;
    }
    const slide = {
      id: id,
      code: values.code.toLowerCase(),
      groupslide: values?.groupslide ?? 'Slide',
      type: values?.type ?? '',
      slug: values.code.toLowerCase(),
      index: values.index,
      thumbnail: thumbnailUrl.thumbUrl,
      isActive: values.active,
      isvideo: values.video,
      url: values.url.toLowerCase(),
      title: {
        vn_VN: values.title_vi,
        en_US: values.title_es,
      },
      buttontext: {
        vn_VN: values.buttontext_vi,
        en_US: values.buttontext_es,
      },
      description: {
        vn_VN: contentDescriptionVi,
        en_US: contentDescriptionEn
      }
    }
    const res = await dispatch(saveSlideAction(slide))
    if (res.payload.data) {
      toast.success(successMessage)
      dispatch(getListSlideAction())
      if (typeForm === AppActionEnum.create) {
        formRef.resetFields();
      }
    } else {
      toast.error(errorMessage)
    }
    setLoading(false);
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
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish} className={styles.rootForm} >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã"
            rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>
        </Col>
        <div style={{ width: '20px' }}></div>
        <Form.Item
          name="active"
          label="Kích hoạt"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <div style={{ width: '50px' }}></div>
        <Form.Item
          name="video"
          label="Video"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="groupslide"
            label="Nhóm"
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="type"
            label="Type"
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="buttontext_vi"
            label="Button text (tiếng việt)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="buttontext_es"
            label="Button text (english)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="url"
            label="URL"
          >
            <Input style={{ width: '100%' }} />
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
      <Form.Item label="Thumbnail">
        <Upload {...propsThumbnailUpload}>{uploadButton}</Upload>
      </Form.Item>

      <Form.Item label="Tiêu đề (tiếng việt)" name="title_vi" >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Tiêu đề (english)" name="title_es">
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Mô tả (tiếng việt)" >
        <Editor
          height='100px'
          contentEditor={contentDescriptionVi}
          onChangeContentEditor={(value) => {
            setOnChangeContentDescriptionVi(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Mô tả (english)">
        <Editor
          height='100px'
          contentEditor={contentDescriptionEn}
          onChangeContentEditor={(value) => {
            setOnChangeContentDescriptionEn(value);
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: 10, boxShadow: 'none' }}>
          {typeForm === AppActionEnum.create ? 'Thêm mới' : 'Cập nhật'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SlideForm;
