import {CREATUSER,DELETE_USER_INFO} from '../action_types'
//制作action,调用的时候，顺便将数据存储到浏览器
export  const createSaveUser = (value)=> {
    //向localStorage中保存用户信息
    localStorage.setItem('user',JSON.stringify(value.user))
    localStorage.setItem('token',value.token)
     return {type:CREATUSER, data:value}
}
export  const createDeleteUserInfoAction = ()=>{
//从localStorage中删除用户信息
    localStorage.removeItem('user')
    //从localStorage中删除token
    localStorage.removeItem('token')

    return {type:DELETE_USER_INFO}
}
