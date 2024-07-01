'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, Space, ThemeConfig } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import routes from './routes';
import './layout.scss';
import HeaderAdmin from '@/components/HeaderAdmin/HeaderAdmin';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsCollapsedSidebar } from '@/store/setting/setting.reducer';
import { ADMIN_PATH } from '@/shared/constants/common';
import { LogoAdmin, LogoAdminBlank } from '@/assets/images';
import Image from 'next/image'

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type IMainProps = {
  children: ReactNode;
};

interface InfoUser {
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    role: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string;
  };
  token: {
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
  };
}

function MainAdmin({ children }: IMainProps) {
  const pathname = usePathname();
  const { isCollapsedSidebar } = useAppSelector((state) => state.setting);
  const [collapsed, setCollapsed] = useState(isCollapsedSidebar);
  const [openKeysMainMenu, setOpenKeysMainMenu] = useState<string[]>([]);
  const [urlSelectedSub, setUrlSelectedSub] = useState<string>('');
  const dispatch = useAppDispatch();
  const theme: ThemeConfig = {
    token: {
      // colorPrimary: '#f58634',
      //fontFamily: "sora",
      fontFamily: `Montserrat`,
      colorPrimary: '#01ac98',
    },
    components: {
      Menu: {
        itemSelectedColor: "#01ac98",
        // fontFamily: `Montserrat`,
        colorPrimary: "#1677ff",
      },
      Button: {
        colorPrimary: '#01ac98',
        colorPrimaryHover: '#01ac98',
        colorPrimaryActive: '#3C3F4B',
        colorLinkHover: 'f58634',
      },
      Input: {
        // activeBorderColor: '#f58634',
        // hoverBorderColor: '#f58634',
        activeBorderColor: '#01ac98',
        hoverBorderColor: '#01ac98',
      },
      Tabs: {
        itemHoverColor: '#f58634',
        itemSelectedColor: '#f58634',
        itemActiveColor: '#f58634',
        inkBarColor: '#f58634',
      },
      Spin: {
        colorPrimary: '#f58634',
      },
      Checkbox: {
        size: 40,
      },
    },
    hashed: false,
  };
  useEffect(() => {
    const findRoute = routes.find((item) => pathname.includes(item.key));
    if (pathname === ADMIN_PATH.root) {
      setUrlSelectedSub(ADMIN_PATH.dashboard.root);
    }
    if (findRoute?.key) {
      const latestOpenKey = routes
        .filter((item) => item.key === findRoute?.key)
        .map((item) => item.key);
      if (!collapsed) {
        setOpenKeysMainMenu(latestOpenKey);
      }
      setUrlSelectedSub(findRoute.key);
    }
  }, [pathname, collapsed]);

  useEffect(() => {
    setCollapsed(isCollapsedSidebar);
  }, [isCollapsedSidebar]);

  const handleCollapseHeader = () => {
    dispatch(setIsCollapsedSidebar(!collapsed));
    setCollapsed(!collapsed);
  };

  const onOpenChangeMainMenu: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeysMainMenu.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeysMainMenu(keys);
    } else {
      setOpenKeysMainMenu(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderMenuItem = routes.map((route) => {
    if (route?.children) {
      return {
        key: route.key,
        icon: <span>{route.icon}</span>,
        label: <span>{route.label}</span>,
        children: route?.children.map((routeSub) => ({
          key: `${route.key}/${routeSub.key}`,
          label: (
            <Link href={`${route.key}/${routeSub.key}`} scroll={false} >
              {routeSub.label}
            </Link>
          ),
        })),
      };
    }
    return {
      key: route.key,
      icon: <Link href={route.key}>{route.icon}</Link>,
      label: (
        <Link href={route.key} scroll={false} >
          {route.label}
        </Link>
      ),
    };
  });
  return (
    <ConfigProvider theme={theme}>
      <Layout hasSider>
        <Sider
          className="customize-sidebar"
          width={250}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="header-sidebar">
            <Link href="/admin/thong-ke">
              <Space>
                {collapsed && <Image priority={true} src={LogoAdminBlank} alt="adminCollapsed" className='imgCollapsed' />}
                {!collapsed && <Image priority={true} src={LogoAdmin} alt="adminExpanded" className='imgExpanded' />}
              </Space>
            </Link>
          </div>
          <SimpleBar className="customize-menu-scroll" style={{ height: 'calc(100vh - 60px)' }}>
            {/* <Menu mode="inline"  theme="dark">
              <Menu.Item>item 1</Menu.Item>
              <Menu.Item>item 2</Menu.Item>
              <Menu.SubMenu title="sub menu">
                <Menu.Item>item 3</Menu.Item>
                <Menu.Item>item 4</Menu.Item>
                <Menu.Item>item 5</Menu.Item>
              </Menu.SubMenu>
            </Menu> */}
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[urlSelectedSub]}
              openKeys={openKeysMainMenu}
              onOpenChange={onOpenChangeMainMenu}
              items={renderMenuItem}
            />
          </SimpleBar>
        </Sider>
        <Layout className='customize-layout'>
          <HeaderAdmin collapsed={collapsed} onChangeCollapseHeader={handleCollapseHeader} />
          <div className='customize-content-scroll'>
            <Content className='customize-content'>
              {children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default MainAdmin;
