import React, { useState } from 'react';
import { Row, Col, Divider, Spin, Select, Button } from 'antd';
import '../css/WebCooker.css';
import axios from 'axios';
import ReactJson from 'react-json-view';
import '../mock/imgTrans';
import loadable from './loadable';

import Highlight from 'react-highlight';
// import hljs from 'highlight.js';
// import "highlight.js/styles/mono-blue.css";
import 'highlight.js/styles/vs2015.css';

// import { UnControlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror/lib/codemirror.js';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/yonce.css';
// // 代码模式，clike是包含java,c++等模式的
// import 'codemirror/mode/clike/clike'
// import 'codemirror/mode/javascript/javascript'   //js
const Option = Select.Option;
const WebCooker = () => {

    const [json, setJson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [js, setJs] = useState("");

    // useEffect(() => {
    //     hljs.initHighlightingOnLoad();
    //     document.querySelectorAll('pre code').forEach((block) => {
    //         block.innerHTML = "<ul id='ulcode'><li>" + block.innerHTML.replace(/\n/g, "\n</li><li>") + " </li></ul>";
    //     });
    // }, [js])

    const ImgTransformation = () => {
        console.log("图片转换");
        setLoading(true);
        axios.post('/api/img/trans', { file: '1.img' }).then((res) => {
            console.log("图片转换完成");
            let filename = res.data.filename;
            let filepath = './result/' + filename;
            // let file = new File([], filepath);
            // console.log(filename, file);
            if (filepath) {
                setTimeout(() => {
                    try {
                        axios.get(filepath).then(res => {
                            setJson(res.data);
                        });
                        axios.get('./result/result.js').then(res => {
                            setJs(res.data);
                        });
                        setLoading(false);
                        // let fileReader = new FileReader();
                        // fileReader.onload = (e) => {
                        //     console.log('result: ', e.target.result);
                        // };
                        // fileReader.onerror = (e) => alert(e.target.error.name);
                        // fileReader.readAsText(file);
                    } catch (err) {
                        alert("fileReader读取失败");
                        setLoading(false);
                    }
                }, 1000);
            } else {
                alert("文件不存在");
                setLoading(false);
            }
        })
    };

    const Result = loadable(() => import('../result/result'));

    return (
        <div className='main'>
            <Spin spinning={loading}>
                <div className='imgTrans'>
                    <Button type='primary' onClick={ImgTransformation}>开始转换</Button>
                </div>
                <Divider className='divider' />
                <Row className='show'>
                    <Col className="col1">
                        <div className="content json">
                            {json &&
                                <ReactJson
                                    onEdit={(value) => {
                                        console.log(value);
                                    }}
                                    collapsed={false}
                                    src={json}
                                    name={false}
                                    theme={'google'}
                                    displayDataTypes={false}
                                />}
                        </div>
                    </Col>
                    <Col className="col2">
                        <div className='frameSelect'>
                            <Select style={{ 'borderRadius': '4px' }} defaultActiveFirstOption defaultValue="react">
                                <Option key="react" value="react">React</Option>
                                <Option key="vue" value="vue">vue</Option>
                            </Select>
                        </div>
                        <div className="content js">
                            {js && <Highlight className="javascript mycode" >
                                {js}
                            </Highlight>}
                            {/* <code>
                                {js}
                            </code> */}
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
                            {js && <Result />}
                        </div>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
};

export default WebCooker;