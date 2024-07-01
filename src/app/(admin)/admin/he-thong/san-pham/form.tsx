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

const ProductForm = ({ typeForm }: Props) => {
  const dispatch = useAppDispatch();
  const { detailProductAdmin } = useAppSelector((state) => state.product);
  const [formRef] = Form.useForm();
  const [imgList, setImgList] = useState<UploadFile[]>([]);
  const [loadingImg, setLoadingImg] = useState<boolean>(false);

  const [thumbnailUrl, setThumbnailUrl] = useState<UploadFile>(
    {
      uid: "",
      name: "",
      status: undefined,
      url: "",
    }
  );

  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        no: detailProductAdmin.data?.no,
        code: detailProductAdmin.data?.code,
        keyword_vi: detailProductAdmin.data?.meta_keywords_vn,
        keyword_en: detailProductAdmin.data?.meta_keywords_en,
        ribbon: detailProductAdmin.data?.ribbons,
        mix: detailProductAdmin.data?.mix,
        active: detailProductAdmin.data?.isActive,
        showHome: detailProductAdmin.data?.isshowhome,
      });
      if (detailProductAdmin.data?.images) {
        let listUrl = detailProductAdmin.data?.images.split(",");
        let list: any[] = [];
        for (let i = 0; i < listUrl.length; i++) {
          list.push({
            uid: uuidv4() as string,
            name: uuidv4() as string,
            status: "done",
            url: listUrl[i],
          });
        }
        setImgList(list)
      }
      setThumbnailUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: detailProductAdmin.data?.thumbnail,
        }
      )

    } else {
      formRef.setFieldsValue({
        index: 0,
        active: true,
        video: false
      });
    }
  }, [typeForm, formRef, detailProductAdmin]);

  const onFinish = async (values: any) => {
    // const successMessage =
    //   typeForm === AppActionEnum.create ? 'Thêm bài viết thành công' : 'Cập nhật bài viết thành công';
    // const errorMessage =
    //   typeForm === AppActionEnum.create ? 'Thêm bài viết thất bại' : 'Cập nhật bài viết thất bại';
    // setLoading(true);
    // let post = (typeForm === AppActionEnum.create) ? {
    //   id: uuidv4() as string,
    //   group_post_code: selectedPostGroup?.code,
    //   grouppost_id: selectedPostGroup?.id,
    //   code: values.code.toLowerCase(),
    //   slug: values.code.toLowerCase(),
    //   index: values.index,
    //   thumbnail: joinThumbnail(thumbnailList),
    //   video: videoUrl.url,
    //   isActive: values.active,
    //   isshowhome: values.showHome,
    //   url: values.url.toLowerCase(),
    //   buttontext: {
    //     vn_VN: values.buttontext_vi ?? '',
    //     en_US: values.buttontext_en ?? '',
    //   },

    //   keysearch: values.keysearch,
    //   createname: values.createname
    // } : {
    //   id: detailPostAdmin.data.id,
    //   group_post_code: detailPostAdmin.data?.group_post_code,
    //   code: values.code.toLowerCase(),
    //   slug: values.code.toLowerCase(),
    //   index: values.index,
    //   thumbnail: joinThumbnail(thumbnailList),
    //   video: videoUrl.url,
    //   isActive: values.active,
    //   isshowhome: values.showHome,
    //   url: values.url.toLowerCase(),
    //   buttontext: {
    //     vn_VN: values.buttontext_vi ?? '',
    //     en_US: values.buttontext_en ?? '',
    //   },

    //   keysearch: values.keysearch,
    //   createname: values.createname
    // }
    // const res = await dispatch(savePostAction(post))
    // if (res.payload.data) {
    //   toast.success(successMessage)
    //   dispatch(getListPostAction(selectMenuPost.code))
    //   if (typeForm === AppActionEnum.create) {
    //     formRef.resetFields();
    //   }
    // } else {
    //   toast.error(errorMessage)
    // }
    // setLoading(false);
  };

  const joinImg = (list: UploadFile[]) => {
    let url: string = '';
    for (let i = 0; i < list.length; i++) {
      url += list[i].url;
      if (i !== list.length - 1) url += ','
    }
    return url;
  }

  const uploadButton = (
    <div>
      <IoMdAdd size={25} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const propsImgUpload: UploadProps = {
    accept: "image/*",
    maxCount: 5,
    async customRequest({ file, onSuccess, onError }) {
      setLoadingImg(true);
      try {
        const res = await postUploadFile(file);
        if (res && onSuccess) {
          setImgList([...imgList,
          {
            uid: uuidv4() as string,
            name: uuidv4() as string,
            status: "done",
            url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`
          }])
          setLoadingImg(false);
          onSuccess(null, res.payload.data);
        } else {
          setLoadingImg(false);
        }
      } catch (error: any) {
        setLoadingImg(false);
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
        let list: any[] = []
        for (let i = 0; i < info.fileList.length; i++) {
          list.push({
            uid: uuidv4() as string,
            name: info.fileList[i].xhr.originalname,
            status: "done",
            url: info.fileList[i].xhr.result,
          });
        }
        setImgList(list);
      }
    },
    onRemove: (file: any) => {
      const index = imgList.indexOf(file);
      const newFileList: any = imgList.slice();
      newFileList.splice(index, 1);
      setImgList(newFileList)
    },

    showUploadList: true,
    multiple: true,
    disabled: loadingImg,
    fileList: imgList,
  };

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
              url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`
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
          }
        );
      } else {
        setThumbnailUrl(
          {
            uid: "",
            name: "",
            status: undefined,
            url: "",
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
        }
      );
    },

    showUploadList: true,
    multiple: false,
    disabled: loadingThumbnail,
    fileList: thumbnailUrl?.url ? [thumbnailUrl] : [],
  };

  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish} className={styles.rootForm} initialValues={{

    }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
          >
            <Input style={{ width: '100%' }} readOnly={typeForm === AppActionEnum.update} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="no"
            label="Sắp xếp"
          >
            <InputNumber style={{ width: '100%' }} type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Tên (tiếng việt)" >
        < Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Tên (english)">
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="amount_vi"
            label="Số lượng (tiếng việt)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="amount_en"
            label="Số lượng (english)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="ribbon"
            label="Ribbons"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="mix"
            label="Mix"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="keyword_vi"
            label="Keyword (tiếng việt)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="keyword_en"
            label="Keyword (english)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Thumbnail">
        <Upload {...propsThumbnailUpload} >{uploadButton}</Upload>
      </Form.Item>
      <Form.Item label="Ảnh">
        <Upload {...propsImgUpload}>{uploadButton}</Upload>
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
          name="showHome"
          label="Show home"
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

export default ProductForm;
