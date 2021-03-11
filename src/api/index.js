/*
  1.项目中所有请求由该文件发出
  2.以后每当发请求之前，都要在该文件里添加一个方法
*/
import {message} from 'antd'
//引入我们自定义的myAxios
import myAxios from './Myaxios'
//引入请求的基本路径
import {BASE_URL} from '../config'
//引入jsonp解决跨越的库
import jsonp from 'jsonp'
//发起登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})
//获取用户列表
export const reqUserList = ()=> myAxios.get(`${BASE_URL}/admin/user/list`)
//获取天气信息
export const reqUsWeather= ()=> {
    return new Promise((resolve, reject)=>{
        jsonp('https://restapi.amap.com/v3/weather/weatherInfo?city=440700&key=f9ed6d5722691f5144807375c0827497',(err,data)=>{
            if(err){
                message.error('请求天气错误，请联系管理员',1000);
                console.log(err.message)
                //如果请求出错，中断promise链
                return new Promise(()=>{})
            }else{
                const {city,temperature,weather} = data.lives[0]
                let Weather1 = {city,temperature,weather}
                resolve(Weather1);
            }
        })
    })

}
