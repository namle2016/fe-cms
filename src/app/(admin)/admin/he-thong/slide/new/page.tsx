'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React from 'react';
import { AppActionEnum } from '@/config/constant';
import GroupForm from '../form';
import SlideForm from '../form';

const Page = () => {
  return (
    <MainAdmin>
      <HeadAdmin
        title="Thêm Slide"
        extra={[

        ]}
      />
      <SlideForm typeForm={AppActionEnum.create} />
    </MainAdmin>
  );
};

export default Page;
