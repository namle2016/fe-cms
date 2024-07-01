"use client";
import { axiosHandler } from "@/api/httpClient";
import styles from "./page.module.scss";
import HttpClient from "@/api/httpClient";
import { useEffect, useRef, useState } from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import { useAppSelector } from "@/store";
import { MdOutlineLocalPhone, MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { Button, Carousel, Form, Input, Select } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import dompurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
const { TextArea } = Input;
const listMenu = [{ id: 1, title: { en_US: 'THE FOUNDER', vn_VN: 'NHÀ SÁNG LẬP' } },
{ id: 2, title: { en_US: 'THE HISTORY', vn_VN: 'LỊCH SỬ' } },
{ id: 3, title: { en_US: 'THE STORIES', vn_VN: 'CÂU CHUYỆN' } },
{ id: 4, title: { en_US: 'CONTACT', vn_VN: 'LIÊN HỆ' } }
];
const carouselBannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
};
export default function AboutUsPage() {
    const ref: any = useRef();
    const [formRef] = Form.useForm();
    const { language } = useAppSelector((state) => state.locale);
    const [listAboutUs, setListAboutUs] = useState<any>();
    const [select, setSelect] = useState<string>('Mr');
    const [menu, setMenu] = useState<any>();
    const [idActive, setIdActive] = useState<number>(1);
    const getListAboutUs = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistGroupPostbyType/about-us")
        );
        if (isSuccess) {
            if (data) setListAboutUs(data);
        }
    }
    useEffect(() => {
        getListAboutUs()
        getMenu()
    }, []);
    const getMenu = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/menus/getMenu/about-us")
        );
        if (isSuccess) {
            if (data) {
                setMenu(data);
            }
        }
    }

    const onFinish = async (values: any) => {
        const contactBody = {
            id: uuidv4() as string,
            type: "Customer",
            title: values.sex,
            fullname: values.name,
            email: values.email,
            phone: values.phone,
            subject: values.subject,
            message: values.message,
            createdate: new Date().toISOString(),
            createby: "",
            statusname: "New",
            status: 0
        }
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.post("/contacts/SaveContacts", contactBody)
        );
        if (isSuccess) {
            if (data?.data) {
                toast.success('Success message')

            } else {
                toast.error('Error message')
            }
        }
        else {
            toast.error('Error message')
        }


    };

    return (
        <div className={styles.wrapperAboutUsPage}>
            {menu?.banner && <div className={styles.banner}>
                <img src={menu.banner} alt="img" />
                <div className={styles.content}>
                    <h1>{getValueLocale(language, menu?.title)} </h1>
                    <h3>{getValueLocale(language, menu?.description)} </h3>
                </div>
            </div>}
            <div className={styles.tabs}>
                {listMenu.map((item: any) => {
                    return (
                        <div key={item.id} className={clsx(styles.tab, { [styles.active]: idActive === item.id })} onClick={() => setIdActive(item.id)}>
                            <p style={{ color: idActive === item.id ? '#000' : '#747474' }}>{getValueLocale(language, item.title)}</p>
                        </div>
                    );
                })}
            </div>
            {idActive === 4 && <div className={styles.contact}>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <h1>Contact Information</h1>
                        <p>dsz xd gsd gdsf gdsfg sdg sdg sdgh sdfhg sdfh sdfhx hdsz xd gsd gdsf gdsfg sdg sdg sdgh sdfhg sdfh sdfhx h</p>
                        <h2>The Office</h2>
                        <div className={styles.office}>
                            <MdOutlineLocationOn color="#fa2" size={30} />
                            <p>dsz xd gsd gdsf gdsfg sdg sdg sdgh sdfhg sdfh sdfhx aedtgwet aet sae h</p>
                        </div>
                        <div className={styles.office}>
                            <MdOutlineLocalPhone color="#fa2" size={24} />
                            <p>+98 888 888</p>
                        </div>
                        <div className={styles.office}>
                            <MdOutlineEmail color="#fa2" size={24} />
                            <p>yalycouture@gmail.com</p>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <h1>Got Any Question?</h1>
                        <p>Use the form below to get in touch with the sales team</p>
                        <Form
                            onFinish={onFinish}
                            name="form"
                            layout="vertical"
                            initialValues={{
                                ["sex"]: 'Mr'
                            }}
                        >
                            <div className={styles.name}>
                                <Form.Item name="sex" >
                                    <Select
                                        style={{ width: 80, height: 40 }}
                                        options={[
                                            { value: '1', label: 'Mr' },
                                            { value: '2', label: 'Ms' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item style={{ width: "calc(100% - 110px)" }}
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter name!' }]}
                                >
                                    <Input placeholder="Name *" />
                                </Form.Item>
                            </div>
                            <div className={styles.emailAndPhone}>
                                <Form.Item style={{ width: "calc(50% - 15px)" }}
                                    name="email"
                                    rules={[{
                                        type: 'email',
                                        message: 'The input is not valid email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please enter email!',
                                    },]}
                                >
                                    <Input placeholder="Email *" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    style={{ width: "calc(50% - 15px)" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter phone!',
                                        },
                                        {
                                            message: "The input is not valid phone!",
                                            pattern: new RegExp(/^[0-9]+$/)
                                        }
                                    ]}
                                >
                                    <Input style={{ width: '100%' }}
                                        placeholder="Phone *"
                                        maxLength={12}
                                    />
                                </Form.Item>

                            </div>
                            <div className={styles.subject}>
                                <Form.Item style={{ width: '100%' }}
                                    name="subject"
                                    rules={[{ required: true, message: 'Please enter subject!' }]}
                                >
                                    <Input placeholder="Subject *" />
                                </Form.Item>
                            </div>
                            <div className={styles.msg}>
                                <Form.Item
                                    name="message"
                                    rules={[{ required: true, message: 'Please enter message!' }]}
                                >
                                    <TextArea maxLength={100} placeholder="Message *" />
                                </Form.Item>
                            </div>

                            <Button
                                type='primary'
                                htmlType="submit"
                                size="large">
                                Submit
                            </Button>
                        </Form>

                    </div>
                </div>
                <iframe className={styles.googleMap} src="https://www.google.com/maps/d/embed?mid=17QCP1vEsBh_J5Lpw9a96v6sCdR6DNzo&ehbc=2E312F"></iframe>
            </div>}
            {idActive === 1 && listAboutUs && listAboutUs[0]?.post?.length > 0 && <div className={styles.theFounder}>
                <IoIosArrowBack size={50} color="#fa2" onClick={() => ref.current.prev()} style={{ cursor: 'pointer' }} />
                <Carousel  {...carouselBannerSettings} className={styles.banner} ref={ref}>
                    {
                        listAboutUs[0].post?.map((item: any, i: number) =>
                            <div className={styles.content} key={i}>
                                <div className={styles.title}>
                                    <h3>{getValueLocale(language, item?.title)} </h3>
                                </div>
                                <div className={styles.imgAndDescription}>
                                    <img src={item?.thumbnail.split(',')[0]} alt="img" key={i} />
                                    {/* <p> {getValueLocale(language, item?.description)}</p> */}
                                    <div className={styles.description}>
                                        <div className={styles.detail}
                                            dangerouslySetInnerHTML={{
                                                __html: dompurify.sanitize(
                                                    getValueLocale(language, item?.description),
                                                    { ADD_ATTR: ['target'] }
                                                ),
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        )
                    }
                </Carousel>
                <IoIosArrowForward size={50} color="#fa2" onClick={() => ref.current.next()} style={{ cursor: 'pointer' }} />
            </div>}
            {idActive === 2 && listAboutUs[1] && <div className={styles.history}>
                {listAboutUs[1].post?.map((item: any, i: number) =>
                    <div className={styles.content} key={i}>
                        <img src={item?.thumbnail.split(',')[0]} alt="img" key={i} />
                        <h3>{getValueLocale(language, item?.description)} </h3>
                    </div>

                )}
            </div>}
            {idActive === 3 && listAboutUs[2] && <div className={styles.theStories}>
                {listAboutUs[2].post?.map((item: any, i: number) =>
                    <div className={styles.content} key={i}>
                        <img src={item?.thumbnail.split(',')[0]} alt="img" key={i} />
                        <h3>{getValueLocale(language, item?.description)} </h3>
                    </div>

                )}
            </div>}
        </div>
    );
}