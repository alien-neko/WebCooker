import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import WebCooker from './WebCooker';
import ImageDiff from './ImageDiff';
import '../css/WebCooker.css';
const items = [
  {
    label: '图片转换',
    key: '1',
    icon: <MailOutlined />,
  },
  {
    label: '图片识别结果对比',
    key: '2',
    icon: <AppstoreOutlined />,
  },
];
const { Header } = Layout;

const Main = () => {
  const [current, setCurrent] = useState('1');

  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Layout>
    <Header>
      <div className="logo" />
      <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </Header>
    <Content>
      {
        current == '1' ? <WebCooker /> : <ImageDiff />
      }
    </Content>
  </Layout>
};

export default Main;