'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppActionEnum } from '@/config/constant';
import FabricForm from '../form';
import { useAppDispatch } from '@/store';
import { getPostAction } from '@/store/post/post.action';
import PostForm from '../form';


const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getPostAction(params.id as string))
  }, [dispatch, params.id]);
  return (
    <MainAdmin>
      <HeadAdmin
        title="Cập nhật bài viết"
        extra={[

        ]}
      />
      <PostForm typeForm={AppActionEnum.update} />
    </MainAdmin>
  );
};

export default Page;
