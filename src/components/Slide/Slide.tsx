"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Slide.module.scss";
import { Card } from "antd";
import React from "react";
import { getValueLocale } from "@/store/locale/locale.action";
import dompurify from 'isomorphic-dompurify';
import { useAppSelector } from "@/store";
import { axiosHandler } from "@/api/httpClient";
import HttpClient from "@/api/httpClient";

export const Slide = () => {
    const vidRef: any = useRef(null);
    const { language } = useAppSelector((state) => state.locale);
    const [listSlide, setListSlide] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listService, setListService] = useState([]);
    const [aboutUs, setAboutUs] = useState<any>();
    const getSlides = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/slides/listSlides")
        );
        if (isSuccess) {
            setListSlide(data);
        }
    }

    const getAboutUs = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistPostbyType/about-us")
        );
        if (isSuccess) {
            console.log(data)
            if (data?.length > 0) {
                const listAboutUs = data.filter((item: any) => { return item?.isshowhome === true && item?.isActive === true })
                setAboutUs(listAboutUs[0])
            }
        }
    }
    const getSevices = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistPostbyType/services")
        );
        if (isSuccess) {
            setListService(data)
        }
    }
    const getPorducts = async () => {
        const { isSuccess, data } = await axiosHandler(() =>
            HttpClient.get("/posts/getlistPostbyType/products")
        );
        if (isSuccess) {
            setListProduct(data)
        }
    }


    useEffect(() => {
        getSlides()
        getAboutUs()
        getSevices()
        getPorducts()
    }, []);

    return (
        <div className={styles.slideRoot}>
            {listSlide.length !== 0 ? listSlide?.map((item: any) => {
                if (!item.isActive) {
                    return (
                        <></>
                    );
                }
                if (item.isvideo) {
                    return (
                        <div className={styles.slideVideo} key={item.id}>
                            <video ref={vidRef} preload="none" muted autoPlay loop>
                                <source src={item.thumbnail} type="video/mp4" />
                            </video>
                        </div>
                    );
                }
                return (
                    <div key={item.id} className={styles.slideImage} >
                        <img src={item.thumbnail}></img>
                        <div className={styles.content}>
                            <h4>{getValueLocale(language, item.title)}</h4>
                            {/* <h1>{getValueLocale(language, item.description)}</h1> */}
                            <h1
                                dangerouslySetInnerHTML={{
                                    __html: dompurify.sanitize(
                                        getValueLocale(language, item.description),
                                        { ADD_ATTR: ['target'] }
                                    ),
                                }}
                            />
                            <button>{getValueLocale(language, item.buttontext)}</button>
                        </div>
                    </div>

                );
            }) : <div style={{ backgroundColor: '#fff', height: '100vh' }}></div>}
            <div className={styles.products}>
                {listProduct?.map((item: any) => {
                    return (
                        <div className={styles.product} key={item.id}>
                            <img src={item.thumbnail.split(',')[0]}></img>
                            <div className={styles.content}>
                                <h4>{getValueLocale(language, item.title)}</h4>
                                <button>{getValueLocale(language, item.buttontext)}</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {aboutUs && <div className={styles.aboutUs} >
                <div className={styles.container}>
                    <div className={styles.image}><img src={aboutUs?.thumbnail.split(',')[0]} alt="img" /></div>
                    <div className={styles.content}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: dompurify.sanitize(
                                    getValueLocale(language, aboutUs?.title),
                                    { ADD_ATTR: ['target'] }
                                ),
                            }}
                        />

                        <div className={styles.description} dangerouslySetInnerHTML={{
                            __html: dompurify.sanitize(
                                getValueLocale(language, aboutUs?.description),
                                { ADD_ATTR: ['target'] }
                            ),
                        }} />
                        <button className={styles.button}>{getValueLocale(language, aboutUs?.buttontext)}</button>
                    </div>
                </div>

            </div>}


            
            {/* <div className={styles.fit} >
                <div className={styles.fitContainer} >
                    <div className={styles.content}>
                        <h1>Yaly Bespoke Tailor</h1>
                        <p>With 300 skilled artisans, Yaly Couture delivers a luxurious tailored experience rooted in Hoi An's heritage. Rigorous in-house training ensures excellence from measurements to final products. Our craftsmen guarantees expertise in creating stunning, individualized garments.
                            Yaly Couture's unwavering commitment to unparalleled craftsmanship ensures exceptional quality at an affordable price. Let's explore in detail the high-end bespoke tailoring process at Yaly Couture, the most prestigious bespoke tailor workshop in Hoi An.</p>
                        <button className={styles.button}>Order samples</button>
                    </div>
                    <div className={styles.image}> <Image src={Fit} alt="img" /></div>
                </div>
            </div> */}
            {/* <div className={styles.menAndWomen} >
                <Image src={Men1} alt="img" />
                <Image src={Men2} alt="img" />
                <div className={styles.content}>
                    <h1>GIORGIO</h1>
                    <p>DISCOVER THE COLLECTION</p>
                    <div className={styles.listButton}>
                        <button className={styles.button}>Men</button>
                        <button className={styles.button}>Women</button>
                    </div>
                </div>
            </div>
            <div className={styles.menAndWomen} >

                <div className={styles.content}>
                    <h1>GIORGIO</h1>
                    <p>DISCOVER THE COLLECTION</p>
                    <div className={styles.listButton}>
                        <button className={styles.button}>Fashion show</button>
                        <button className={styles.button}>Shoes</button>
                    </div>
                </div>
                <Image src={Women1} alt="img" />
                <Image src={Women2} alt="img" />
            </div> */}
            <div className={styles.services}>
                <div className={styles.serviceContainer}>
                    {listService?.map((item: any) => {
                        return (
                            <div className={styles.service} key={item.id}>
                                <div key={item.id}>
                                    <video ref={vidRef} preload="none" muted autoPlay loop>
                                        <source src={item.video} type="video/mp4" />
                                    </video>
                                </div>
                                {/* <img src={item.thumbnail.split(',')[0]}></img> */}
                                <div className={styles.content}>
                                    <h4>{getValueLocale(language, item.title)}</h4>
                                    <div className={styles.description}>
                                        <p>{getValueLocale(language, item.description)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
            {/* <div className={styles.newArrivals}>
                <div className={styles.title}>
                    <h3>NEW ARRIVALS</h3>
                </div>
                <Carousel
                    style={{}}
                    {...props}>
                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card1} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card2} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card3} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card4} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>
                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card1} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card2} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card3} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                    <Card className={styles.card}
                        hoverable
                        cover={
                            <div className={styles.cardImage}>
                                <Image src={Card4} alt="img" />
                                <button className={styles.discount}>40%</button>
                                <FaRegHeart className={styles.like} />
                            </div>
                        }
                    >
                        {<div className={styles.cardInfo}>
                            <h4>MOCK-CROC JACQUARD JACKET</h4>
                            <h3>USD 720</h3>
                        </div>}
                    </Card>

                </ Carousel>
            </div> */}
            {/* <div className={styles.emptyContainer} /> */}
            <div className={styles.subscribe} >
                <h1 >
                    SUBSCRIBE TO OUR NEWSLETTER
                </h1>
                <div className={styles.content} >
                    <input type="text" placeholder="Email address"></input>
                    <button>SUBSCRIBE</button>
                </div>

            </div>
        </div >
    )
};