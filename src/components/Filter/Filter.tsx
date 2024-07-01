"use client";
import styles from "./Filter.module.scss";
import { Fragment, useEffect, useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { Button, Checkbox, Layout } from "antd";
import { getValueLocale } from "@/store/locale/locale.action";
import { useAppDispatch, useAppSelector } from "@/store";
import Image from "next/image";
import { ClearOutlined, } from '@ant-design/icons';
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import clsx from "clsx";

const listFilterMenu = [
    {
        id: "1",
        name: 'Material',
        subMenus: ["Cotton", 'Linen', 'Flannel', 'Oxford']
    }, {
        id: "2",
        name: 'Pattern',
        subMenus: ["Solid", 'Striped', 'Checked']
    }, {
        id: "3",
        name: 'Style',
        subMenus: ["Toxedo", 'French', 'No Iron', 'Button Down']
    }
]


export const Filter = () => {
    const locale = "en";
    const [checked, setChecked] = useState([]);

    const dispatch = useAppDispatch();
    return (
        <Fragment>
            <div className={styles.filterRoot} style={{ width: '300px' }}>
                <div className={styles.customizeMenuScroll}>
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        value={checked}
                        onChange={(checkedValues) => {
                            setChecked(checkedValues)
                        }}
                    >
                        {listFilterMenu.map((menu: any, index: number) => (
                            (menu.subMenus.length === 0) ?
                                <div key={menu.id}></div> :
                                <MenuItem key={menu.id} menu={menu} />
                        ))}
                    </Checkbox.Group>
                </div>
            </div>
        </Fragment>
    );
};
type Props = {
    menu: any;
};

const MenuItem = ({ menu }: Props) => {
    const [showMenu, setSubMenuOpen] = useState(true);
    const [seeMore, setSeeMore] = useState(false);
    const toggleMenu = () => {
        menu.subMenus.length !== 0 && setSubMenuOpen(!showMenu);
    };

    return (
        <div className={styles.filterWrapper} >
            <div className={styles.title} onClick={toggleMenu} >
                <p> {menu.name} </p>
                <div className={clsx(styles.iconArrowDown, { [styles.expand]: !showMenu })}>
                    <LuChevronUp style={{ color: '#444' }} size={24} />
                </div>
            </div>
            <div className={styles.divider}> </div>
            <div className={clsx(styles.contentMenu, { [styles.expand]: !showMenu })}>
                <div> {
                    menu.subMenus.map((subMenu: string, subId: number) => {
                        if (subId >= 5 && !seeMore) return;
                        return (
                            <div key={subId} className={styles.check}>
                                <p>{subMenu}</p>
                                <Checkbox value={subMenu} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
};