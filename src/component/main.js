import { DiffOutlined, FileImageOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import WebCooker from './WebCooker';
import ImageDiff from './ImageDiff';
import '../css/WebCooker.css';
const items = [
  {
    label: '图片识别结果对比',
    key: '1',
    icon: <DiffOutlined />,
  },
  {
    label: '图片转换',
    key: '2',
    icon: <FileImageOutlined />,
  },
];
const { Header } = Layout;

const Main = () => {
  const [current, setCurrent] = useState('1');

  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const show = {
    display: 'block'
  };
  const hidden = {
    display: 'none'
  };

  return <Layout>
    <Header>
      <div>
        <img src='c.jpeg' className='logo' alt='logo' />
      </div>
      <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </Header>
    <Content>
      <div style={current === '1' ? show : hidden}>
        <ImageDiff />
      </div>
      <div style={current === '1' ? hidden : show}>
        <WebCooker />
      </div>
    </Content>
  </Layout>
};

export default Main;