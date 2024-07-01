"use client";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./page.module.scss";
import { axiosHandler } from "@/api/httpClient";
import HttpClient from "@/api/httpClient";
import { Post } from "@/store/post/post.type";
export default function DetailAboutUs() {
    const path = usePathname();
    const [aboutUs, setAboutUs] = useState<Post>();
    const getDetailProduct = async () => {
        const slug = path.split('/')[1];
        console.log(slug)
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get(`/posts/getpostbyslug/${slug}`)
        );
        if (isSuccess) {
            if (data?.post && data?.post.length > 0) setAboutUs(data.post[0]);
            //   if (data[0]?.id) {
            //     getProductMixMatch(data[0]?.id);
            //     getProductAlsoLike(data[0]?.catalogsDetail?.slug)
            //     console.log(data[0]?.catalogsDetail?.slug)
            //   }
        };
    }

    useEffect(() => {
        getDetailProduct();
    }, []);
    return (
        <div className={styles.wrapperAboutUsDetail}>
            <div className={styles.content}>
                <div className={styles.aboutUsCurrent}>
                    <img src={aboutUs?.thumbnail.split(',')[0]} alt="" />
                </div>
                <div className={styles.listAboutUs}>Detail Press</div>
            </div>

        </div>
    );
}
