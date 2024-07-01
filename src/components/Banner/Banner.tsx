
import React from 'react';
import './style.scss';
import Carousel from '../Carousel/Carousel';

interface Props {
  data: {
    image: string;
    id: string;
    buttonLink?: string;
    title: string;
  }[];
  carouselBannerSettings: any;
}

const Banner = ({ data, carouselBannerSettings }: Props) => (
  <Carousel
    draggable
    className="carousel-banner-page"
    classNameChild="carousel-banner-page-child"
    classNameLoading="carousel-banner-page-loading"
    dataCarousel={data.map((item) => ({
      image: item.image as string,
      id: item.id as string,
      buttonLink: item.buttonLink,
      title: item.title,
    }))}
    isComponentChild
    {...carouselBannerSettings}
  />
);

export default Banner;
