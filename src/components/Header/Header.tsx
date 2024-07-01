"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import { LuChevronDown, LuChevronUp, LuMenu } from "react-icons/lu";
import { BsPerson, BsBag, BsSearch } from "react-icons/bs";
import { Menu } from "@/store/menu/menu.type";
import { GrLanguage } from "react-icons/gr";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store";
import { setShowMenu } from "@/store/menu/menu.reducer";
import { setShowHeader } from "@/store/setting/setting.reducer";
import { setLanguae } from "@/store/locale/locale.reducer";
import { Button, Divider, Popover, Space } from "antd";
import { getListMenuAction } from "@/store/menu/menu.action";
import { axiosHandler } from "@/api/httpClient";
import MenuAPI from "@/store/menu/menu.api";
import { getValueLocale } from "@/store/locale/locale.action";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Catalog, CatalogDetail } from "@/store/catalog/catalog.type";

// let locale = 'vi'

export const Header = () => {
    const { isShowMenu } = useAppSelector((state) => state.menu);
    const { language } = useAppSelector((state) => state.locale);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);
    const [listMenuShow, setListMenuShow] = useState<Menu[]>([]);
    const [detailMenu, setDetailMenu] = useState<any>(undefined);
    const [detailImageMenu, setDetailImageMenu] = useState<string>('');
    const { listMenu } = useAppSelector((state) => state.menu);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const listInnerRef = useRef();
    const controlNavbar = (e: any) => {
        const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 300;
        dispatch(setShowHeader(!bottom))
        if (window.scrollY > lastScrollY) {
            dispatch(setShowMenu(false));
        } else if (window.scrollY < lastScrollY) {
            dispatch(setShowMenu(true));
        }
        setLastScrollY(window.scrollY);
    };
    const handleClick = (menu: Menu) => {
        if (menu.catalogs.length > 0) {
            setDetailMenu(menu)
            setDetailImageMenu(menu.thumbnail)
        }
        else {
            setDetailMenu(undefined)
            router.push(menu.slug)
        }
    };
    const handleClose = () => {
        setDetailMenu(undefined)
    };
    const handleMouseEnter = (img: string) => {
        setDetailImageMenu(img)
    };

    const handleMouseLeave = () => {
        setDetailImageMenu(detailMenu?.thumbnail);
    };
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar)
    }, [lastScrollY]);

    useEffect(() => {
        if (detailMenu) setDetailImageMenu(detailMenu.thumbnail)
    }, [detailMenu]);

    useEffect(() => {
        const listMenuShow = listMenu.data?.filter((item: Menu) => { return item?.ismainmenu === true })
        setListMenuShow(listMenuShow)
    }, [listMenu]);

    useEffect(() => {
        if (detailMenu) {
            document.body.style.overflowY = 'hidden';
            document.body.style.paddingRight = '17px';
        } else {
            document.body.style.overflowY = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflowY = 'unset';
        };
    }, [detailMenu]);
    useEffect(() => {
        dispatch(getListMenuAction())
    }, [])

    return (
        <Fragment>
            <header className={styles.headerRoot}>
                <div className={styles.wrapperHeader}>
                    <div className={styles.menuLeft}>
                        <LuMenu className={styles.iconMenu} onClick={() => setIsShowMenuMobile(true)} />
                    </div>
                    <p>YALY MEN EMPORIUM</p>
                    <div className={styles.icons}>
                        <BsSearch className={styles.iconSearch} onClick={() => { }} />
                        <BsPerson className={styles.iconPerson} onClick={() => { }} />
                        <BsBag className={styles.iconBag} onClick={() => { }} />
                        <div
                            className={styles.language}
                            onClick={() => dispatch(setLanguae(language === 'en' ? 'vi' : 'en'))}>
                            {language === 'vi' ? 'VN' : 'EN'}
                        </div>
                    </div>
                </div>
                <div className={`${styles.menu} ${isShowMenu ? '' : styles.hide}`}>
                    {
                        listMenuShow?.map((item, i) => item.catalogs.length > 0 ?
                            <p key={item.id} onClick={() => handleClick(item)}>{getValueLocale(language, item.name).toUpperCase()}
                            </p> : <Link href={item?.url} style={{ color: '#272727' }} key={item.id}>
                                <p onClick={() => handleClick(item)}>{getValueLocale(language, item.name).toUpperCase()}
                                </p>
                            </Link>)
                    }
                </div>
                <div className={`${styles.megaMenu} ${detailMenu ? '' : styles.hide}`}>
                    <div className={styles.divider}> </div>
                    <div className={styles.iconClose}>
                        <IoMdClose onClick={handleClose} size={22} color="#333" />
                    </div>
                    {detailMenu && <div className={styles.content}>
                        <img src={detailImageMenu} alt="img" />
                        <div className={styles.listSubMenu}>
                            {detailMenu?.isActive && detailMenu?.catalogs?.map((catalog: any) => (
                                catalog?.isActive ?
                                    <div key={catalog?.id} className={styles.subMenu}>
                                        <div className={styles.title} onMouseEnter={() => handleMouseEnter(catalog?.thumbnail)}>
                                            {getValueLocale(language, catalog?.name)}
                                        </div>
                                        {catalog?.catalogsdetail?.map((item: any) => (
                                            <li key={item?.id}>
                                                <Link href={item?.slug} style={{ color: '#474747' }}>
                                                    {getValueLocale(language, item?.name)}
                                                </Link>
                                            </li>
                                        ))}
                                    </div> : <></>
                            ))}
                        </div>

                    </div>}
                </div>

            </header>
            {/*menu mobile */}
            <div className={styles.menuRootMobile} style={{ width: isShowMenuMobile ? "80%" : "0" }}>
                <div className={styles.headerMobileMenu}>
                    <MdClose style={{ color: '#444' }} size={25}
                        onClick={() => setIsShowMenuMobile(false)} />
                </div>
                <div className={styles.contentMobile}>
                    <div className={styles.menuMobile}>
                        {listMenu.data?.map((item, i) =>
                            <MenuItem key={item.id} item={item} locale={language} />)
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const MenuItem = ({ item, locale }: { item: Menu, locale: string }) => {
    const [showMenu, setSubMenuOpen] = useState(false);
    const toggleMenu = () => {
        item.catalogs.length !== 0 && setSubMenuOpen(!showMenu);
    };
    return (
        <div key={item.id}>
            <div className={styles.menuTitle} onClick={toggleMenu}>
                <p key={item.id}>
                    {getValueLocale(locale, item.name).toUpperCase()}
                </p>
                {item.catalogs.length !== 0 && <LuChevronDown style={{ color: '#444' }} size={22} />}
            </div>
            {item.catalogs.length !== 0 && showMenu &&
                <ul className={styles.childMenu}>
                    {item.catalogs.map((item: Catalog, idx: number) => {
                        return <CatalogItem key={item.id} item={item} locale={locale} />;
                    })}
                </ul>}
        </div>
    );
};

const CatalogItem = ({ item, locale }: { item: Catalog, locale: string }) => {
    const [showCatalog, setShowCatalog] = useState(false);
    const toggCatalog = () => {
        item.catalogsdetail.length !== 0 && setShowCatalog(!showCatalog);
    };
    return (
        <div >
            <ul className={styles.headerChildMenu} onClick={toggCatalog}>
                <div className={styles.titleChildMenu}>
                    {getValueLocale(locale, item?.name)}
                </div>
                {item.catalogsdetail.length !== 0 && (
                    <div className={styles.banner}>
                        {showCatalog ? <LuChevronUp style={{ color: '#444' }} size={22} /> : <LuChevronDown style={{ color: '#444' }} size={22} />}
                    </div>
                )}
            </ul>
            {showCatalog && (
                <div className={styles.contentMenuMobile}>
                    {item.catalogsdetail?.map((detail: CatalogDetail) => {
                        return (
                            <li key={detail.code}>
                                <Link href={detail?.slug} style={{ color: '#474747' }}>
                                    <span>{getValueLocale(locale, detail?.name)}</span>
                                </Link>
                            </li>
                        );
                    })}
                </div>
            )}
        </div>
    );
};