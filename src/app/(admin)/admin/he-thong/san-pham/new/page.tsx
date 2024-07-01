'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppActionEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPostGroupAction } from '@/store/post/post.action';
import ProductForm from '../form';

const Page = () => {
  // const dispatch = useAppDispatch();
  // const params = useParams();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    console.log(user)
  }, []);
  return (
    <MainAdmin>
      <HeadAdmin
        title="Thêm sản phẩm"
        extra={[

        ]}
      />
      <ProductForm typeForm={AppActionEnum.create} />
    </MainAdmin>
  );
};

export default Page;
