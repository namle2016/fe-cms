import React from 'react';
import {
  AreaChartOutlined,
  ContactsOutlined,
  ShopOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
  HistoryOutlined,
  IdcardOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { ADMIN_PATH } from '@/shared/constants/common';
import { FaChartBar } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

type MenuItem = {
  key: string;
  icon?: React.ReactNode | React.JSX.Element | string;
  label: React.ReactNode | React.JSX.Element | string;
  children?: MenuItem[];
  type?: 'group';
};

const routes: MenuItem[] = [
  {
    label: <span style={{ fontFamily: "Montserrat", fontSize: "14px" }}>Thống kê</span>,
    key: ADMIN_PATH.dashboard.root,
    icon: <FaChartBar />,
  },
  {
    label: <span style={{ fontFamily: "Montserrat", fontSize: "14px" }}>Hệ thống</span>,
    key: '/admin/he-thong',
    icon: <BsShop />,
    children: [
      {
        key: 'menu',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý menu</span>,
      },
      {
        key: 'nhom',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý nhóm</span>,
      },
      {
        key: 'bai-viet',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý bài viết</span>,
      },
      {
        key: 'slide',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý slide</span>,
      },
      {
        key: 'catalog',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý catalog</span>,
      },
      {
        key: 'catalog-chi-tiet',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý catalog chi tiết</span>,
      },
      {
        key: 'san-pham',
        label: <span style={{ fontFamily: "Montserrat", fontSize: "13px" }}>Quản lý sản phẩm</span>,
      },


    ].map((item) => ({
      key: item.key,
      label: item.label,
    })),
  },
];

export default routes;
