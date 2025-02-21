import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    AppstoreOutlined,
    DownOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UnlockOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from "@ant-design/icons";

const SiderApp = () => {
    const navigate = useNavigate();
  return (
    <Sider style={{height:"100vh", paddingTop : "80px"}} trigger={null} collapsible collapsed={true}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <HomeOutlined /> ,
            label: 'Dashboard',
            onClick : () => navigate("/")
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'User Management',
            onClick : () => navigate("/user-management/view-user")
          },
        ]}
      />
    </Sider>
  )
}

export default SiderApp
