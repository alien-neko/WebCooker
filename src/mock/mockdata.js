import Mock from 'mockjs';

let data_success =
{
  status: 'ok',
  filename: '1.json'
};

let data_error =
{
  status: 'error',
};

export default Mock.mock(
  '/api/upload/img', 'post',
  (req) => {
    console.log(req);
    let req_data = JSON.parse(req.body);
    if (req_data.file) {
      return data_success;
    }
    return data_error;
  }
)
