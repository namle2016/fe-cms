'use client';

import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import MainAdmin from '@/layouts/MainAdmin';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppActionEnum } from '@/config/constant';
import FabricForm from '../form';
import { useAppDispatch } from '@/store';
import { getPostGroupAction } from '@/store/post/post.action';
import GroupForm from '../form';

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getPostGroupAction(params.id as string))
  }, [dispatch, params.id]);
  return (
    <MainAdmin>
      <HeadAdmin
        title="Cập nhật nhóm"
        extra={[

        ]}
      />
      <GroupForm typeForm={AppActionEnum.update} />
    </MainAdmin>
  );
};

export default Page;
