"use client";
import { Breadcrumb } from "antd";
import styles from "./CatalogTitle.module.scss";
import { useAppSelector } from "@/store";

export const CatalogTitle = () => {
    const { isShowMenu } = useAppSelector((state) => state.menu);
    const { isShowHeader } = useAppSelector((state) => state.setting);
    return (
        <div className={`${styles.titleRoot} ${isShowMenu ? '' : isShowHeader ? styles.top : styles.hide}`}>
            <Breadcrumb style={{ paddingLeft: '200px', color: "#222", backgroundColor: '#fff' }}
                separator=">"
                items={[
                    {
                        //key: uuidv4(),
                        title: 'Home',
                        href: `/`,
                    },
                    {
                        //key: uuidv4(),
                        title: 'Catalogs',
                    },
                ]}
            />
        </div>
    );
};