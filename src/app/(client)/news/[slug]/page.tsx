"use client";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./page.module.scss";
import { axiosHandler } from "@/api/httpClient";
import HttpClient from "@/api/httpClient";
import { Post } from "@/store/post/post.type";
import { getValueLocale } from "@/store/locale/locale.action";
import { useAppSelector } from "@/store";
import dompurify from 'isomorphic-dompurify';
import { Breadcrumb } from "antd";

export default function DetailNews() {
    const { language } = useAppSelector((state) => state.locale);
    const path = usePathname();
    const [news, setNews] = useState<Post>();
    const [menu, setMenu] = useState<any>();

    const [listNews, setListNews] = useState<any>();
    const formatDate = (date: string) => {
        const locate = language === 'vi' ? 'vn-VN' : 'en-US';
        return new Date(date).toLocaleDateString(locate, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    const getDetailNews = async () => {
        const slug = path.split('/').pop();
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get(`/posts/getpostbyslug/${slug}`)
        );
        if (isSuccess) {
            if (data) {
                setNews(data);
            }
        };
    }
    const getListNews = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get(`/posts/getlistGroupPostbyType/news`)
        );
        if (isSuccess) {
            if (data?.length > 0) setListNews(data[0]);
        };
    }
    const getMenu = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/menus/getmenu/news")
        );
        if (isSuccess) {
            if (data) {
                setMenu(data);
            }
        }
    }

    useEffect(() => {
        getDetailNews();
        getListNews();
        getMenu()
    }, []);

    return (
        <div className={styles.wrapperNewsDetail}>
            <div className={styles.container}>
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
                            //key: uuidv4(),
                            title: language === 'en' ? 'Home' : 'Trang chủ',
                            href: `/`,
                        },
                        {
                            //key: uuidv4(),
                            title: getValueLocale(language, listNews?.title),
                            href: `/news`,
                        },
                        {
                            //key: uuidv4(),
                            title: getValueLocale(language, news?.title),
                        },
                    ]}
                />
                <div className={styles.content}>
                    <div className={styles.listNews}>
                        {listNews?.post?.map((item: Post) => {
                            return (
                                <a href={`/news/${item.slug}`} key={item.id}>
                                    <div className={styles.news} key={item.id}>
                                        <img src={item.thumbnail.split(',')[0]}></img>
                                        <div className={styles.text}>
                                            <h3>{getValueLocale(language, item.description)}</h3>
                                            <p>{formatDate(item.created_at)}</p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                    <div className={styles.newsCurrent}>
                        <img src={news?.thumbnail.split(',')[0]} alt="" />
                        <div className={styles.description}
                            dangerouslySetInnerHTML={{
                                __html: dompurify.sanitize(
                                    getValueLocale(language, news?.content),
                                    { ADD_ATTR: ['target'] }
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
