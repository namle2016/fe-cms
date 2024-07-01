'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React from 'react';
import { AppActionEnum } from '@/config/constant';
import PostForm from '../form';

const Page = () => {
  return (
    <MainAdmin>
      <HeadAdmin
        title="Thêm bài viết"
        extra={[

        ]}
      />
      <PostForm typeForm={AppActionEnum.create} />
    </MainAdmin>
  );
};

export default Page;
