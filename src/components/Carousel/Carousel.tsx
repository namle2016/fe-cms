'use client';

import { Button, Carousel as CarouselAnt } from 'antd';
import './style.scss';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type Props = {
  dataCarousel: {
    image: string;
    id: string;
    buttonLink?: string;
    title?: string;
  }[];
  className?: string;
  classNameChild?: string;
  classNameLoading?: string;
  isComponentChild?: boolean;
  loading: boolean;
};

const Carousel: React.FC<Props> = ({
  className,
  classNameChild,
  classNameLoading,
  dataCarousel,
  isComponentChild,
  loading,
  ...rest
}: Props) => {
  const router = useRouter();
  return (
    <CarouselAnt className={className} {...rest}>
      {dataCarousel.length === 0 && (
        dataCarousel?.map((imageSlide) => {
          return (
            <div className={classNameChild} key={imageSlide.id}>
              <Image
                src={imageSlide.image}
                alt=""
                fill
                placeholder="blur"
                sizes="100%"
                priority
              />
              {imageSlide.title ? <p className="carousel-title-item">{imageSlide.title}</p> : ''}
              {isComponentChild && imageSlide.buttonLink && (
                <Button
                  className="wrapper-btn-banner"
                  type="primary"
                  aria-label={imageSlide.title}
                  onClick={() => {
                    if (imageSlide.buttonLink) {
                      router.push(imageSlide.buttonLink);
                    }
                  }}
                >
                  {imageSlide.title}
                </Button>
              )}
            </div>
          )
        })
      )}
    </CarouselAnt>
  );
};

export default Carousel;
