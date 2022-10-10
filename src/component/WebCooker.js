import React, { useState } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import '../css/WebCooker.css';
import axios from 'axios';
import ReactJson from 'react-json-view';
import '../mock/mockdata';

import { UnControlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror/lib/codemirror.js';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/yonce.css';
// // 代码模式，clike是包含java,c++等模式的
// import 'codemirror/mode/clike/clike'
// import 'codemirror/mode/javascript/javascript'   //js

const WebCooker = () => {

    const [json, setJson] = useState({});
    const [js, setJs] = useState("");

    const uploadImg = () => {
        axios.post('/api/upload/img', {
            file: '1.img'
        }).then((res) => {
            console.log("res: ", res);
            let filename = res.data.filename;
            let filepath = './result/' + filename;
            let file = new File([], filepath);
            console.log(filename, file);
            if (file) {
                try {
                    axios.get(filepath).then(res => {
                        setJson(res.data);
                    })
                    axios.get('./result/result.js').then(res => {
                        setJs(res.data);
                    })
                    // let fileReader = new FileReader();
                    // fileReader.onload = (e) => {
                    //     console.log('result: ', e.target.result);
                    // };
                    // fileReader.onerror = (e) => alert(e.target.error.name);
                    // fileReader.readAsText(file);
                } catch (err) {
                    alert("fileReader读取失败");
                }
            } else {
                alert("文件不存在");
            }
        })
    };

    return (
        <div className='main'>
            <div className='upload'>
                <Button type='primary' onClick={uploadImg}>上传图片</Button>
            </div>
            <Divider style={{ margin: '1vh' }} />
            <Row className='show'>
                <Col className="col1">
                    <div className="content json" >
                        <ReactJson collapsed={false} src={json} name={false} displayDataTypes={false} />
                    </div>
                </Col>
                <Col className="col2">
                    <div className="content js">
                        <code>
                            {js}
                        </code>
                        {/* <CodeMirror
                            value={js}
                            options={{
                                lineNumbers: true, //显示行号
                                mode: { name: 'text/x-js' },//语言
                                autofocus: true,//自动获取焦点
                                styleActiveLine: true,//光标代码高亮
                                theme: 'yonce',  //主题
                                scrollbarStyle: 'overlay',
                                lineWrapping: false, //代码自动换行
                                foldGutter: true,
                                gutters: ['CodeMirror-linenumbers', 'CodeMirrorfoldgutter'],//end
                            }}
                        /> */}
                    </div>
                </Col>
                <Col className="col3">
                    <div className="content ui">
                        {/* <Result /> */}
                    </div>
                </Col>
            </Row>
        </div>
    )
};

export default WebCooker;