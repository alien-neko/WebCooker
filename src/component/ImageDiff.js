import React, { useState } from 'react';
import { Button, Row, Col, Divider, Spin, Modal } from 'antd';
import { DoubleRightOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../mock/imgUpload';
import '../css/WebCooker.css';
import ReactFileReader from 'react-file-reader';
const ImageDiff = () => {

  const [originImage, setOriginImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState('');

  const handleFiles = (files) => {
    let img_base64 = files.base64;
    setOriginImage(img_base64);
    setResultImage('');
    console.log('img_base64: ', img_base64);
  };

  const handleClick = () => {
    if (originImage) {
      setLoading(true);
      axios.post('/api/img/upload', {
        image: originImage
      }).then((res) => {
        console.log("res: ", res);
        setTimeout(() => {
          if (res?.data?.image) {
            setResultImage(res.data.image);
          } else {
            Modal.error({
              content: '请求结果解析失败',
              centered: true
            });
          }
          setLoading(false);
        }, 1000);
      }).catch(err => {
        console.log(err);
        setLoading(false);
        Modal.error({
          content: '请求失败',
          centered: true
        });
      })
    }
    else {
      Modal.info({
        content: '请上传一张图片',
        centered: true
      });
    }
  };
  return <div className='main2 flex'>
    <ReactFileReader
      className='upload'
      fileTypes={[".png", ".jpg", ".jpeg"]}
      base64
      multipleFiles={!1}
      handleFiles={handleFiles}
    >
      <Button>
        <UploadOutlined />选择文件
      </Button>
    </ReactFileReader>
    <Divider className='divider' />
    <Row className='imageDiff'>
      <Col className='left image'>
        {originImage && <img width={'100%'} src={originImage} alt='图片加载失败' />}
      </Col>
      <Col className='middle'>
        <Button className='button' icon={<DoubleRightOutlined />} type='primary' onClick={handleClick}>开始识别</Button>
      </Col>
      <Col className='right image'>
        <Spin spinning={loading} size="small">
          {resultImage && <img width={'100%'} src={resultImage} alt='图片加载失败' />}
        </Spin>
      </Col>
    </Row>
  </div>
};
export default ImageDiff;