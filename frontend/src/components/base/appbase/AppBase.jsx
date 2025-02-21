import { Layout } from 'antd'
import React from 'react'
import SiderApp from '../sider/SiderApp'
import HeaderApp from '../header/HeaderApp'
import { Content } from 'antd/es/layout/layout'

const AppBase = (props) => {
    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { hello: "hello" });
        }
        return child;
    });
  return (
    <Layout>
    <SiderApp/>
    <Layout>
      <HeaderApp/>
      <Content
        style={{
          margin: '24px 16px',
          // padding: 24,
          // minHeight: 280,
          // background: colorBgContainer,
        //   borderRadius: borderRadiusLG,
        }}
      >
        {/* Content */}
        {childrenWithProps}
      </Content>
    </Layout>
  </Layout>
  )
}

export default AppBase
