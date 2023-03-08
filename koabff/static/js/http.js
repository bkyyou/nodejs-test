const $http = axios.create({
  baseURL: 'http://localhost:5002',
  // timeout: 1000,
  withCredentials: true, // default
  headers: { 'Content-Type': 'application/json' }
});

// 添加请求拦截器
// $http.interceptors.request.use(function(config) {
//   // 处理 cookie 可以使用 react-cookies ｜ js-cookies
//   // 在发送请求之前做些什么
//   console.log('config', config);
//   console.log('cookie.get()', cookie.load('token'));
//   if (config.url !== '/login') {
//     config.headers['token'] = cookie.load('token');
//   }
//   return config;
// }, function(error) {
//   // 对请求错误做些什么

//   return Promise.reject(error);
// });

// // 添加响应拦截器
// $http.interceptors.response.use(function(response) {
//   // 对响应数据做点什么
//   if (response.data.code === 40003) {
//     // console.log('40003');
//     message.warning('请重新登录');
//     window.location.href = '/#/login';
//   }
//   return response;
// }, function(error) {
//   // 对响应错误做点什么
//   console.log('error', error);
//   message.warning('服务器错误');
//   // window.location.href = '/#/login';
//   return Promise.reject(error);
// });