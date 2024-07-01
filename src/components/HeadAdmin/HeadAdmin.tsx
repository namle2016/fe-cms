import React from 'react';
import { Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './head-admin.scss';

type Props = {
  title: string;
  extra?: React.ReactNode;
  subTitle?: React.ReactNode;
  onBack?: (e?: any) => void;
};

const renderBack = (onBack?: (e?: any) => void) => {
  if (!onBack) {
    return null;
  }
  return (
    <Button
      className="wrapper-head-admin-btn-back"
      type="link"
      ghost
      icon={<ArrowLeftOutlined />}
      onClick={onBack}
    />
  );
};

const renderTitle = (title: string, subTitle: React.ReactNode, onBack?: (e?: any) => void) => {
  const backIconDom = renderBack(onBack);
  return (
    <div>
      {title && (
        <Space>
          {backIconDom}
          {title && <h3 className="wrapper-head-admin-title">{title}</h3>}
        </Space>
      )}
      {subTitle && subTitle}
    </div>
  );
};

const HeadAdmin = ({ title, extra, subTitle, onBack }: Props) => (
  <div className="wrapper-head-admin">
    {renderTitle(title, subTitle, onBack)}
    {extra && <Space>{extra}</Space>}
  </div>
);
export default HeadAdmin;
