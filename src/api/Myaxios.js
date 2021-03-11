import axios from 'axios'
import {message} from "antd";
//用于做加载动画loading的..
import NProgress from 'nprogress'
//还要引入动画样式
import 'nprogress/nprogress.css'
//qs脚手架已经帮忙安装好了
import qs from 'querystring'
//引入store
import store from '../redux/store'
//引入action，（如果token被篡改了，或者失效了就清除登录信息）
import {createDeleteUserInfoAction} from '../redux/actions/login_action'
const instance = axios.create({
    timeout: 4000,//配置超时时间
});

//请求拦截器
instance.interceptors.request.use((config)=>{
    //进度条开始
    NProgress.start();
    //获得token
    const {token} = store.getState().userInfo
    // //向请求头中添加token，用于校验身份（如果token存在）
    if(token) config.headers.Authorization = token

    //从配置对象中获取method和data
    const {method,data} = config
    // console.log(config)
    //从配置对象中获取method和data
    //这里我们设置一个通用的参数改写
    //如果是post请求
    //如果传过来的是对象（json），就转换成urlencoded格式
    //若是post请求
    if(method.toLowerCase() === 'post'){
        //若传递过来的参数是对象，转换成urlencoded形式
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config;
});

//响应拦截器,!!!!!注意 这里是response
instance.interceptors.response.use(
    (response)=>{
        //进度条结束
        NProgress.done();
    return response.data;
},
    (error)=>{
        //进度条结束
        NProgress.done();
        //如果是401(用户身份错误)
        if (error.response.status === 401){
            message.error('用户登录信息失效，请从新登录', 1)
        //    清除信息
            store.dispatch(createDeleteUserInfoAction());
        }
        //请求若失败，提示错误（这里可以处理所有请求的异常）
        else {
            message.error('网络超时了', 1)
        }
        //中断promise链，因为我们那边用await，，中断了错误的，挺方便的
    return new Promise(()=>{})
    });


export default instance