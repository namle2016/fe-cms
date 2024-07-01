"use client";
import { axiosHandler } from "@/api/httpClient";
import styles from "./page.module.scss";
import HttpClient from "@/api/httpClient";
import { useEffect, useState } from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "antd";

export default function MadeToMeasurePage() {
    const { language } = useAppSelector((state) => state.locale);
    const [madeToMeasure, setMadeToMeasure] = useState<any>();
    const router = useRouter();
    const [menu, setMenu] = useState<any>();
    const getListMadeToMeasure = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistPostbyType/made-to-measure")
        );
        if (isSuccess) {
            if (data && data?.length > 0) setMadeToMeasure(data[0]);
        }
    }
    const getMenuBanner = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/menus/getmenu/made-to-measure")
        );
        if (isSuccess) {
            if (data) {
                setMenu(data);
            }
        }
    }
    useEffect(() => {
        getListMadeToMeasure()
        getMenuBanner()
    }, []);
    const formatDate = (date: string) => {
        const locate = language === 'vi' ? 'vn-VN' : 'en-US';
        return new Date(date).toLocaleDateString(locate, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return (
        <div className={styles.wrapperAboutUsPage}>
            {menu?.banner && <div className={styles.banner}>
                <img src={menu.banner} alt="img" />
                <div className={styles.content}>
                    <h1>{getValueLocale(language, menu?.title)} </h1>
                    <p>{getValueLocale(language, menu?.description)} </p>
                </div>
            </div>}
            <div className={styles.pressGrid}>
                {/* <h3>{getValueLocale(language, news?.title)}</h3> */}
                <Breadcrumb style={{ color: "#222", fontSize: 20, marginBottom: 20 }}
                    separator=">"
                    items={[
                        {
                            //key: uuidv4(),
                            title: 'Home',
                            href: `/`,
                        },
                        {
                            //key: uuidv4(),
                            title: 'About us',
                        },
                    ]}
                />
                <div className={styles.gridContainer}>
                    {madeToMeasure?.post.map((item: any) => {
                        return (
                            //`/press/${item.slug}`
                            <a className={styles.card} key={item.id} href={`/about-us/${item.slug}`}>
                                <div className={styles.cardImage}>
                                    <img src={item.thumbnail.split(',')[0]}></img>
                                </div>

                                <div className={styles.cardText}>
                                    <h4>{getValueLocale(language, item.title)}</h4>
                                    <p>{formatDate(item.created_at)}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
