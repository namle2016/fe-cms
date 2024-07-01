import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './style.scss';
import React from 'react';

interface ArrowProps {
  className?: string;
  // style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`wrapper-arrow-carousel ${className}`}
      style={{ display: onClick ? 'block' : 'none' }}
      aria-hidden="true"
      onClick={onClick}
    >
      <RightOutlined tabIndex={-1} />
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`wrapper-arrow-carousel ${className}`}
      style={{ display: onClick ? 'block' : 'none' }}
      aria-hidden="true"
      onClick={onClick}
    >
      <LeftOutlined tabIndex={-1} />
    </div>
  );
};

export { NextArrow, PrevArrow };
