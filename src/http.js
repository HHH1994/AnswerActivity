/**
 * Created by HHH on 2018/12/4.
 */
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = "http://192.168.0.100:3000/";
axios.defaults.headers["Content-Type"]= "application/json";

axios.interceptors.request.use(config=>{
    return config;
  },
  err=>{
    console.log(err);
  });

axios.interceptors.response.use(res=>{
    return res.data;
  },
  err=>{
    console.log(err);
  });

export default axios;
