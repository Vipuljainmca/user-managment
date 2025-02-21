import logo from './logo.svg';
import './App.css';
import {
  AppstoreOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnlockOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Space, theme, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import HeaderApp from './components/base/header/HeaderApp';
import SiderApp from './components/base/sider/SiderApp';
import RouterHome from './RouterHome';
import AppBase from './components/base/appbase/AppBase';
import { Route, Routes, useLocation,  } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      {isLoginPath ? (
        <RouterHome />
      ) : (
        <AppBase>
          <RouterHome />
        </AppBase>
      )}
    </>
  );
}

export default App;
