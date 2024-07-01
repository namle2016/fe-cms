'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppActionEnum } from '@/config/constant';
import { useAppDispatch } from '@/store';
import ProductForm from '../form';
import { getProductAction } from '@/store/product/product.action';

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  // useEffect(() => {
  //   dispatch(getProductAction(params.id as string))
  // }, [dispatch, params.id]);
  return (
    <MainAdmin>
      <HeadAdmin
        title="Cập nhật sản phẩm"
        extra={[

        ]}
      />
      <ProductForm typeForm={AppActionEnum.update} />
    </MainAdmin>
  );
};

export default Page;
