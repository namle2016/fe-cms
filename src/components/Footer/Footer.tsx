"use client";
import Image from "next/image";
import clsx from "clsx";
import styles from "./Footer.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { getlistFooterAction } from "@/store/footer/footer.action";
import { useEffect } from "react";
import { IconFaceBook, IconInstagram, IconNoName, IconTikTok, IconYoutube, LogoWhite } from "@/assets/images";
import { getValueLocale } from "@/store/locale/locale.action";

export const Footer = () => {
    const { language } = useAppSelector((state) => state.locale);
    const dispatch = useAppDispatch();
    const { listFooter } = useAppSelector((state) => state.footer);
    useEffect(() => {
        dispatch(getlistFooterAction())
    }, []);

    return (
        <section className={styles.footerRoot}>
            <div className={clsx(styles.footerMain, "container")}>
                {/* <div className={clsx(styles.gridItem, styles.first)}>
                    <Image src={LogoWhite} alt="icon" />
                    <p>- Elegant Craftsmanship Woven into Fabric -</p>
                </div> */}
                {listFooter.data?.map((item: any, index: number) => (
                    <div className={clsx(styles.gridItem, styles.section)} key={item.id}>
                        <p key={item.id}>{getValueLocale(language, item?.name)}</p>
                        <ul>
                            {item?.footerDetail?.map((detailItem: any) => (
                                <li key={detailItem.id}> {getValueLocale(language, detailItem?.name)}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className={clsx(styles.gridItem, styles.first)} />
                <div className={clsx(styles.gridItem, styles.end)}>
                    <p> Social medias</p>
                    <div className={styles.imageIcon}>
                        <Image src={IconFaceBook} alt="icon" />
                        <Image src={IconInstagram} alt="icon" />
                        <Image src={IconTikTok} alt="icon" />
                        <Image src={IconYoutube} alt="icon" />
                        <Image src={IconNoName} alt="icon" />
                    </div>
                </div>
            </div>
            <div className={styles.firstMobile}>
            </div>
            <div className={styles.line} />
            <p className={styles.copyRight}>@2023 Yaly - All right reserved</p>
        </section>
    )
};