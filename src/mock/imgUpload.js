import Mock from 'mockjs';

let data_success =
{
  status: 'ok',
};

let data_error =
{
  status: 'error',
};

export default Mock.mock(
  '/api/img/upload', 'post',
  (req) => {
    let req_data = JSON.parse(req.body);
    console.log('请求体：', req);
    if (req_data.image) {
      return {
        ...data_success,
        image: req_data.image
      };
    }
    return data_error;
  }
)
