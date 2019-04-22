import axios from 'axios'
// axios指定默认输出export default Axios,所以不需要加{}
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'http://192.168.1.5:5000/api';

axios.interceptors.request.use(
  config => {
    if (sessionStorage.token) { //判断token是否存在
      config.headers.Authorization ="Bearer " +  sessionStorage.token;  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
