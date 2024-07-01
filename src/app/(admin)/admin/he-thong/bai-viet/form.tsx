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
import { getListPostAction, getListPostGroupAction, savePostAction } from '@/store/post/post.action';
import { url } from 'inspector';
import { getListMenuAction } from '@/store/menu/menu.action';
import { setSelectMenuPostGroup } from '@/store/menu/menu.reducer';
import { getValueLocale } from '@/store/locale/locale.action';
import { axiosHandler } from '@/api/httpClient';
import PostAPI from '@/store/post/post.api';
import { PostGroup } from '@/store/post/post.type';

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

const PostForm = ({ typeForm }: Props) => {
  const dispatch = useAppDispatch();
  const { detailPostAdmin } = useAppSelector((state) => state.post);
  const { listMenu, selectMenuPost } = useAppSelector((state) => state.menu);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [selectedPostGroup, setSelectedPostGroup] = useState<PostGroup>();
  const [listPostGroup, setListPostGroup] = useState<PostGroup[]>([]);
  const [titleEn, setOnChangeTitleEn] = useState<string>("");
  const [titleVi, setOnChangeTitleVi] = useState<string>("");
  const [descriptionEn, setOnChangeDescriptionEn] = useState<string>("");
  const [descriptionVi, setOnChangeDescriptionVi] = useState<string>("");
  const [contentEn, setOnChangeContentEn] = useState<string>("");
  const [contentVi, setOnChangeContentVi] = useState<string>("");
  const [formRef] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);

  const [videoUrl, setVideoUrl] = useState<UploadFile>(
    {
      uid: "",
      name: "",
      status: undefined,
      url: "",
    }
  );

  const [loadingvideo, setLoadingVideo] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listMenu.data.length === 0) dispatch(getListMenuAction())
  }, []);
  const getListPostGroup = async (code: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
      PostAPI.getListPostGroup(code)
    );
    if (isSuccess) {
      setListPostGroup(data)
    }
  }
  useEffect(() => {
    if (selectMenuPost?.code) getListPostGroup(selectMenuPost?.code)
  }, [selectMenuPost]);

  useEffect(() => {
    if (typeForm === AppActionEnum.update) {
      formRef.setFieldsValue({
        index: detailPostAdmin.data?.index,
        code: detailPostAdmin.data?.code,
        group_post_code: detailPostAdmin.data?.group_post_code,
        url: detailPostAdmin.data?.url,
        active: detailPostAdmin.data?.isActive,
        showHome: detailPostAdmin.data?.isshowhome,
        buttontext_vi: detailPostAdmin.data?.buttontext?.vn_VN,
        buttontext_en: detailPostAdmin.data?.buttontext?.en_US,
        name_vi: detailPostAdmin.data?.name?.vn_VN,
        name_en: detailPostAdmin.data?.name?.en_US,
        keysearch: detailPostAdmin.data?.keysearch,
        createname: detailPostAdmin.data?.createname
      });
      if (detailPostAdmin.data?.thumbnail) {
        let listUrl = detailPostAdmin.data?.thumbnail.split(",");
        let list: any[] = [];
        for (let i = 0; i < listUrl.length; i++) {
          list.push({
            uid: uuidv4() as string,
            name: uuidv4() as string,
            status: "done",
            url: listUrl[i],
          });
        }
        setThumbnailList(list)
      }
      setVideoUrl(
        {
          uid: uuidv4() as string,
          name: uuidv4() as string,
          status: 'done',
          url: detailPostAdmin.data?.video,
        }
      )
      setOnChangeTitleEn(detailPostAdmin.data?.title?.en_US)
      setOnChangeTitleVi(detailPostAdmin.data?.title?.vn_VN)
      setOnChangeContentEn(detailPostAdmin.data?.content?.en_US)
      setOnChangeContentVi(detailPostAdmin.data?.content?.vn_VN)
      setOnChangeDescriptionEn(detailPostAdmin.data?.description?.en_US)
      setOnChangeDescriptionVi(detailPostAdmin.data?.description?.vn_VN)
    } else {
      formRef.setFieldsValue({
        index: 0,
        active: true,
        video: false
      });
    }
  }, [typeForm, formRef, detailPostAdmin]);

  const onFinish = async (values: any) => {
    const successMessage =
      typeForm === AppActionEnum.create ? 'Thêm bài viết thành công' : 'Cập nhật bài viết thành công';
    const errorMessage =
      typeForm === AppActionEnum.create ? 'Thêm bài viết thất bại' : 'Cập nhật bài viết thất bại';
    setLoading(true);
    let post = (typeForm === AppActionEnum.create) ? {
      id: uuidv4() as string,
      group_post_code: selectedPostGroup?.code,
      grouppost_id: selectedPostGroup?.id,
      code: values.code.toLowerCase(),
      slug: values.code.toLowerCase(),
      index: values.index,
      thumbnail: joinThumbnail(thumbnailList),
      video: videoUrl.url,
      isActive: values.active,
      isshowhome: values.showHome,
      url: values.url.toLowerCase(),
      name: {
        vn_VN: values.name_vi ?? '',
        en_US: values.name_en ?? '',
      },
      buttontext: {
        vn_VN: values.buttontext_vi ?? '',
        en_US: values.buttontext_en ?? '',
      },
      title: {
        vn_VN: titleVi,
        en_US: titleEn
      },
      description: {
        vn_VN: descriptionVi,
        en_US: descriptionEn
      },
      content: {
        vn_VN: contentVi,
        en_US: contentEn
      },
      keysearch: values.keysearch,
      createname: values.createname
    } : {
      id: detailPostAdmin.data.id,
      group_post_code: detailPostAdmin.data?.group_post_code,
      code: values.code.toLowerCase(),
      slug: values.code.toLowerCase(),
      index: values.index,
      thumbnail: joinThumbnail(thumbnailList),
      video: videoUrl.url,
      isActive: values.active,
      isshowhome: values.showHome,
      url: values.url.toLowerCase(),
      name: {
        vn_VN: values.name_vi ?? '',
        en_US: values.name_en ?? '',
      },
      buttontext: {
        vn_VN: values.buttontext_vi ?? '',
        en_US: values.buttontext_en ?? '',
      },
      title: {
        vn_VN: titleVi,
        en_US: titleEn
      },
      description: {
        vn_VN: descriptionVi,
        en_US: descriptionEn
      },
      content: {
        vn_VN: contentVi,
        en_US: contentEn
      },
      keysearch: values.keysearch,
      createname: values.createname
    }
    const res = await dispatch(savePostAction(post))
    if (res.payload.data) {
      toast.success(successMessage)
      dispatch(getListPostAction(selectMenuPost.code))
      if (typeForm === AppActionEnum.create) {
        formRef.resetFields();
      }
    } else {
      toast.error(errorMessage)
    }
    setLoading(false);
  };

  const joinThumbnail = (list: UploadFile[]) => {
    let url: string = '';
    for (let i = 0; i < list.length; i++) {
      url += list[i].url;
      if (i !== list.length - 1) url += ','
    }
    return url;
  };

  const handleChangeMenu = (code: string) => {
    // const selectedItem = listMenu.data.find(
    //   (o) => o.code === code,
    // );
    // if (selectedItem) {
    //   setSelectedMenu(selectedItem)
    // }
    setSelectedPostGroup(undefined)
    getListPostGroup(code)
    setListPostGroup([])
  };

  const handleChangePostGroup = (id: string) => {
    const selectedItem = listPostGroup.find(
      (o) => o.id === id,
    );
    if (selectedItem) {
      setSelectedPostGroup(selectedItem)
    }
  };
  const uploadButton = (
    <div>
      <IoMdAdd size={25} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const propsThumbnailUpload: UploadProps = {
    accept: "image/*",
    maxCount: 5,
    async customRequest({ file, onSuccess, onError }) {
      setLoadingThumbnail(true);
      try {
        const res = await postUploadFile(file);
        if (res && onSuccess) {
          setThumbnailList([...thumbnailList,
          {
            uid: uuidv4() as string,
            name: uuidv4() as string,
            status: "done",
            url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`
          }])
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
        let list: any[] = []
        for (let i = 0; i < info.fileList.length; i++) {
          list.push({
            uid: uuidv4() as string,
            name: info.fileList[i].xhr.originalname,
            status: "done",
            url: info.fileList[i].xhr.result,
          });
        }
        setThumbnailList(list);
      }
    },
    onRemove: (file: any) => {
      const index = thumbnailList.indexOf(file);
      const newFileList: any = thumbnailList.slice();
      newFileList.splice(index, 1);
      setThumbnailList(newFileList)
    },

    showUploadList: true,
    multiple: true,
    disabled: loadingThumbnail,
    fileList: thumbnailList,
  };

  const propsVideoUpload: UploadProps = {
    accept: "video/*",
    maxCount: 1,
    async customRequest({ file, onSuccess, onError }) {
      setLoadingVideo(true);
      try {
        const res = await postUploadFile(file);
        if (res && onSuccess) {
          setVideoUrl(
            {
              uid: uuidv4() as string,
              name: uuidv4() as string,
              status: "done",
              url: `${process.env.NEXT_PUBLIC_API_URL}/${res.path}`
            }
          );
          setLoadingVideo(false);
          onSuccess(null, res.payload.data);
        } else {
          setLoadingVideo(false);
        }
      } catch (error: any) {
        setLoadingVideo(false);
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
        setVideoUrl(
          {
            uid: uuidv4() as string,
            name: info.fileList[0].xhr.originalname,
            status: "done",
            url: info.fileList[0].xhr.result,
          }
        );
      } else {
        setVideoUrl(
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
      setVideoUrl(
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
    disabled: loadingvideo,
    fileList: videoUrl?.url ? [videoUrl] : [],
  };

  return (
    <Form name="form-fasqs" layout="vertical" form={formRef} onFinish={onFinish} className={styles.rootForm} initialValues={{
      ["menu_code"]: selectMenuPost?.code
    }}>
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
          {
            typeForm === AppActionEnum.update ? <Form.Item
              name="group_post_code"
              label="Mã nhóm bài viết"
              rules={[{ required: true, message: 'Vui lòng nhập menu!' }]}
            >
              <Input style={{ width: '100%' }} readOnly={true} />
            </Form.Item> :
              <Row style={{ justifyContent: 'space-between' }}>
                <Form.Item
                  name="menu_code"
                  label="Menu"
                  rules={[{ required: true, message: 'Vui lòng chọn menu!' }]}
                  style={{ width: "calc(50% - 10px)" }}
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

                <Form.Item
                  name="group_post_code"
                  label="Nhóm"
                  rules={[{ required: true, message: 'Vui lòng chọn nhóm!' }]}
                  style={{ width: "calc(50% - 10px)" }}
                >
                  <Select
                    showSearch
                    placeholder="Chọn nhóm"
                    onChange={handleChangePostGroup}
                    value={selectedPostGroup?.id || undefined}
                    style={{ width: '100%' }}
                    options={listPostGroup?.map((item: any) => ({
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
                </Form.Item>
              </Row>

          }
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="name_vi"
            label="Tên (tiếng việt)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="name_en"
            label="Tên (english)"
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
            name="buttontext_en"
            label="Button text (english)"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="keysearch"
            label="Key search"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Space ></Space>
        <Col span={12}>
          <Form.Item
            name="createname"
            label="Người tạo"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Thumbnail">
        <Upload {...propsThumbnailUpload} >{uploadButton}</Upload>
      </Form.Item>
      <Form.Item label="Video">
        <Upload {...propsVideoUpload}>{uploadButton}</Upload>
      </Form.Item>
      <Form.Item label="Tiêu đề (tiếng việt)" >
        <Editor
          height='100px'
          contentEditor={titleVi}
          onChangeContentEditor={(value) => {
            setOnChangeTitleVi(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Tiêu đề (english)">
        <Editor
          height='100px'
          contentEditor={titleEn}
          onChangeContentEditor={(value) => {
            setOnChangeTitleEn(value);
          }}
        />
      </Form.Item>
      <Form.Item label="Mô tả (tiếng việt)" >
        <Editor
          height='100px'
          contentEditor={descriptionVi}
          onChangeContentEditor={(value) => {
            setOnChangeDescriptionVi(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Mô tả (english)">
        <Editor
          height='100px'
          contentEditor={descriptionEn}
          onChangeContentEditor={(value) => {
            setOnChangeDescriptionEn(value);
          }}
        />
      </Form.Item>
      <Form.Item label="Nội dung (tiếng việt)" >
        <Editor
          height='500px'
          contentEditor={contentVi}
          onChangeContentEditor={(value) => {
            setOnChangeContentVi(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Nội dung (english)">
        <Editor
          height='500px'
          contentEditor={contentEn}
          onChangeContentEditor={(value) => {
            setOnChangeContentEn(value);
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

export default PostForm;
