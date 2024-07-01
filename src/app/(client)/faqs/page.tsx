"use client";
import { axiosHandler } from "@/api/httpClient";
import styles from "./page.module.scss";
import HttpClient from "@/api/httpClient";
import { useEffect, useState } from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "antd";
import { Post, PostGroup } from "@/store/post/post.type";
//import { getListPostGroupAction } from "@/store/post/post.action";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import clsx from "clsx";

export default function FAQSPage() {
    const { language } = useAppSelector((state) => state.locale);
    const [listFaqs, setListFaqs] = useState<PostGroup[]>([]);
    const router = useRouter();
    const [menu, setMenu] = useState<any>();
    const getListFAQS = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistGroupPostbyType/faqs")
        );
        if (isSuccess) {
            if (data && data?.length > 0) {
                setListFaqs(data);
            }
        }
    }
    const getMenu = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/menus/getMenu/faqs")
        );
        if (isSuccess) {
            if (data) {
                setMenu(data);
            }
        }
    }
    useEffect(() => {
        getListFAQS()
        getMenu()
    }, []);

    const formatDate = (date: string) => {
        const locate = language === 'vi' ? 'vn-VN' : 'en-US';
        return new Date(date).toLocaleDateString(locate, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return (
        <div className={styles.wrapperFAQS}>
            {menu?.banner && <div className={styles.banner}>
                <img src={menu.banner} alt="img" />
                <div className={styles.content}>
                    <h1>{getValueLocale(language, menu?.title)} </h1>
                    <p>{getValueLocale(language, menu?.description)} </p>
                </div>
            </div>}
            <Breadcrumb style={{ color: "#222", fontSize: 20, marginBottom: 10, marginTop: 10, paddingLeft: '5%' }}
                separator=">"
                items={[
                    {
                        title: language === 'en' ? 'Home' : 'Trang chủ',
                        href: `/`,
                    },
                    {
                        title: 'Faqs',
                    },
                ]}
            />
            <div className={styles.divider}> </div>
            <div className={styles.wrapperFaqsBottom}>
                {listFaqs.map((item: PostGroup) => {
                    return (
                        <div className={styles.wrapperFaqsGroup} key={item.id} >
                            <h2>{getValueLocale(language, item.title).toUpperCase()}</h2>
                            <div className={styles.faqsContainer}>
                                {item.post.map((detail: Post) => {
                                    return (
                                        <FaqsItem key={detail.id} item={detail} language={language} />
                                    );
                                })}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
type Props = {
    item: Post, language: string
};

const FaqsItem = ({ item, language }: Props) => {
    const [showItem, setShowItem] = useState(false);
    const toggleMenu = () => {
        setShowItem(!showItem);
    };

    return (
        <div className={!showItem ? styles.faqs : styles.faqsExpand} >
            <div className={styles.title} onClick={toggleMenu} >
                <p> {getValueLocale(language, item.description)} </p>
                <div className={styles.iconArrowDown}>
                    <LuChevronUp style={{ color: '#444' }} size={24} />
                </div>
            </div>
            <div className={styles.contentFaqs}>
                <p> {getValueLocale(language, item.description)} </p>
            </div>
            {/* <div className={styles.divider}></div> */}
        </div>
    );
};